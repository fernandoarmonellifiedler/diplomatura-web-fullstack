export const reducer = (state, action) => {
  if (action.type === 'FETCH LIST') {
    const nuevaCategorias = action.payload;
    return {
      ...state,
      categorias: nuevaCategorias,
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
