import addImports from 'jscodeshift-add-imports';
import {
  TransformerSpec,
  convertCallExpressionToCommandPath,
  isCommandCallExpression,
  CommandCallExpression,
  makePath,
  COMMAND_IDENTIFIER,
  OPTION_IDENTIFIER,
} from '../utils';

const ADD_PATH_IDENTIFIER = 'addPath';

const addPathTransformer = (spec: TransformerSpec): void => {
  const { j, root } = spec;

  const addPathCallExpressions = root
    .find(j.CallExpression, {
      callee: {
        property: {
          name: ADD_PATH_IDENTIFIER,
        },
      },
    })
    .filter(({ node }) => isCommandCallExpression(node, spec));

  addPathCallExpressions.replaceWith(({ node }) => {
    const commandClassIdentifier = (node as CommandCallExpression).callee.object;

    const commandClassPathsMemberExpression = j.memberExpression(
      commandClassIdentifier,
      j.identifier('paths'),
    );

    return {
      ...node,
      callee: j.memberExpression(
        j.logicalExpression(
          '??',
          commandClassPathsMemberExpression,
          j.assignmentExpression('=', commandClassPathsMemberExpression, j.arrayExpression([])),
        ),
        j.identifier('push'),
      ),
      arguments: [convertCallExpressionToCommandPath(node, spec)],
    };
  });
};

const ADD_OPTION_IDENTIFIER = 'addOption';

const addOptionTransformer = (spec: TransformerSpec): void => {
  const { j, root } = spec;

  const addOptionCallExpressions = root
    .find(j.CallExpression, {
      callee: {
        property: {
          name: ADD_OPTION_IDENTIFIER,
        },
      },
    })
    .filter(({ node }) => isCommandCallExpression(node, spec));

  addOptionCallExpressions.replaceWith(({ node }) => {
    const commandClassIdentifier = (node as CommandCallExpression).callee.object;
    const [commandClassProperty, optionDecoratorExpression] = node.arguments;

    if (typeof commandClassProperty === 'undefined') {
      throw new TypeError(
        `Missing property name in "${makePath(
          commandClassIdentifier.name,
          ADD_OPTION_IDENTIFIER,
        )}" call`,
      );
    }

    if (typeof optionDecoratorExpression === 'undefined') {
      throw new TypeError(
        `Missing option decorator expression in "${makePath(
          commandClassIdentifier.name,
          ADD_OPTION_IDENTIFIER,
        )}" call`,
      );
    }

    if (
      !j.CallExpression.check(optionDecoratorExpression) ||
      !j.MemberExpression.check(optionDecoratorExpression.callee) ||
      !j.Identifier.check(optionDecoratorExpression.callee.object) ||
      optionDecoratorExpression.callee.object.name !== COMMAND_IDENTIFIER
    ) {
      throw new Error(
        `Invalid option decorator expression in "${makePath(
          commandClassIdentifier.name,
          ADD_OPTION_IDENTIFIER,
        )}" call`,
      );
    }

    const commandMemberExpression = j.memberExpression(
      commandClassIdentifier,
      // @ts-expect-error
      commandClassProperty,
      true,
    );

    addImports(root, j.template.statement`import {Option} from 'clipanion';`);

    return j.assignmentExpression('=', commandMemberExpression, {
      ...optionDecoratorExpression,
      callee: {
        ...optionDecoratorExpression.callee,
        object: j.identifier(OPTION_IDENTIFIER),
      },
    });
  });
};

export const commandClassFallbackMethodsTransformer = (spec: TransformerSpec): void => {
  addPathTransformer(spec);
  addOptionTransformer(spec);
};
