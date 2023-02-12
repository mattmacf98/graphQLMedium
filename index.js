import {ApolloServer} from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import {StudentDAO} from "./studentDAO.js";
import {ClassDAO} from "./classDAO.js"

const typeDefs = `#graphql
    type Query {
        students(id: ID, firstName: String, lastName: String, grade: Int): [Student]
        studentById(id: ID): Student
        studentsInClass(id: ID): [Student]
        classes(id: ID, name: String): [Class]
        classById(id: ID): Class
    }
    
    type Student {
        id: ID!
        firstName: String
        lastName: String
        grade: Int
        classes: [Class]
    }
    
    type Class {
        id: ID!
        name: String
        studentIds:[Int]
    }
`


const studentDAO = new StudentDAO();
const classDAO = new ClassDAO();

const resolvers = {
    Query: {
        students: (parent, args, context, info) => {
            return studentDAO.getStudents(args);
        },
        studentById: (parent, args, context, info) => {
            return studentDAO.getStudentById(args.id)
        },
        studentsInClass: (parent, args, context, info) => {
            const students = studentDAO.getStudents();
            const clazz = classDAO.getClassById(args.id);
            return students.filter(student => clazz.studentIds.includes(student.id))
        },
        classes: (parent, args, context, info) => {
            return classDAO.getClasses(args)
        },
        classById: (parent, args, context, info) => {
            return classDAO.getClassById(args.id)
        }
    },
    Student: {
        classes: (student, args, context, info) => {
            return classDAO.getClasses().filter(clazz => clazz.studentIds.includes(student.id))
        }
    }
}

const gqlServer = new ApolloServer({typeDefs, resolvers});

const { url } = await startStandaloneServer(gqlServer);
console.log(url)
