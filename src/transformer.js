import _ from 'lodash';

const makeJoints = (node, parent) => {
  const [leaf, children] = node;

  if (!_.isArray(children)) {
    return { [leaf]: [parent] };
  }

  const neighbours = _.concat(parent, children);
  const flatNeighbours = _.flatten(neighbours)
    .filter((neighbour) => !_.isArray(neighbour) && neighbour !== undefined);
  const joints = children
    .reduce((acc, child) => ({ ...acc, ...makeJoints(child, leaf) }), {});
  return { [leaf]: flatNeighbours, ...joints };
};

const buildTree = (node, joints, visited = []) => {
  const children = joints[node];
  visited.push(node);

  const neighbours = children
    .filter((child) => !visited.includes(child))
    .map((child) => buildTree(child, joints, visited));
  return _.isEmpty(neighbours) ? [node] : [node, neighbours];
};

const transformer = (tree, newRoot) => {
  const joints = makeJoints(tree);
  console.log(joints);
  const newTree = buildTree(newRoot, joints);
  console.log(newTree);
  return newTree;
};

export default transformer;
