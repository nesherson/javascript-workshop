const team = {
  _players: [
    {
      firstName: 'Pablo',
      lastName: 'Sanchez',
      age: 11,
    },
    {
      firstName: 'Adam',
      lastName: 'Ericson',
      age: 13,
    },
    {
      firstName: 'David',
      lastName: 'Abramov',
      age: 12,
    },
  ],
  _games: [
    {
      opponent: 'Broncos',
      teamPoints: 42,
      opponentPoints: 27,
    },
    {
      opponent: 'Las Vegas Raiders',
      teamPoints: 35,
      opponentPoints: 47,
    },
    {
      opponent: 'Green Bay Packers',
      teamPoints: 52,
      opponentPoints: 50,
    },
  ],
  get players() {
    return this._players;
  },
  get games() {
    return this._games;
  },
  addPlayer: function (firstName, lastName, age) {
    const player = {
      firstName: firstName,
      lastName: lastName,
      age: age,
    };
    this._players.push(player);
  },
  addGame: function (opponentName, teamPoints, opponentPoints) {
    const game = {
      opponent: opponentName,
      teamPoints: teamPoints,
      opponentPoints: opponentPoints,
    };
    this._games.push(game);
  },
};

team.addPlayer('Steph', 'Curry', 28);
team.addPlayer('Lisa', 'Leslie', 44);
team.addPlayer('Bugs', 'Bunny', 76);

team.addGame('Titans', 100, 98);
team.addGame('Pittsburg Steelers', 77, 85);
team.addGame('Kansas City Chiefs', 95, 90);

console.log(team.games);
