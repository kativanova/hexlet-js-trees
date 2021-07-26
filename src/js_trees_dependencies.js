const sortDeps = (dependencies) => {
  const dependencyList = [];

  const iter = (node) => {
    const deps = dependencies[node];
    if (deps && deps.length) {
      deps.forEach(iter);
    }
    if (!dependencyList.includes(node)) {
      dependencyList.push(node);
    }
  };
  const nodes = Object.keys(dependencies);
  nodes.forEach((item) => iter(item));
  return dependencyList;
};

export default sortDeps;
