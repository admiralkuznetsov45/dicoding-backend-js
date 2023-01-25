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

const getAllBookshelfHandler = () => ({
  status: 'success',
  data: {
    bookshelfs,
  },
})

const getBookshelfByIdHandler = (request, h) => {
  const {id} = request.params;

  const bookshelf = bookshelfs.filter((n) => n.id === id)[0]

  if (bookshelf !== undefined ) {
    return {
      status : 'success' , 
      data : {
        bookshelf,
      }
    }
  }

  const response = h.response({
    status: "fail",
    message: "Bookshelf tidak ditemukan",
  })

  response.code(404)
  return response
}


//Edit Bagian Bookshelf
const editBookshelfByIdHandler = (request,h) => {

  //request parameter
  const {id} = request.params 

  //mengambil payload 
  const {title , tags , body} = request.payload
  const updatedAt = new Date().toISOString();

  //mengambil index bookshelf 
  const index = bookshelfs.findIndex((bookshelf) => bookshelf.id ===id)

  //setelah index didapat maka bookshelf pun bisa di edit 
  if (index !== -1) {
    bookshelfs[index] = {
    
      //... spread operator digunakan untuk mempertahankan nilai bookshelf[index] yg tidak perlu diubah
      ...bookshelfs[index],
      title, 
      tags,
      body,
      updatedAt,
    }
  

    const response = h.response({
    status: 'success',
    message: 'Bookshelf berhasil diperbarui',
  });
    response.code(200);
    return response;
}
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui Bookshelf. Id tidak ditemukan',
  });
  response.code(404);
  return response;
  
}

const deleteBookshelfIdHandler = (request , h ) => {
  const {id} = request.params 

  const index = bookshelfs.findIndex((bookshelf) => bookshelf.id ===id)

  if(index !== -1){
    bookshelfs.splice(index,1)

    const response = h.response({
      status: 'success', 
      message: 'Bookshelf berhasil dihapus'
    })
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
}

module.exports = { addBookshelfHandler ,getAllBookshelfHandler , getBookshelfByIdHandler , editBookshelfByIdHandler , deleteBookshelfIdHandler };
