const { addBookshelfHandler , getAllBookshelfHandler , getBookshelfByIdHandler , editBookshelfByIdHandler ,deleteBookshelfIdHandler } = require('./handler');
const { nanoid } = require('nanoid');
const Joi = require('joi');



//daftar routes
const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBookshelfHandler,
    }, 
    {
        method: 'GET',
        path: '/books',
        handler: getAllBookshelfHandler,
    }, 
    {
        method: 'GET',
        path: '/books/{id}',
        handler: getBookshelfByIdHandler,
      },
    {
        method:'PUT',
        path:'/books/{id}',
        handler: editBookshelfByIdHandler,
    },
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: deleteBookshelfIdHandler,
      }
]

module.exports = routes; 