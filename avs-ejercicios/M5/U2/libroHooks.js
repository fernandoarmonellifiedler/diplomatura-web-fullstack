import { useState } from 'react';

const LibroHooks = () => {

    // uso del hooks
    const [persona, setPersona] = useState('Lila');
    const persona = 'Pablo';

    const cambiarNombre = () => {
        setPersona('Samantha');
    }



    return (
        <h1>{persona}</h1>
    );


}

export default LibroHooks;