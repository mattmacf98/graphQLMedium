import students from "./data/students.json" assert { type:"json"};
import {DataSource} from "apollo-datasource"
import _ from "lodash"

export class StudentDAO extends DataSource {
    getStudents = (args) => {
        return _.filter(students, args)
    }

    getStudentById = (id) => {
        return students.filter(student => student.id == id)[0]
    }
}
