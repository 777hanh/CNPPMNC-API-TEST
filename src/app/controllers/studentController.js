// const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const Student = require('../models/student');

class StudentController {

    //api/v1/student/test
    test(req, res) {
        res.json({ success: true, message: 'API working ...' });
    }

    //api/v1/student/testR
    async testR(req, res) {
        await Student.findOne({ studentId: req.params.studentId })
            .then(student => {
                try {
                    return res.json({
                        success: true,
                        message: 'Retrieve all success . . . ',
                        data: student
                    })
                } catch (error) {
                    res.json({
                        success: false,
                        message: 'Retrieve ' + req.params.studentId + ' fail . . . ',
                    })
                }
            })
    }


    //api/v1/student/testRA
    async testRA(req, res) {
        await Student.find({})
            .then(student => {
                try {
                    return res.json({
                        success: true,
                        message: 'Retrieve all success . . . ',
                        data: student
                    })
                } catch (error) {
                    res.json({
                        success: false,
                        message: 'Retrieve fail . . . '
                    })
                }
            })
    }


    //api/v1/student/testC
    async testC(req, res) {
        if (!req.body || !req.body.studentId)
            return res.json({ success: false, message: 'missing student info . . .' });
        try {
            //check student is existing
            const isStudent = await Student.findOne({ studentId: req.body.studentId })
            if (isStudent)
                return res.json({ success: false, message: 'this student is already existing. . .' });
            const newStudent = Student(req.body);
            await newStudent.save();
            return res.json({
                success: true,
                message: 'create student success . . .',
                data: newStudent
            })
        } catch (error) {
            return res.json({
                success: false,
                message: 'create student fail . . .',
                error
            });
        }
    }


    //api/v1/student/testu/:studentId
    async testU(req, res) {
        if (!req.body || !req.body.studentId)
            return res.json({ success: false, message: 'missing student info . . .' });
        try {
            //check student is existing
            const isStudent = await Student.findOne({ studentId: req.params.studentId })
            await Student.findOne({ studentId: req.params.studentId })
                .then(() => {
                    req.body.studentId = req.params.studentId;
                    const updatedStudent = req.body;
                    Student.findOneAndUpdate({ studentId: req.params.studentId }, updatedStudent)
                        .then(() => res.json({
                            success: true,
                            message: 'updated student ' + req.params.studentId + ' success',
                            data: updatedStudent
                        }))
                        .catch(err => {
                            res.json({
                                success: false,
                                message: 'updated student ' + req.params.studentId + ' fail . . .',
                                data: err
                            })
                        })
                })
                .catch(err => {
                    return res.json({
                        success: false,
                        message: 'this student ' + req.params.studentId + 'not found. . .',
                        error: err
                    });
                })

        } catch (error) {
            return res.json({
                success: false,
                message: 'update student ' + req.params.studentId + ' fail . . .',
                error
            });
        }
    }


    //api/v1/student/testd
    async testD(req, res) {
        await Student.findOneAndDelete({ studentId: req.params.studentId })
            .then(student => {
                if (student)
                    return res.json({
                        success: true,
                        message: 'delete student ' + req.params.studentId + ' success'
                    })
                return res.json({ 
                    success: false, 
                    message: 'delete student ' + req.params.studentId + ' fail . . .' })
            })
            .catch(err => {
                return res.json({
                    success: false,
                    message: 'this student ' + req.params.studentId + 'not found. . .',
                    error: err
                });
            })
    }

}
module.exports = new StudentController; 