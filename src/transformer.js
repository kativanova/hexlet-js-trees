import _ from 'lodash';

const makeJoints = (node, parent) => {
  const [leaf, children] = node;

  if (!_.isArray(children)) {
    return { [leaf]: [parent] };
  }

  const flatChildren = _.flatten(children);
  const neighbours = [...flatChildren, parent].filter(
    (neighbour) => !_.isArray(neighbour) && neighbour,
  );

  const joints = children.reduce(
    (acc, child) => ({ ...acc, ...makeJoints(child, leaf) }),
    {},
  );
  return { [leaf]: neighbours, ...joints };
};

const buildTree = (node, joints) => {
  const iter = (leaf, acc) => {
    const checked = [...acc, leaf];

    const neighbours = joints[leaf]
      .filter((child) => !checked.includes(child))
      .map((child) => iter(child, checked));
    return _.isEmpty(neighbours) ? [leaf] : [leaf, neighbours];
  };

  return iter(node, []);
};

const transformer = (tree, newRoot) => {
  const joints = makeJoints(tree);
  return buildTree(newRoot, joints);
};

export default transformer;
