/* Consultas SQL básicas

DML (Data Manipulation Language)
Son las sentencias utilizadas para administrar los datos dentro de las tablas

Sentencia | Descripción
SELECT      Permite recuperar registros
INSERT      Permite agregar nuevos registros
UPDATE      Permite actualizar registros
DELETE      Permite borrar registros

----------------------------

Select - Recuperar registros

SELECT <listado de columnas separadas por coma o *>
    FROM <nombre de la tabla>
    WHERE <listado de condiciones>

Ejemplo:

id | Nombre                      | Turno
1    Professional Webmaster         Noche
2    Experto universitario en PHP  Tarde
3    Professional Webmaster         Tarde

SELECT id, nombre, turno
    FROM curso

SELECT *
    FROM curso
    WHERE id=3

SELECT count(*)
    FROM curso

SELECT nombre, turno
    FROM curso
    WHERE nombre like '%Professional%' AND id>1

----------------------------

Insert - Agregar un registro

INSERT INTO <nombre de la tabla>
    (<listado de columnas separadas por coma>)
    VALUES (<listado de valores separados por coma>)

Ejemplo:

INSERT INTO curso (nombre, turno) VALUES ('Webmaster 1', 'Noche')

----------------------------

UPDATE - Actualiza registros

UPDATE <nombre de la tabla>
    SET <nombre de campo>=<nuevo valor>, <nombre de campo>=<nuevo valor>, ...
    WHERE <listado de condiciones>

Ejemplo:

UPDATE curso
    SET nombre='Webmaster introductorio'
    WHERE nombre='Webmaster 1';

----------------------------

DELETE - Borra registros

DELETE FROM <nombre de la tabla>
    WHERE <listado de condiciones>

Ejemplo:

DELETE FROM curso
    WHERE nombre like '%Introductorio%'

*/