const reducer = (state = initialWagonState, action) => {
  switch (action.type) {
    case 'gather':
      return {
        ...state,
        supplies: state.supplies + 15,
        days: state.days + 1,
      };
    case 'travel':
      const supplyCost = action.payload * 20;
      const distanceTravelled = action.payload * 10;

      if (supplyCost > state.supplies) {
        return;
      }

      return {
        supplies: state.supplies - supplyCost,
        distance: state.distance + distanceTravelled,
        days: action.payload,
      };
    case 'tippedWagon':
      return {
        ...state,
        supplies: state.supplies - 30,
        days: state.days + 1,
      };

    default:
      return state;
  }
};

const initialWagonState = {
  supplies: 100,
  distance: 0,
  days: 0,
};

let wagon = reducer(undefined, {});
console.log('Starting wagon: ', wagon);

wagon = reducer(wagon, {
  type: 'travel',
  payload: 1,
});
console.log('Wagon after travelling: ', wagon);

wagon = reducer(wagon, { type: 'gather' });
console.log('Wagon after gathering: ', wagon);

wagon = reducer(wagon, { type: 'tippedWagon' });
console.log('Wagon after tipping: ', wagon);

wagon = reducer(wagon, {
  type: 'travel',
  payload: 3,
});
console.log('Wagon after travelling for 3 days: ', wagon);
