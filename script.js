function extract(object, path) {
  if (path.includes('.')) {
    const property = path.split('.');
    console.log(property);
    return `${object}`;
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

console.log(extract(TEAM, 'coach.achievements.titles'));
