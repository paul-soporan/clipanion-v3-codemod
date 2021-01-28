// @ts-nocheck

import { Command } from 'clipanion';

class MyCommand extends Command {
  @Command.Boolean('--flag')
  booleanOption?: boolean;

  @Command.Boolean('--flag')
  booleanOptionWithDefault: boolean = true;

  @Command.Boolean('--flag', { description: 'description' })
  booleanOptionWithOptions?: boolean;

  @Command.Boolean('--flag', { description: 'description' })
  booleanOptionWithDefaultAndOptions: boolean = true;

  @Command.Counter('--flag')
  counterOption?: number;

  @Command.Counter('--flag')
  counterOptionWithDefault: number = 0;

  @Command.Counter('--flag', { description: 'description' })
  counterOptionWithOptions?: number;

  @Command.Counter('--flag', { description: 'description' })
  counterOptionWithDefaultAndOptions: number = 0;

  @Command.String('--flag')
  stringOption?: string;

  @Command.String('--flag')
  stringOptionWithDefault: string = 'default';

  @Command.String('--flag', { description: 'description' })
  stringOptionWithOptions?: string;

  @Command.String('--flag', { description: 'description' })
  stringOptionWithDefaultAndOptions: string = 'default';

  @Command.String('--flag', { tolerateBoolean: true })
  stringOptionWithTolerateBoolean?: string | boolean;

  @Command.String('--flag', { arity: 3 })
  stringOptionWithArity?: [string, string, string];

  @Command.Array('--flag')
  arrayOption?: string[];

  @Command.Array('--flag')
  arrayOptionWithDefault: string[] = [];

  @Command.Array('--flag', { description: 'description' })
  arrayOptionWithOptions?: string[];

  @Command.Array('--flag', { description: 'description' })
  arrayOptionWithDefaultAndOptions: string[] = [];

  @Command.Array('--flag', { arity: 3 })
  arrayOptionWithArity?: [string, string, string][];

  async execute() {}
}
