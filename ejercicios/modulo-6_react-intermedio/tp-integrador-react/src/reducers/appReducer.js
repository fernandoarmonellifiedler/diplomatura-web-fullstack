export const reducer = (state, action) => {
  if (action.type === 'FETCH_LIST') {
    const nuevoState = action.payload;
    console.log(nuevoState);
    return {
      ...state,
      nuevoState,
    };
  }
  throw new Error('no matching action type');
};
