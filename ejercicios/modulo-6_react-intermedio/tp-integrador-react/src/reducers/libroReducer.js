export const reducer = (state, action) => {
  if (action.type === 'FETCH_BOOK_LIST') {
    const nuevoLibros = action.payload;
    return {
      ...state,
      libros: nuevoLibros,
    };
  }

  if (action.type === 'FETCH_CATEGORIA_LIST') {
    const nuevaCategoria = action.payload;
    return {
      ...state,
      categorias: nuevaCategoria,
    };
  }

  if (action.type === 'FETCH_PERSONA_LIST') {
    const nuevaPersona = action.payload;
    return {
      ...state,
      personas: nuevaPersona,
    };
  }

  

  if (action.type === 'BOOK_ADD_ITEM') {
    const nuevoLibros = [...state.libros, action.payload];
    return {
      ...state,
      libros: nuevoLibros,
    };
  }

  if (action.type === 'BOOK_EDIT_ITEM') {
    const nuevoLibros = [...state.libros, action.payload];
    return {
      ...state,
      libros: nuevoLibros,
    };
  }

  if (action.type === 'BOOK_PRESTAR_ITEM') {
    const nuevoLibros = [...state.libros, action.payload];
    return {
      ...state,
      libros: nuevoLibros,
    };
  }

  if (action.type === 'BOOK_DEVOLVER_ITEM') {
    const nuevoLibros = [...state.libros, action.payload];
    return {
      ...state,
      libros: nuevoLibros,
    };
  }

  if (action.type === 'BOOK_REMOVE_ITEM') {
    return {
      ...state,
      libros: state.libros.filter((unLibro) => {
        return unLibro.id !== Number(action.payload);
      }),
    };
  }

  if (action.type === 'SWITCH_BOOK_EDIT_MODAL') {
    const modalState = !action.payload;
    return {
      ...state,
      libroEditModal: modalState,
    };
  }

  if (action.type === 'SWITCH_BOOK_PRESTAR_MODAL') {
    const modalState = !action.payload;
    return {
      ...state,
      libroPrestarModal: modalState,
    };
  }

  throw new Error('no matching action type');
};
