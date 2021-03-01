export const reducer = (state, action) => {
  if (action.type === 'FETCH_LIST') {
    const nuevaPersona = action.payload;
    return {
      ...state,
      personas: nuevaPersona,
    };
  }

  if (action.type === 'FETCH_LIBRO_LIST') {
    const nuevoLibro = action.payload;
    return {
      ...state,
      listaLibros: nuevoLibro,
    };
  }

  if (action.type === 'ADD_ITEM') {
    const nuevaPersona = [...state.personas, action.payload];
    return {
      ...state,
      personas: nuevaPersona,
    };
  }

  if (action.type === 'EDIT_ITEM') {
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

  if (action.type === 'SWITCH_EDIT_MODAL') {
    const modalState = !action.payload;
    return {
      ...state,
      personaEditModal: modalState,
    };
  }

  throw new Error('no matching action type');
};
