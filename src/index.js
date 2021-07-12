import { mkdir, mkfile } from '@hexlet/immutable-fs-trees';
import { getNodesCount } from './tree.js';

const tree = mkdir('/', [
  mkdir('etc', [
    mkfile('bashrc'),
    mkfile('consul.cfg'),
  ]),
  mkfile('hexletrc'),
  mkdir('bin', [
    mkfile('ls'),
    mkfile('cat'),
  ]),
]);

console.log(getNodesCount(tree));
