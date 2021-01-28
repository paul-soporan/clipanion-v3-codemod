// @ts-nocheck

import { Command, Option } from 'clipanion';

class MyCommand extends Command {
  booleanOption?: boolean = Option.Boolean('--flag');

  booleanOptionWithDefault: boolean = Option.Boolean('--flag', true);

  booleanOptionWithOptions?: boolean = Option.Boolean('--flag', { description: 'description' });

  booleanOptionWithDefaultAndOptions: boolean = Option.Boolean('--flag', true, { description: 'description' });

  counterOption?: number = Option.Counter('--flag');

  counterOptionWithDefault: number = Option.Counter('--flag', 0);

  counterOptionWithOptions?: number = Option.Counter('--flag', { description: 'description' });

  counterOptionWithDefaultAndOptions: number = Option.Counter('--flag', 0, { description: 'description' });

  stringOption?: string = Option.String('--flag');

  stringOptionWithDefault: string = Option.String('--flag', 'default');

  stringOptionWithOptions?: string = Option.String('--flag', { description: 'description' });

  stringOptionWithDefaultAndOptions: string = Option.String('--flag', 'default', { description: 'description' });

  stringOptionWithTolerateBoolean?: string | boolean = Option.String('--flag', { tolerateBoolean: true });

  stringOptionWithArity?: [string, string, string] = Option.String('--flag', { arity: 3 });

  arrayOption?: string[] = Option.Array('--flag');

  arrayOptionWithDefault: string[] = Option.Array('--flag', []);

  arrayOptionWithOptions?: string[] = Option.Array('--flag', { description: 'description' });

  arrayOptionWithDefaultAndOptions: string[] = Option.Array('--flag', [], { description: 'description' });

  arrayOptionWithArity?: [string, string, string][] = Option.Array('--flag', { arity: 3 });

  async execute() {}
}
