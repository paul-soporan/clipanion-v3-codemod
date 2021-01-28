// @ts-nocheck

import { Command } from 'clipanion';

class MyCommand extends Command {
  async execute() {}
}

(MyCommand.paths ?? (MyCommand.paths = [])).push(Command.Default);
(MyCommand.paths ?? (MyCommand.paths = [])).push(['install']);
(MyCommand.paths ?? (MyCommand.paths = [])).push(['set', 'version', 'from', 'sources']);
