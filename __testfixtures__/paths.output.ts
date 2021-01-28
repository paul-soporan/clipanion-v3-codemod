// @ts-nocheck

import { Command } from 'clipanion';

class MyCommand extends Command {
  static paths = [Command.Default, ['install'], ['set', 'version', 'from', 'sources']];
  async execute() {}
}
