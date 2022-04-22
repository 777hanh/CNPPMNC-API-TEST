const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    studentId: { type: String, require: true},
    name: { type: String, require: true},
    address: { type: String, default: ''},
    dateOfBirth: { type: String, default:''},
    facultyId: { type: String, ref:'faculties', default:''}
},{
    timestamps: true
});

module.exports = mongoose.model('students', StudentSchema);