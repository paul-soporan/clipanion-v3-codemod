// @ts-nocheck

import { Cli, Command } from 'clipanion';

const cli = new Cli();

cli.register(Command.Entries.Help);
cli.register(Command.Entries.Version);

cli.runExit(process.argv.slice(2), Cli.defaultContext);
