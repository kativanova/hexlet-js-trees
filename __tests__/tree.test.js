// @ts-check

import {
  getChildren, mkdir, mkfile, getMeta,
} from '@hexlet/immutable-fs-trees';
import { expect, test } from '@jest/globals';
import { compressImages, changeOwner, getNodesCount } from '../src/tree.js';

test('compressImages 1', () => {
  const tree = mkdir('my documents', [
    mkdir('documents.jpg'),
    mkfile('avatar.jpg', { size: 100 }),
    mkfile('passport.jpg', { size: 200 }),
    mkfile('family.jpg', { size: 150 }),
    mkfile('addresses', { size: 125 }),
    mkdir('presentations'),
  ], { test: 'haha' });

  const newTree = compressImages(tree);

  const expectation = [
    {
      name: 'documents.jpg',
      type: 'directory',
    },
    {
      name: 'avatar.jpg',
      meta: { size: 50 },
      type: 'file',
    },
    {
      name: 'passport.jpg',
      meta: { size: 100 },
      type: 'file',
    },
    {
      name: 'family.jpg',
      meta: { size: 75 },
      type: 'file',
    },
    {
      name: 'addresses',
      meta: { size: 125 },
      type: 'file',
    },
    {
      name: 'presentations',
      type: 'directory',
    },
  ];

  expect(newTree).toMatchObject({
    meta: { test: 'haha' },
    children: expectation,
  });
});

test('compressImages 2', () => {
  const tree = mkdir('my documents', [
    mkdir('presentations'),
  ]);

  const newTree = compressImages(tree);

  expect(newTree).toMatchObject({
    meta: {},
    children: [
      { name: 'presentations' },
    ],
  });
});

test('compressImages 3 - deepClone', () => {
  const tree = mkdir('my documents', [
    mkfile('avatar.jpg', { size: 100, attributes: { hide: false, readOnly: true } }),
    mkdir('presentations'),
  ]);
  const newTree = compressImages(tree);
  const newFile = getChildren(newTree)[0];
  const newFileMeta = getMeta(newFile);
  newFileMeta.attributes.hide = true;
  const oldFile = getChildren(tree)[0];
  const oldFileMeta = getMeta(oldFile);
  expect(oldFileMeta.attributes.hide).toEqual(false);
});

test('changeOwner1', () => {
  const tree = mkdir('/', [
    mkdir('etc', [
      mkfile('bashrc'),
      mkfile('consul.cfg'),
    ], { owner: 'nobody' }),
    mkfile('hexletrc'),
    mkdir('bin', [
      mkfile('ls'),
      mkfile('cat'),
    ]),
  ]);

  const expectation = [
    {
      name: 'etc',
      type: 'directory',
      meta: { owner: 'katya' },
      children: [
        {
          name: 'bashrc',
          type: 'file',
          meta: { owner: 'katya' },
        },
        {
          name: 'consul.cfg',
          type: 'file',
          meta: { owner: 'katya' },
        },
      ],
    },
    {
      name: 'hexletrc',
      meta: { owner: 'katya' },
      type: 'file',
    },
    {
      name: 'bin',
      type: 'directory',
      meta: { owner: 'katya' },
      children: [
        {
          name: 'ls',
          type: 'file',
          meta: { owner: 'katya' },
        },
        {
          name: 'cat',
          type: 'file',
          meta: { owner: 'katya' },
        },
      ],
    },
  ];

  const newTree = changeOwner(tree, 'katya');

  expect(newTree).toMatchObject({
    meta: { owner: 'katya' },
    children: expectation,
  });
});

test('getNodesCount1', () => {
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
  expect(getNodesCount(tree)).toBe(8);
});
