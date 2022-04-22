const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

class StudentController {
    //api/v1/
    test(req, res) {
        res.json({ success: true, message: 'API working ...' });
    }


    async testR(req, res) {
        const db = getFirestore();
        const studentId = +req.params.studentId;
        const userRef = await db.collection('students').where('studentId', '==', studentId).get();
        // const userRef = await db.collection('users').doc(`5c81f2e0-bcb7-11ec-90f4-d38e32f5e14e`).get();
        if (userRef.empty) {
            return res.json({ success: false, message: 'student not found . . .' });
        }
        //get fields of document
        var studentData;
        userRef.forEach(doc => {
            studentData = doc.data();
        });
        res.json({ success: true, message: 'demo-Read Work!', data: studentData });
    }


    async testRA(req, res) {
        // res.json({ success: true, message: 'demo-Read-All Work!' })
        const db = getFirestore();

        const snapshot = await db.collection('students').get();
        // const snapshot = await db.collection('users').listDocuments();
        if (snapshot.empty) {
            res.json({ success: false, message: 'no matching documents' })
        }
        res.json({
            success: true, message: 'nice (>.<)', data: snapshot.docs.map(doc => doc.data())
        })
    }


    async testC(req, res) {
        const db = getFirestore();
        //change string to number
        var studentId = +req.body.studentId;
        //check studentId is exists
        const check = await db.collection('students').where('studentId', '==', studentId).get();
        //if student is exist
        if (!check.empty) {
            return res.json({ success: false, message: 'student already exists' })
        }
        else {
            const userRef = db.collection('students').doc(req.body.studentId.toString());
            await userRef.set(req.body)
                .then(() => { res.json({ success: true, message: 'Create successfully 0!', user: req.body }) })
                .catch(err => { res.json({ success: false, message: err.message }) });
        }
    }


    async testU(req, res) {
        const db = getFirestore();
        const studentId = +req.params.studentId;
        const userRef = await db.collection('students').where('studentId', '==', studentId).get();
        if(userRef.empty){
            return res.json({ success: false, message: 'student not found . . .'});
        }
        //get id of document selector
        var docId;
        userRef.forEach(doc => {
            docId = doc.id;
        });

        //update document
        req.body.studentId = studentId;
        await db.collection('students').doc(docId).update(req.body)
            .then(() => {
                var dataOfStudent;
                userRef.forEach(doc => {
                    dataOfStudent = doc.data();
                });
                res.json({
                    success: true, message: `update ${studentId} successfully`, data: dataOfStudent
                });
            })

    }


    async testD(req, res) {
        const db = getFirestore();
        const studentId = +req.params.studentId;
        const userRef = await db.collection('users').where('studentId', '==', studentId).get();
        if(userRef.empty){
            return res.json({ success: false, message: 'student not found . . .'});
        }
        //get id of document selector
        var docId;
        userRef.forEach(doc => {
            docId = doc.id;
        });
        // res.json({ success: true, message: 'demo-Read Work!', data: studentData });
        if (docId)
            await db.collection('users').doc(docId).delete()
                .then(() => {
                    res.json({ success: true, message: 'delete successfully (>.<)' })
                })
                .catch(err => { res.json({ success: false, message: err.message }) })
        else {
            res.json({ success: false, message: 'student not found . . .' });
        }
    }

}
module.exports = new StudentController; 