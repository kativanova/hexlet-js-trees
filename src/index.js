import itinerary from './itinerary.js';

/* const tree = mkdir('/', [
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
 */
const tree = ['Moscow',
  [
    ['Smolensk'],
    ['Yaroslavl'],
    ['Voronezh', [
      ['Liski'],
      ['Boguchar'],
      ['Kursk', [
        ['Belgorod', [
          ['Borisovka'],
        ]],
        ['Kurchatov'],
      ]],
    ]],
    ['Ivanovo', [
      ['Kostroma'], ['Kineshma'],
    ]],
    ['Vladimir'],
    ['Tver', [
      ['Klin'], ['Dubna'], ['Rzhev'],
    ]],
  ],
];

itinerary(tree, 'Dubna', 'Kostroma');
