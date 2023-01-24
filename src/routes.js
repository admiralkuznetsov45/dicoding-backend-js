const { addBookshelfHandler } = require('./bookshelf');


const routes = [
    // {
    //     method: 'POST',
    //     path: '/bookshelf',
    //     handler: addBookshelfHandler,
    // }, 
    {
        method: 'GET',
        path: '/bookshelf',
        handler: (request,reply)=>{
            return 'hello world'
        } ,
    }, 
]

module.exports = routes; 