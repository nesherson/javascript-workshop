function iterate(obj, path) {
  if (obj.hasOwnProperty(path)) {
    return obj[path];
  }
  for (const property in obj) {
    if (typeof obj[property] === 'object') {
      const value = iterate(obj[property], path);
      if (value) return value;
    }
  }
  return null;
}

function extract(object, path) {
  if (path.includes('.')) {
    const properties = path.split('.');
    const lastProp = properties[properties.length - 1];

    return iterate(object, lastProp);
  } else if (!path.includes('.') && object.hasOwnProperty(path)) {
    return object[path];
  }
  return null;
}
const TEAM = {
  name: 'Buzzer Beaters',
  coach: {
    name: 'Nancy',
    achievements: {
      titles: 2,
      hallOfFame: true,
    },
  },
  location: {
    town: 'Miami',
    state: 'Florida',
  },
};

console.log(extract(TEAM, 'location.town'));
