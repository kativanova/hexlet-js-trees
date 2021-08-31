import _ from 'lodash';

const makeJoints = (branch, parent) => {
  const [node, children] = branch;

  if (!_.isArray(children)) {
    return { [node]: parent };
  }

  const flatChildren = _.flatten(children);
  const neighbours = [parent, ...flatChildren]
    .filter((n) => n && !_.isArray(n));
  const joints = children.reduce((acc, child) => ({ ...acc, ...makeJoints(child, node) }), {});
  return { [node]: neighbours, ...joints };
};

const buildTree = (joints, root) => {
  const iter = (node, acc) => {
    const children = joints[node];
    const checked = [...acc, node];
    const branches = children
      .filter((child) => !checked.includes(child))
      .map((child) => iter(child, checked));
    return !_.isEmpty(branches) ? [node, branches] : [node];
  };

  return iter(root, []);
};

const combine = (...branches) => {
  const [firstBranch] = branches;
  const [root] = firstBranch;
  const joints = branches.map((branch) => makeJoints(branch))
    .reduce((acc, branch) => {
      const keys = Object.keys(branch);
      const newAcc = _.cloneDeep(acc);
      keys.forEach((key) => {
        newAcc[key] = _.has(acc, key) ? _.union(acc[key], branch[key]) : [...branch[key]];
      });
      return newAcc;
    }, {});
  return buildTree(joints, root);
};

export default combine;
