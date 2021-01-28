import { commandClassBodyTransformer } from './commandClassBody';
import { commandEntriesTransformer } from './commandEntries';
import { commandClassFallbackMethodsTransformer } from './commandClassFallbackMethods';

export const transformers = [
  commandClassBodyTransformer,
  commandEntriesTransformer,
  commandClassFallbackMethodsTransformer,
];
