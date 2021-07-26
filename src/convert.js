export default (tree) => {
  const getRecursiveValue = (node) => {
    if (Array.isArray(node) && !node.length) {
      return {};
    }
    if (!Array.isArray(node)) {
      return node;
    }

    const result = node.reduce((resObj, item) => {
      const [key, value] = item;
      resObj[key] = getRecursiveValue(value);
      return { ...resObj };
    }, {});

    return result;
  };

  return getRecursiveValue(tree);
};
