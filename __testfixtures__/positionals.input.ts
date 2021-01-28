// @ts-nocheck

import { Command } from 'clipanion';

class MyCommand extends Command {
  @Command.String()
  stringPositional!: string;

  @Command.String({ required: true })
  stringPositionalRequired!: string;

  @Command.String({ required: false })
  stringPositionalOptional: string | undefined;

  @Command.Rest()
  rest: string[] = [];

  @Command.Rest({ required: 1 })
  restRequired: string[] = [];

  @Command.Proxy()
  proxy: string[] = [];

  @Command.Proxy({ required: 1 })
  proxyRequired: string[] = [];

  async execute() {}
}
