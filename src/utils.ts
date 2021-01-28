import type * as jscodeshift from 'jscodeshift';
import addImports from 'jscodeshift-add-imports';

export const COMMAND_IDENTIFIER = `Command`;
export const DEFAULT_IDENTIFIER = `Default`;
export const OPTION_IDENTIFIER = `Option`;

export const makePath = (...segments: string[]): string => segments.join(`.`);

export type TransformerSpec = jscodeshift.API & {
  root: jscodeshift.Collection<unknown>;
};

export type CommandCallExpression = jscodeshift.CallExpression & {
  callee: jscodeshift.MemberExpression & {
    object: jscodeshift.Identifier & {
      name: `${string}Command`;
    };
  };
};

export const isCommandCallExpression = (
  node: jscodeshift.CallExpression,
  { j }: TransformerSpec,
): node is CommandCallExpression => {
  return (
    j.MemberExpression.check(node.callee) &&
    j.Identifier.check(node.callee.object) &&
    node.callee.object.name.endsWith(COMMAND_IDENTIFIER)
  );
};

export const convertCallExpressionToCommandPath = (
  callExpression: jscodeshift.CallExpression,
  { j, root }: TransformerSpec,
): jscodeshift.ArrayExpression | jscodeshift.MemberExpression => {
  if (callExpression.arguments.length > 0) {
    return j.arrayExpression(callExpression.arguments);
  }

  addImports(root, j.template.statement`import {Command} from 'clipanion';`);

  return j.memberExpression(j.identifier(COMMAND_IDENTIFIER), j.identifier(DEFAULT_IDENTIFIER));
};
