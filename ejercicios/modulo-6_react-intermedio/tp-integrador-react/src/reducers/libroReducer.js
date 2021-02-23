export const reducer = (state, action) => {
  if (action.type === 'FETCH LIST') {
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
    const nuevoLibros = state.libros.filter(
      (unLibro) => unLibro.id !== action.payload
    );
    return { ...state, libros: nuevoLibros };
  }

  throw new Error('no matching action type');
};
