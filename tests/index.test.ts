import { defineTest as _defineTest } from 'jscodeshift/src/testUtils';

jest.autoMockOff();

const defineTest = (fixture: string) =>
  _defineTest(__dirname, './src/index.ts', {}, fixture, { parser: 'ts' });

defineTest('entries');

defineTest('empty-body');

defineTest('paths');
defineTest('positionals');
defineTest('options');

defineTest('paths-fallback');
defineTest('positionals-fallback');
defineTest('options-fallback');
