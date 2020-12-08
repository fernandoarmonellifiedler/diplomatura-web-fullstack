/* Operadores

Son palabras reservadas o un caracter utilizada en SQL que permite modificar el
resultado

Se pueden utilizar para modificar el select o el where

Operador | Descripción          | Ejemplo
+          Suma                   10 + 5 => 15
-          Resta                  10 - 5 => 5
*          Multiplicación         10 * 5 => 50
/          División               10 / 5 => 2
%          Resto de la división   10 % 2 => 0

----------------------------
Comparación

Operador | Descripción                                                        | Ejemplo
=          Verifica que los valores sean iguales                                5 = 3 => False
!= o <>    Verifica que los valores NO sean iguales                             5 != 3 => True
<          Verifica que el valor de la izq sea menor al de la derecha           5 < 3 => False
>          Verifica que el valor de la izq sea mayor al de la derecha           5 > 3 => True
<=         Verifica que el valor de la izq sea menor o igual al de la derecha   5 <= 3 => False
>=         Verifica que el valor de la izq sea mayor o igual al de la derecha   5 >= 3 => True

----------------------------
Lógicos

Operador | Descripción                                               | Ejemplo
AND        Verifica que se cumplan las 2 condiciones                   2<3 AND 3<5 => True
BETWEEN    Verifica que un valor esté entre otros dos                  3 BETWEEN 2 AND 5 => True
IN         Verifica que el valor esté dentro de una lista de valores   2 IN (1,2,3,4,5) => True
LIKE       Verifica que el valor esté contenido en otro (string)       'Jorge Luis Borges' LIKE '%Luis%' => True
NOT o !    Niega el resultado de la siguiente operación                3 NOT BETWEEN 2 AND 5 => False

----------------------------
Funciones agregadas

Función | Descripción                            | Ejemplo
MAX       Retorna el valor máximo de los valores   MAX (20,100,180) => 180
MIN       Retorna el valor mínimo de los valores   MIN (20,100,180) => 20
SUM       Retorna la suma de los valores           SUM (20,100,180) => 300
COUNT     Retorna la cantidad de valores           COUNT (20,100,180) => 3
AVG       Retorna el promedio entre los valores    MAVG (20,100,180) => 100
*/