export const reducer = (state, action) => {
  if (action.type === 'FETCH_LIST') {
    const nuevaCategorias = action.payload;
    return {
      ...state,
      categorias: nuevaCategorias,
    };
  }

  if (action.type === 'FETCH_BOOK_LIST') {
    const nuevoLibros = action.payload;
    return {
      ...state,
      libros: nuevoLibros,
    };
  }

  if (action.type === 'FETCH_ONE') {
    const categoriaId = action.payload;
    return {
      ...state,
      categoriaLibros: state.libros.filter((unLibro) => {
        return unLibro.categoria_id === Number(categoriaId);
      }),
    };
  }

  if (action.type === 'ADD_ITEM') {
    const nuevaCategorias = [...state.categorias, action.payload];
    return {
      ...state,
      categorias: nuevaCategorias,
    };
  }

  if (action.type === 'REMOVE_ITEM') {
    return {
      ...state,
      categorias: state.categorias.filter((unaCategoria) => {
        return unaCategoria.id !== Number(action.payload);
      }),
    };
  }
  throw new Error('no matching action type');
};
