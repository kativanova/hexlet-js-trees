const removeFirstLevel = (tree) => {
  const result = tree.filter(Array.isArray);
  return result.flat();
};

export default removeFirstLevel;
