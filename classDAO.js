import classes from "./data/classes.json" assert { type:"json"};
import {DataSource} from "apollo-datasource"
import _ from "lodash"

export class ClassDAO extends DataSource {
    getClasses = (args) => {
        console.log("CALLING ClassDAO.getClasses")
        return _.filter(classes, args)
    }

    getClassById = (id) => {
        console.log("CALLING ClassDAO.getClassById")
        return classes.filter(clazz => clazz.id == id)[0]
    }
}
