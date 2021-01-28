// @ts-nocheck

import { Command } from 'clipanion';

class MyCommand extends Command {
  async execute() {}
}

MyCommand.addPath();
MyCommand.addPath('install');
MyCommand.addPath('set', 'version', 'from', 'sources');
