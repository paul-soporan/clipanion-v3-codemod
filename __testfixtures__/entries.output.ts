// @ts-nocheck

import { Cli, Command, Builtins } from 'clipanion';

const cli = new Cli();

cli.register(Builtins.HelpCommand);
cli.register(Builtins.VersionCommand);

cli.runExit(process.argv.slice(2), Cli.defaultContext);
