const versionAPI = require('../constaint');

//import route
const studentRoute = require('./student');

function route(app){

    //route for user
    app.use(versionAPI+'/student', studentRoute);

}

//export
module.exports = route;