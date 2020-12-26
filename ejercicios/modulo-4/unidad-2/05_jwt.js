/* JWT

Es el método de autenticación más popular para las API REST:

[User] --- (1) --> [Authentication Server]
[User] <-- (2) --- [Authentication Server]
[User] --- (3) --> [Authentication Server]
[User] <-- (4) --- [Authentication Server]

1) User sign-in (using id/password, facebook, google, etc)
2) User authenticated, JWT created, and returned to user
3) User passes JWT when making API calls
4) Application verifies and processes API call

--------------------------------
JWT Token

bda87g287g2d78q2gydb287h8712hb21hkjhkjh129
   HEADER   |   PAYLOAD   |   SIGNATURE

Encoded:
bda87g287g2d7
8q2gydb287h871
2hb21hkjhkjh129

Decoded:

Header:
{
    "alg": "HS256",
    "typ": "JWT"
}
Payload:
{
    "sub": "1234567890",
    "name": "John Doe",
    "admin": true
}
Signature
HMACSHA256(
    base64UrkEncode(header) + "." + base64UrlEncode(payload), secret
)

--------------------------------
Para utilizar JWT en NodeJS con Express

Se requiere instalar la siguiente biblioteca:

npm install --save express jsonwebtoken

--------------------------------
Ejemplo
En el foro encontrará un enlace al video con el ejemplo de implementación de JWT en
NodeJS con Express

--------------------------------
Trabajo Práctico
Agregar autenticación por jwt al desarrollo realizado en la unidad anterior.
*/