import { mkdir, mkfile } from '@hexlet/immutable-fs-trees';
import { compressImages } from './tree.js';

const tree = mkdir('my documents', [
  mkdir('documents.jpg'),
  mkfile('avatar.jpg', { size: 100 }),
  mkfile('passport.jpg', { size: 200 }),
  mkfile('family.jpg', { size: 150 }),
  mkfile('addresses', { size: 125 }),
  mkdir('presentations'),
], { test: 'haha' });

const newTree = compressImages(tree);
console.log(newTree);
