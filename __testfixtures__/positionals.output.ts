// @ts-nocheck

import { Command, Option } from 'clipanion';

class MyCommand extends Command {
  stringPositional: string = Option.String();

  stringPositionalRequired: string = Option.String({ required: true });

  stringPositionalOptional: string | undefined = Option.String({ required: false });

  rest: string[] = Option.Rest();

  restRequired: string[] = Option.Rest({ required: 1 });

  proxy: string[] = Option.Proxy();

  proxyRequired: string[] = Option.Proxy({ required: 1 });

  async execute() {}
}
