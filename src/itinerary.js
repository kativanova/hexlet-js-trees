import _ from 'lodash';

const makeJoints = (tree, parent) => {
  const [leaf, children] = tree;
  if (!Array.isArray(children)) {
    return { [leaf]: [parent] };
  }
  const flatChildren = _.flatten(children);
  const neighbours = _.concat(flatChildren.filter((child) => !Array.isArray(child)), parent);
  return {
    [leaf]: neighbours,
    ...children.reduce((acc, child) => ({ ...acc, ...makeJoints(child, leaf) }), {}),
  };
};

const itinerary = (tree, start, finish) => {
  const joints = makeJoints(tree);
  console.log(joints);
  return joints;
};

export default itinerary;
