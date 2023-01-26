const { addBookshelfHandler , getAllBookshelfHandler , getBookshelfByIdHandler , editBookshelfByIdHandler ,deleteBookshelfIdHandler } = require('./handler');
const { nanoid } = require('nanoid');
const Joi = require('joi');



//daftar routes
const routes = [
    {
        method: 'POST',
        path: '/bookshelf',
        handler: addBookshelfHandler,
        // options: {
        //     validate: {
        //         payload: Joi.object({
        //             name: Joi.string().min(1).max(140)
        //         })
        //     }
        // }
    }, 
    {
        method: 'GET',
        path: '/bookshelf',
        handler: getAllBookshelfHandler,
    }, 
    {
        method: 'GET',
        path: '/bookshelf/{id}',
        handler: getBookshelfByIdHandler,
      },
    {
        method:'PUT',
        path:'/bookshelf/{id}',
        handler: editBookshelfByIdHandler,
    },
    {
        method: 'DELETE',
        path: '/bookshelf/{id}',
        handler: deleteBookshelfIdHandler,
      }
]

module.exports = routes; 