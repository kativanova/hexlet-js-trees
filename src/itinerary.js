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
    .reduce((acc, child) => ({...acc, ...makeJoints(child, leaf)}), {});
  return {
    [leaf]: neighbours, ...joints
  };
};

const itinerary = (tree, start, finish) => {
  const joints = makeJoints(tree);
  console.log(joints);
  return joints;
};

export default itinerary;
