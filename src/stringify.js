const stringify = (value, replacer = ' ', spacesCount = 1) => {
  const iter = (item, depth) => {
    if (typeof (item) !== 'object') {
      return item.toString();
    }
    const keys = Object.keys(item);
    const strForKeys = keys.map((key) => `${replacer.repeat(spacesCount * depth)}${key}: ${iter(item[key], depth + 1)}\n`);
    return `{\n${strForKeys.join('')}${replacer.repeat(spacesCount * (depth - 1))}}`;
  };
  return iter(value, 1);
};

export default stringify;
