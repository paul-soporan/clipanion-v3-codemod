import addImports from 'jscodeshift-add-imports';
import { TransformerSpec, makePath, COMMAND_IDENTIFIER } from '../utils';

const ENTRIES_IDENTIFIER = `Entries`;
const BUILTINS_IDENTIFIER = `Builtins`;

const COMMAND_ENTRIES = [`Help`, `Version`];

const COMMAND_ENTRIES_PATH = makePath(COMMAND_IDENTIFIER, ENTRIES_IDENTIFIER);

export const commandEntriesTransformer = (spec: TransformerSpec): void => {
  const { j, root, report, stats } = spec;

  const commandEntriesMemberExpressions = root.find(j.MemberExpression, {
    object: {
      object: {
        name: COMMAND_IDENTIFIER,
      },
      property: {
        name: ENTRIES_IDENTIFIER,
      },
    },
  });

  if (commandEntriesMemberExpressions.length > 0) {
    stats(`Command.Entries.* -> Builtins.*Command`, commandEntriesMemberExpressions.length);

    addImports(root, j.template.statement`import {Builtins} from 'clipanion';`);

    commandEntriesMemberExpressions.replaceWith(({ node }) => {
      if (!j.Identifier.check(node.property)) {
        report(
          `Found non-statically analyzable property access on ${COMMAND_ENTRIES_PATH}; needs to be manually migrated`,
        );
        return { ...node, object: j.identifier(BUILTINS_IDENTIFIER) };
      }

      const { name } = node.property;
      if (!COMMAND_ENTRIES.includes(name))
        report(
          `Found invalid v2 entry name "${name}" property access on ${COMMAND_ENTRIES_PATH} (expected one of ${COMMAND_ENTRIES.join(
            `, `,
          )})`,
        );

      const newName = `${name}Command`;

      return j.memberExpression(j.identifier(BUILTINS_IDENTIFIER), j.identifier(newName));
    });
  }
};
