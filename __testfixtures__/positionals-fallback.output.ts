// @ts-nocheck

import { Command, Option } from 'clipanion';

class MyCommand extends Command {
  async execute() {}
}

MyCommand['stringPositional'] = Option.String();
MyCommand['stringPositionalRequired'] = Option.String({ required: true });
MyCommand['stringPositionalOptional'] = Option.String({ required: false });
MyCommand['rest'] = Option.Rest();
MyCommand['restRequired'] = Option.Rest({ required: 1 });
MyCommand['proxy'] = Option.Proxy();
MyCommand['proxyRequired'] = Option.Proxy({ required: 1 });
