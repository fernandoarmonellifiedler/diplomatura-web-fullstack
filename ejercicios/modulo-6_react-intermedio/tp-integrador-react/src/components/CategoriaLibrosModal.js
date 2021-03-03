// COMPONENTE MODAL PARA MOSTRAR LIBROS EN CATEGORIA
const CategoriaLibrosModal = (props) => {
  return (
    <>
      <section className='cat-modal'>
        <header>
          <h3 className='cat-modal-h3'>Libros en categoria:</h3>
          <button className='btn cat-modal-btn' onClick={props.handleVerMas}>
            X
          </button>
        </header>

        {/* iterando sobre la lista de libros de la BD */}
        {props.state.librosEnCategoria.map((unLibro) => {
          const {
            id,
            nombre_libro,
            descripcion,
            categoria_id,
            persona_id,
          } = unLibro;

          return (
            <div className='item cat-modal-item' key={id}>
              <div className='item-datos'>
                <p>Titulo: {nombre_libro || 'sin nombre'}</p>
                <p>Descripción: {descripcion || 'sin descripcion'}</p>
                <p>Categoría: {categoria_id || 'sin categoria'}</p>
                <p>Estatus: {persona_id || 'libro disponible'}</p>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default CategoriaLibrosModal;
