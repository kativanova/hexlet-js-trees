const flatten = (arr) => arr.reduce((acc, item) => {
  const newValue = Array.isArray(item) ? flatten(item) : [item];
  return [...acc, ...newValue];
}, []);

export default flatten;
