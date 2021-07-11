/* eslint-disable import/prefer-default-export */
// @ts-check

import _ from 'lodash';
import {
  mkdir, mkfile, isFile, getChildren, getName, getMeta,
} from '@hexlet/immutable-fs-trees';

// BEGIN (write your solution here)
const compressImages = (tree) => {
  const children = getChildren(tree);
  const meta = _.cloneDeep(getMeta(tree));
  const newChildren = children.map((child) => {
    const name = getName(child);

    if (!isFile(child) || !name.endsWith('.jpg')) {
      return child;
    }

    const fileMeta = _.cloneDeep(getMeta(child));
    fileMeta.size /= 2;
    return mkfile(name, fileMeta);
  });

  return mkdir(getName(tree), newChildren, meta);
};

const changeOwner = (tree, owner) => {
  const meta = getMeta(tree);
  const newMeta = _.cloneDeep(meta);
  newMeta.owner = owner;

  if (isFile(tree)) {
    return mkfile(getName(tree), newMeta);
  }

  const children = getChildren(tree);
  const newChildren = children.map((child) => changeOwner(child, owner));

  return mkdir(getName(tree), newChildren, newMeta);
};

export { compressImages, changeOwner };
// END
