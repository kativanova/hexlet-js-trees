const stringify = (value, replacer = ' ', spacesCount = 1) => {
  const iter = (item, depth) => {
    if (typeof (item) !== 'object') {
      return item.toString();
    }
    const currentIndent = replacer.repeat(spacesCount * depth);
    const bracketIndent = replacer.repeat(spacesCount * (depth - 1));

    const strForKeys = Object
      .entries(item)
      .map(([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1)}`);
    return [
      '{',
      ...strForKeys,
      `${bracketIndent}}`,
    ].join('\n');
  };
  return iter(value, 1);
};

export default stringify;
