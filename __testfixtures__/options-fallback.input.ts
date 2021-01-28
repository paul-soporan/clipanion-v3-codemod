// @ts-nocheck

import { Command } from 'clipanion';

class MyCommand extends Command {
  async execute() {}
}

MyCommand.addOption('booleanOption', Command.Boolean('--flag'));
MyCommand.addOption(
  'booleanOptionWithOptions',
  Command.Boolean('--flag', { description: 'description' }),
);
MyCommand.addOption('counterOption', Command.Counter('--flag'));
MyCommand.addOption(
  'counterOptionWithOptions',
  Command.Counter('--flag', { description: 'description' }),
);
MyCommand.addOption('stringOption', Command.String('--flag'));
MyCommand.addOption(
  'stringOptionWithOptions',
  Command.String('--flag', { description: 'description' }),
);
MyCommand.addOption(
  'stringOptionWithTolerateBoolean',
  Command.String('--flag', { tolerateBoolean: true }),
);
MyCommand.addOption('stringOptionWithArity', Command.String('--flag', { arity: 3 }));
MyCommand.addOption('arrayOption', Command.Array('--flag'));
MyCommand.addOption(
  'arrayOptionWithOptions',
  Command.Array('--flag', { description: 'description' }),
);
MyCommand.addOption('arrayOptionWithArity', Command.Array('--flag', { arity: 3 }));
