// @ts-nocheck

import { Command } from 'clipanion';

class MyCommand extends Command {
  @Command.Path()
  @Command.Path('install')
  @Command.Path('set', 'version', 'from', 'sources')
  async execute() {}
}
