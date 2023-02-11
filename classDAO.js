import classes from "./data/classes.json" assert { type:"json"};
import {DataSource} from "apollo-datasource"
import _ from "lodash"

export class ClassDAO extends DataSource {
    getClasses = (args) => {
        return _.filter(classes, args)
    }

    getClassById = (id) => {
        return classes.filter(clazz => clazz.id == id)[0]
    }
}
