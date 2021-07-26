const convert = (node) => node.reduce((resObj, item) => {
  const [key, value] = item;
  const newValue = Array.isArray(value) ? convert(value) : value;
  return { ...resObj, [key]: newValue };
}, {});

export default convert;
