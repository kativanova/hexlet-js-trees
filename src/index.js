import transformer from './transformer.js';

const tree = 
['A', [              //     A
  ['B', [            //    / \
    ['D'],           //   B   C
  ]],                //  /   / \
  ['C', [            // D   E   F
    ['E'],
    ['F'],
  ]],
]];

transformer(tree, 'B');
