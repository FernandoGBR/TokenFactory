//const routes = (module.exports = require('next-routes')());
const routes = require('next-routes')();

routes
    .add('/createToken' , 'createToken')


    
module.exports = routes;