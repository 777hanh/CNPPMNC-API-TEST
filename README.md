uri: api/v1/student/...

    get all students
        .../testra

    get student by studentId
        .../testr/:studentId

    create new student
        .../testc

    update student
        .../testu

    delete student by studentId
        .../testd/:studentId

    form body of request:
    {
        studentId: "number",
        falcutyId: "falcuty-Id {string}",
        studentName: "string",
        dateOfBirth: "date{dd/mm/YYYY}",
        address: "string"
    }
