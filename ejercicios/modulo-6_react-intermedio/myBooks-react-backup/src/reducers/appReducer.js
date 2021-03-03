export const reducer = (state, action) => {
  if (action.type === 'FETCH_CATEGORIA_LIST') {
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

  if (action.type === 'FETCH_PERSONA_LIST') {
    const nuevaPersona = action.payload;
    return {
      ...state,
      personas: nuevaPersona,
    };
  }
  // Categoria Component
  if (action.type === 'FETCH_BOOKS_ON_CATEGORY') {
    const categoriaId = Number(action.payload);
    return {
      ...state,
      librosEnCategoria: state.libros.filter((unLibro) => {
        return unLibro.categoria_id === categoriaId;
      }),
    };
  }
  if (action.type === 'CATEGORIA_ADD_ITEM') {
    const nuevaCategorias = [...state.categorias, action.payload];
    return {
      ...state,
      categorias: nuevaCategorias,
    };
  }
  if (action.type === 'CATEGORIA_EDIT_ITEM') {
    const nuevaCategorias = [...state.categorias, action.payload];
    return {
      ...state,
      categorias: nuevaCategorias,
    };
  }
  if (action.type === 'CATEGORIA_REMOVE_ITEM') {
    return {
      ...state,
      categorias: state.categorias.filter((unaCategoria) => {
        return unaCategoria.id !== Number(action.payload);
      }),
    };
  }
  if (action.type === 'SWITCH_CATEGORIA_MODAL') {
    const modalState = !action.payload;
    return {
      ...state,
      categoriaLibrosModal: modalState,
    };
  }
  if (action.type === 'SWITCH_CATEGORIA_EDIT_MODAL') {
    const modalState = !action.payload;
    return {
      ...state,
      categoriaEditModal: modalState,
    };
  }
  // Libro Component
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
  // Persona Component
  if (action.type === 'PERSONA_ADD_ITEM') {
    const nuevaPersona = [...state.personas, action.payload];
    return {
      ...state,
      personas: nuevaPersona,
    };
  }
  if (action.type === 'PERSONA_EDIT_ITEM') {
    const nuevaPersona = [...state.personas, action.payload];
    return {
      ...state,
      personas: nuevaPersona,
    };
  }
  if (action.type === 'PERSONA_REMOVE_ITEM') {
    return {
      ...state,
      personas: state.personas.filter((unaPersona) => {
        return unaPersona.id !== Number(action.payload);
      }),
    };
  }
  if (action.type === 'SWITCH_PERSONA_EDIT_MODAL') {
    const modalState = !action.payload;
    return {
      ...state,
      personaEditModal: modalState,
    };
  }

  throw new Error('no matching action type');
};
