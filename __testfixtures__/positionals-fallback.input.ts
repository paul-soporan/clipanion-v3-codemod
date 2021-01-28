// @ts-nocheck

import { Command } from 'clipanion';

class MyCommand extends Command {
  async execute() {}
}

MyCommand.addOption('stringPositional', Command.String());
MyCommand.addOption('stringPositionalRequired', Command.String({ required: true }));
MyCommand.addOption('stringPositionalOptional', Command.String({ required: false }));
MyCommand.addOption('rest', Command.Rest());
MyCommand.addOption('restRequired', Command.Rest({ required: 1 }));
MyCommand.addOption('proxy', Command.Proxy());
MyCommand.addOption('proxyRequired', Command.Proxy({ required: 1 }));
