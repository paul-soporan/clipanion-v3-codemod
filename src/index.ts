import type * as jscodeshift from 'jscodeshift';

import { transformers } from './transformers';

const transformer: jscodeshift.Transform = (file, api) => {
  const { jscodeshift: j } = api;
  const root = j(file.source);

  const transformerSpec = { ...api, j, root };

  transformers.forEach((t) => t(transformerSpec));

  return root.toSource();
};

export default transformer;

export const parser = `tsx`;
