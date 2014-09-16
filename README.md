sgs-routehandler
================

Express middleware to handle an api route by following the paths et taking action at the last route part regarding the CRUD spec.

Mongoose must be loaded in global scope beforehand.

The next routes are supported (not exhaustive):
- GET /api/<collection>
- POST /api/<collection>
- GET /api/<collection>/:id
- GET /api/<collection>/<attribute>
- PUT /api/<collection>/:id
- DELETE /api/<collection>/:id
- GET /api/<collection>/:id/<attribute>
- POST /api/<collection>/:id/<function>
- POST /api/<collection>/:id/<documentarray>
- GET /api/<collection>/:id/<documentarray>/:embeddedId
- PUT /api/<collection>/:id/<documentarray>/:embeddedId
- DELETE /api/<collection>/:id/<documentarray>/:embeddedId