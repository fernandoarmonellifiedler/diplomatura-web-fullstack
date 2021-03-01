export const reducer = (state, action) => {
  if (action.type === 'FETCH_LIST') {
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

  if (action.type === 'FETCH_ONE') {
    const libroId = Number(action.payload);
    return {
      ...state,
      librosEnCategoria: state.libros.filter((unLibro) => {
        //console.log(unLibro.libro_id, unLibro.libro_id === libroId);
        return unLibro.id === libroId;
      }),
    };
  }

  if (action.type === 'ADD_ITEM') {
    const nuevoLibros = [...state.libros, action.payload];
    return {
      ...state,
      libros: nuevoLibros,
    };
  }

  if (action.type === 'EDIT_ITEM') {
    const nuevoLibros = [...state.libros, action.payload];
    return {
      ...state,
      libros: nuevoLibros,
    };
  }

  if (action.type === 'PRESTAR_ITEM') {
    const nuevoLibros = [...state.libros, action.payload];
    return {
      ...state,
      libros: nuevoLibros,
    };
  }

  if (action.type === 'DEVOLVER_ITEM') {
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

  if (action.type === 'SWITCH_EDIT_MODAL') {
    const modalState = !action.payload;
    return {
      ...state,
      libroEditModal: modalState,
    };
  }

  if (action.type === 'SWITCH_PRESTAR_MODAL') {
    const modalState = !action.payload;
    return {
      ...state,
      libroPrestarModal: modalState,
    };
  }

  throw new Error('no matching action type');
};
