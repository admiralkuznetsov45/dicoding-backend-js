const http = require('http');
const Hapi = require('@hapi/hapi');
const routes = require('./routes');

//untuk memulai 
const init = async () => {

    //menjalankan server 
    const server = Hapi.server({
        port:8000,
        host: 'localhost',
    })

    //routing server 
    server.route(routes)
    routes: {
        cors: {
         origin: ['*']   
        }
    }

    //server berjalan
    await server.start()
    console.log(`Server berjalan pada ${server.info.uri}`)
}


init()