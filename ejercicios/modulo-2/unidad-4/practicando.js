const carrito = ['manzana','banana'];

const index = carrito.findIndex(productos => productos === 'banana');

//carrito[index]; // 'banana'

if (carrito[index] === 'bananas') {
    console.log('Ya esta en el carro');
} else {
    console.log('Producto agregado!');
}

