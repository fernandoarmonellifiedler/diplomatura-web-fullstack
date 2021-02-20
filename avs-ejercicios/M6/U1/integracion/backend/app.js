const express = require('express');

const app = express();

app.get('/mood', (req, res) => {

})



app.listen(3000, () => {
  console.log('servidor escuchando en el puerto 3000');
});
