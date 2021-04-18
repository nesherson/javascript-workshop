const reducer = (state = initialWagonState, action) => {
  switch (action.payload) {
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
