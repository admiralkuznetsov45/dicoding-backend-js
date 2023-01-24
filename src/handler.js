const { nanoid } = require('nanoid');
const bookshelfs = require('./bookshelf');

const addBookshelfHandler = (request,h) => {
    const {title , tags , body} = request.payload ; 

    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt ; 

    const newBookshelf = {
        title , tags , body , id , createdAt , updatedAt , 
    };

    bookshelfs.push(newBookshelf);

    const isSuccess = bookshelfs.filter((bookshelf) => bookshelf.id === id).length > 0 

    if (isSuccess) {
        const response = h.response({
          status: 'success',
          message: 'Catatan berhasil ditambahkan',
          data: {
            bookshelfId: id,
          },
        });
        response.code(201);
        return response;
      }


      const response = h.response({
        status: 'fail',
        message: 'Catatan gagal ditambahkan',
      });
      response.code(500);
      return response;
    
}