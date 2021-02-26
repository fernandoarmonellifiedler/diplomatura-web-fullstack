export const reducer = (state, action) => {
  if (action.type === 'FETCH LIST') {
    const nuevaPersona = action.payload;
    return {
      ...state,
      personas: nuevaPersona,
    };
  }

  if (action.type === 'ADD_ITEM') {
    const nuevaPersona = [...state.personas, action.payload];
    return {
      ...state,
      personas: nuevaPersona,
    };
  }

  if (action.type === 'REMOVE_ITEM') {
    return {
      ...state,
      personas: state.personas.filter((unaPersona) => {
        return unaPersona.id !== Number(action.payload);
      }),
    };
  }
  throw new Error('no matching action type');
};
