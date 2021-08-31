import _ from 'lodash';

const makeJoints = (tree, parent) => {
  const [leaf, children] = tree;

  if (!Array.isArray(children)) {
    return { [leaf]: [parent] };
  }

  const flatChildren = _.flatten(children);
  const neighbours = [...flatChildren, parent]
    .filter((neighbour) => !_.isArray(neighbour) && neighbour !== undefined);
  const joints = children
    .reduce((acc, child) => ({ ...acc, ...makeJoints(child, leaf) }), {});
  return {
    [leaf]: neighbours, ...joints,
  };
};

const findRoute = (start, finish, joints) => {
  const iter = (current, route) => {
    const routeToCurrent = [...route, current];

    if (current === finish) {
      return routeToCurrent;
    }

    const neighbours = joints[current];
    const filtered = neighbours
      .filter((neighbour) => !routeToCurrent.includes(neighbour));
    return filtered
      .reduce((acc, neighbour) => _.concat(acc, iter(neighbour, routeToCurrent)), []);
  };

  return iter(start, []);
};

const itinerary = (tree, start, finish) => {
  const joints = makeJoints(tree);
  return findRoute(start, finish, joints);
};

export default itinerary;
