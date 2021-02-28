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
    //console.log(nuevoLibros);
    return {
      ...state,
      libros: nuevoLibros,
    };
  }

  if (action.type === 'FETCH_ONE') {
    const categoriaId = Number(action.payload);
    return {
      ...state,
      librosEnCategoria: state.libros.filter((unLibro) => {
        //console.log(unLibro.categoria_id, unLibro.categoria_id === categoriaId);
        return unLibro.categoria_id === categoriaId;
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

  if (action.type === 'EDIT_ITEM') {
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

  if (action.type === 'SWITCH_MODAL') {
    const modalState = !action.payload;
    return {
      ...state,
      categoriaModal: modalState,
    };
  }

  if (action.type === 'SWITCH_EDIT_MODAL') {
    const modalState = !action.payload;
    return {
      ...state,
      categoriaEditModal: modalState,
    };
  }

  // if (action.type === 'CAMBIO_ESTADO') {
  //   const estado = !action.payload;
  //   return {
  //     ...state,
  //     cambioEstado: estado,
  //   };
  // }

  throw new Error('no matching action type');
};
