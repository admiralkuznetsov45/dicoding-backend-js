const { nanoid } = require('nanoid');
const bookshelfs = require('./bookshelf');
const Joi = require('joi');



const addBookshelfHandler = (request,h) => {
    const {name , year , author , summary , publisher , pageCount , readPage , reading} = request.payload ; 

    if (!name){
      const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
      });
      response.code(400);
      
      return response;
    }

    if (readPage > pageCount ){
      const response = h.response({
        status: 'fail',
        message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      });
      response.code(400);
      
      return response;
    }

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    
    const updatedAt = insertedAt ; 
    const finished = readPage === pageCount

    const newBookshelf = {
      name , year , author , summary , publisher , pageCount , readPage, reading , id ,finished , insertedAt , updatedAt , 
    };

    bookshelfs.push(newBookshelf);

    const isSuccess = bookshelfs.filter((bookshelf) => bookshelf.id === id).length > 0 

    if (isSuccess) {
        const response = h.response({
          status: 'success',
          message: 'Buku berhasil ditambahkan',
          data: {
            bookId: id,
          },
        });
        response.code(201);
        return response;
      }


  const response = h.response({
        status: 'fail',
        message: 'Buku gagal ditambahkan',
      });
      response.code(500);
      
      return response;
    
}

const getAllBookshelfHandler = (request, h) => {

  //mengambil query
  const { name, reading, finished } = request.query;


  //apabila nggak ada query 
  if (!name && !reading && !finished) {

    //response dari query
    const response = h.response({
      status: 'success' ,
      data: {

        //memanggil array baru dengan map untuk menampilkan daftar seluruh data 
        books: bookshelfs.map((bookshelf) => ({
          id: bookshelf.id ,
          name : bookshelf.name , 
          publisher : bookshelf.publisher
        }))
      }
    }).code(200)

    return response
  }

  //Apabila memiliki nama tertentu 
  if(name) {

    //fungsi untuk melakukan pencarian nama menggunakan Regular Expression 
    const filterBookName = bookshelfs.filter((bookshelf) => {
      const nameRegex = new RegExp(name , 'gi')
      return nameRegex.test(bookshelf.name)
    })


    const response = h
    .response({
      status: 'success',
      data: {
        //response nama sesuai yang dicari
        books: filterBookName.map((bookshelf) => ({
          id: bookshelf.id,
          name: bookshelf.name, 
          publisher: bookshelf.publisher,
        })),
      },
    })
    .code(200);

  return response
  }
  
  if(reading){

    const filteredBookReading = bookshelfs.filter(
      (bookshelf) => Number(bookshelf.reading) === Number(reading)
    )

    const response = h.response({
      status: 'success',
      data: {
        books: filteredBookReading.map((bookshelf) => ({
          id: bookshelf.id,
          name: bookshelf.name,
          publisher: bookshelf.publisher,
        })),
      },
    }).code(200)

    return response
  }
}



const getBookshelfByIdHandler = (request, h) => {
  const {id} = request.params;

  const book = bookshelfs.filter((n) => n.id === id)[0]

  if (book !== undefined ) {
    return {
      status : 'success' , 
      data : {
        book,
      }
    }
  }

  const response = h.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  })

  response.code(404)
  return response
}


//Edit Bagian Bookshelf
const editBookshelfByIdHandler = (request,h) => {

  //request parameter
  const {id} = request.params 

  //mengambil payload 
  const {name , year , author , summary , publisher , pageCount , readPage , reading} = request.payload

  if (!name) {
    //Tiada Nama dalam request body
    const response = h
      .response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      })
      .code(400);
    return response;
  }

  if (readPage > pageCount) {
    // Client tidak melampirkan properti name pada request body
    const response = h
      .response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      })
      .code(400);
    return response;
  } 

  const finished = readPage === pageCount
  const updatedAt = new Date().toISOString();

  //mengambil index bookshelf 
  const index = bookshelfs.findIndex((bookshelf) => bookshelf.id ===id)

  //setelah index didapat maka bookshelf pun bisa di edit 
  if (index !== -1) {
    bookshelfs[index] = {
    
      //... spread operator digunakan untuk mempertahankan nilai bookshelf[index] yg tidak perlu diubah
      ...bookshelfs[index],
      name , 
      year , 
      author , 
      summary , 
      publisher ,
      pageCount , 
      readPage , 
      reading,
      finished,
      updatedAt
    }
  

    const response = h.response({
    status: 'success',
    message: 'Buku berhasil diperbarui',
  });
    response.code(200);
    return response;
}
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
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
      message: 'Buku berhasil dihapus'
    })
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
}

module.exports = { addBookshelfHandler ,getAllBookshelfHandler , getBookshelfByIdHandler , editBookshelfByIdHandler , deleteBookshelfIdHandler };
