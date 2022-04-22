
const mongoose = require('mongoose');
async function connectM(){
    try {
        await mongoose.connect(`mongodb+srv://prevlife:1234@cluster0.49nfa.mongodb.net/student_management?retryWrites=true&w=majority`,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to Mongoose successfully . . .');
    } catch (error) {
        console.log('Error connecting to Mongoose . . . ');
        process.exit(1);
    }
}

module.exports = {connectM};