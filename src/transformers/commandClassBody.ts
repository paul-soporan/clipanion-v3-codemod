import type * as jscodeshift from 'jscodeshift';
import addImports from 'jscodeshift-add-imports';

import {
  TransformerSpec,
  COMMAND_IDENTIFIER,
  convertCallExpressionToCommandPath,
  OPTION_IDENTIFIER,
} from '../utils';

interface HasDecorators {
  decorators?: jscodeshift.Decorator[] | null;
}
type CallExpressionDecorator = jscodeshift.Decorator & { expression: jscodeshift.CallExpression };
type OptionDecorator = CallExpressionDecorator & {
  expression: jscodeshift.CallExpression & {
    callee: jscodeshift.MemberExpression;
  };
};

const EXECUTE_IDENTIFIER = `execute`;
const PATH_IDENTIFIER = `Path`;
const PATHS_IDENTIFIER = `paths`;

const commandPathTransformer = (statement: jscodeshift.Statement, spec: TransformerSpec) => {
  const { j } = spec;

  const { decorators } = (statement as unknown) as HasDecorators;
  if (decorators == null || decorators.length === 0) {
    return statement;
  }

  const regularDecorators: jscodeshift.Decorator[] = [];
  const pathDecorators: CallExpressionDecorator[] = [];

  const isPathDecorator = (
    decorator: jscodeshift.Decorator,
  ): decorator is CallExpressionDecorator => {
    return (
      j.CallExpression.check(decorator.expression) &&
      j.MemberExpression.check(decorator.expression.callee) &&
      j.Identifier.check(decorator.expression.callee.object) &&
      decorator.expression.callee.object.name === COMMAND_IDENTIFIER &&
      j.Identifier.check(decorator.expression.callee.property) &&
      decorator.expression.callee.property.name === PATH_IDENTIFIER
    );
  };

  decorators.forEach((decorator) => {
    if (isPathDecorator(decorator)) {
      pathDecorators.push(decorator);
    } else {
      regularDecorators.push(decorator);
    }
  });

  if (pathDecorators.length === 0) {
    return statement;
  }

  const paths = j.arrayExpression(
    pathDecorators.map((decorator) =>
      convertCallExpressionToCommandPath(decorator.expression, spec),
    ),
  );

  return [
    j.classProperty(j.identifier(PATHS_IDENTIFIER), paths, null, true),
    { ...statement, decorators: regularDecorators },
  ];
};

const STRING_IDENTIFIER = `String`;
const OPTION_IDENTIFIERS = [`Array`, `Boolean`, `Counter`];
const POSITIONAL_IDENTIFIERS = [`Proxy`, `Rest`];

const ALL_OPTION_IDENTIFIERS = [
  ...OPTION_IDENTIFIERS,
  ...POSITIONAL_IDENTIFIERS,
  STRING_IDENTIFIER,
];

const classPropertyTransformer = (
  classProperty: jscodeshift.ClassProperty,
  spec: TransformerSpec,
) => {
  const { j, report, root } = spec;

  const { decorators } = (classProperty as unknown) as HasDecorators;
  if (decorators == null || decorators.length === 0) {
    return classProperty;
  }

  const regularDecorators: jscodeshift.Decorator[] = [];
  const optionDecorators: OptionDecorator[] = [];

  const isOptionDecorator = (decorator: jscodeshift.Decorator): decorator is OptionDecorator => {
    return (
      j.CallExpression.check(decorator.expression) &&
      j.MemberExpression.check(decorator.expression.callee) &&
      j.Identifier.check(decorator.expression.callee.object) &&
      decorator.expression.callee.object.name === COMMAND_IDENTIFIER
    );
  };

  decorators.forEach((decorator) => {
    if (isOptionDecorator(decorator)) {
      optionDecorators.push(decorator);
    } else {
      regularDecorators.push(decorator);
    }
  });

  if (optionDecorators.length === 0) {
    return classProperty;
  }

  if (optionDecorators.length > 1) {
    const propertyName = j.Identifier.check(classProperty.key) ? classProperty.key.name : null;
    report(
      `Found multiple option decorators on the same property${
        propertyName !== null ? ` ("${propertyName}")` : ``
      }; needs to be manually migrated`,
    );
    return classProperty;
  }

  const [optionDecorator] = optionDecorators;

  if (!j.Identifier.check(optionDecorator.expression.callee.property)) {
    report(
      `Found non-statically analyzable decorator property access on ${COMMAND_IDENTIFIER} (expected one of ${ALL_OPTION_IDENTIFIERS.join(
        `, `,
      )})`,
    );
    return classProperty;
  }

  const decoratorName = optionDecorator.expression.callee.property.name;

  if (!ALL_OPTION_IDENTIFIERS.includes(decoratorName)) {
    report(
      `Found invalid v2 decorator name "${decoratorName}" property access on ${COMMAND_IDENTIFIER} (expected one of ${ALL_OPTION_IDENTIFIERS.join(
        `, `,
      )})`,
    );
    return classProperty;
  }

  addImports(root, j.template.statement`import {Option} from 'clipanion';`);

  const { value } = classProperty;

  const newArguments = [];

  if (OPTION_IDENTIFIERS.includes(decoratorName)) {
    const [descriptor, options] = optionDecorator.expression.arguments;

    newArguments.push(descriptor);
    if (value !== null) {
      newArguments.push(value);
    }
    if (typeof options !== `undefined`) {
      newArguments.push(options);
    }
  } else if (POSITIONAL_IDENTIFIERS.includes(decoratorName)) {
    newArguments.push(...optionDecorator.expression.arguments);
  } else {
    const [descriptorOrOptions, options] = optionDecorator.expression.arguments;
    const isStringPositional =
      typeof descriptorOrOptions === `undefined` || j.ObjectExpression.check(descriptorOrOptions);

    if (typeof descriptorOrOptions !== `undefined`) {
      newArguments.push(descriptorOrOptions);
    }
    if (value !== null && !isStringPositional) {
      newArguments.push(value);
    }
    if (typeof options !== `undefined`) {
      newArguments.push(options);
    }
  }

  const newValue = j.callExpression(
    j.memberExpression(j.identifier(OPTION_IDENTIFIER), j.identifier(decoratorName)),
    newArguments,
  );

  return { ...classProperty, decorators: regularDecorators, value: newValue };
};

export const commandClassBodyTransformer = (spec: TransformerSpec): void => {
  const { j, root } = spec;

  const classBodies = root.find(j.ClassBody).filter(({ parent: { value: parentNode } }) => {
    return (
      (j.ClassDeclaration.check(parentNode) || j.ClassExpression.check(parentNode)) &&
      parentNode.superClass !== null &&
      j.Identifier.check(parentNode.superClass) &&
      (parentNode.id?.name.endsWith(COMMAND_IDENTIFIER) ||
        parentNode.superClass.name.endsWith(COMMAND_IDENTIFIER))
    );
  });

  classBodies.replaceWith(({ node }) => ({
    ...node,
    body: node.body.flatMap((statement) => {
      if (
        `key` in statement &&
        j.Identifier.check(statement.key) &&
        statement.key.name === EXECUTE_IDENTIFIER
      )
        return commandPathTransformer(statement, spec);

      if (j.ClassProperty.check(statement)) return classPropertyTransformer(statement, spec);

      return statement;
    }),
  }));
};
