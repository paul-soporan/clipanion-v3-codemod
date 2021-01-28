// @ts-nocheck

import { Command, Option } from 'clipanion';

class MyCommand extends Command {
  async execute() {}
}

MyCommand['booleanOption'] = Option.Boolean('--flag');
MyCommand['booleanOptionWithOptions'] = Option.Boolean('--flag', { description: 'description' });
MyCommand['counterOption'] = Option.Counter('--flag');
MyCommand['counterOptionWithOptions'] = Option.Counter('--flag', { description: 'description' });
MyCommand['stringOption'] = Option.String('--flag');
MyCommand['stringOptionWithOptions'] = Option.String('--flag', { description: 'description' });
MyCommand['stringOptionWithTolerateBoolean'] = Option.String('--flag', { tolerateBoolean: true });
MyCommand['stringOptionWithArity'] = Option.String('--flag', { arity: 3 });
MyCommand['arrayOption'] = Option.Array('--flag');
MyCommand['arrayOptionWithOptions'] = Option.Array('--flag', { description: 'description' });
MyCommand['arrayOptionWithArity'] = Option.Array('--flag', { arity: 3 });
