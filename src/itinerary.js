import _ from 'lodash';

const itinerary = (tree, start, finish) => {
  const flatTree = {};
  const makeFlat = (node, parent) => {
    const [name, branches] = node;
    const children = [];
    flatTree[name] = { parent, children };
    if (Array.isArray(branches)) {
      branches.forEach((branch) => {
        const newNode = makeFlat(branch, name);
        children.push(newNode);
      });
    }
    return name;
  };

  makeFlat(tree, null);
  const visited = [];

  const findRoute = (city) => {
    if (city === finish) {
      return city;
    }
    let near = [...flatTree[city].children];
    if (flatTree[city].parent !== null) {
      near.push(flatTree[city].parent);
    }

    visited.push(city);
    near = _.difference(near, visited);

    if (near.length === 0) {
      return [];
    }
    const route = near.flatMap(findRoute);
    return route.length === 0 ? [] : [city, ...route];
  };

  return findRoute(start);
};

export default itinerary;
