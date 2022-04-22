const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FacultySchema = new Schema({
    facultyId: { type: String, require: true},
    name: { type: String, require: true}
},{
    timestamps: true
});

module.exports = mongoose.model('faculties', FacultySchema);