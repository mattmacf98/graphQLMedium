import {ApolloServer, gql} from "apollo-server";
import {StudentDAO} from "./studentDAO.js";
import {ClassDAO} from "./classDAO.js"

const typeDefs = gql`
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

const dataSources = () => ({
    studentDAO: new StudentDAO(),
    classDAO: new ClassDAO()
})

const resolvers = {
    Query: {
        students: (parent, args, context, info) => {
            return context.dataSources.studentDAO.getStudents(args);
        },
        studentById: (parent, args, context, info) => {
            return context.dataSources.studentDAO.getStudentById(args.id)
        },
        studentsInClass: (parent, args, context, info) => {
            const students = context.dataSources.studentDAO.getStudents();
            const clazz = context.dataSources.classDAO.getClassById(args.id);
            return students.filter(student => clazz.studentIds.includes(student.id))
        },
        classes: (parent, args, context, info) => {
            return context.dataSources.classDAO.getClasses(args)
        },
        classById: (parent, args, context, info) => {
            return context.dataSources.classDAO.getClassById(args.id)
        }
    },
    Student: {
        classes: (student, args, context, info) => {
            return context.dataSources.classDAO.getClasses().filter(clazz => clazz.studentIds.includes(student.id))
        }
    }
}

const gqlServer = new ApolloServer({typeDefs, resolvers, dataSources});

gqlServer.listen({port: process.env.port || 4000})
    .then(({url}) => console.log(`graphql server started on http://localhost:4000`))
