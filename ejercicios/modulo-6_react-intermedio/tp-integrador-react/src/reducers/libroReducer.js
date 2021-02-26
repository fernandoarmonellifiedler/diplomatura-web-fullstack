export const reducer = (state, action) => {
  if (action.type === 'FETCH_LIST') {
    const nuevoLibros = action.payload;
    return {
      ...state,
      libros: nuevoLibros,
    };
  }

  if (action.type === 'ADD_ITEM') {
    const nuevoLibros = [...state.libros, action.payload];
    return {
      ...state,
      libros: nuevoLibros,
    };
  }

  if (action.type === 'REMOVE_ITEM') {
    return {
      ...state,
      libros: state.libros.filter((unLibro) => {
        return unLibro.id !== Number(action.payload);
      }),
    };
  }
  throw new Error('no matching action type');
};
