import { useState } from 'react';

const LibroHooks = () => {
  // uso del hooks
  const [persona, setPersona] = useState('Lila');
  const persona = 'Pablo';

  const cambiarNombre = () => {
    setPersona('Samantha');
  };

  return (
    <div>
      <h1>{persona}</h1>
      <button onClick={cambiarNombre}>Cambiar Nombre</button>
    </div>
  );
};

export default LibroHooks;
