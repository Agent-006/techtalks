import {IndexType, Permission} from "node-appwrite"

import {db, questionCollection} from "../name"
import {databases} from './config'

export default async function createQuestionCollection() {
    // create collection
    await databases.createCollection(db, questionCollection, questionCollection, [
        Permission.read("any"),
        Permission.read("users"),
        Permission.create("users"),
        Permission.delete("users"),
        Permission.update("users"),
    ])
    console.log(`Collection ${questionCollection} created`)

    // creating attributes and indexes
    await Promise.all([
        databases.createStringAttribute(db, questionCollection, "title", 100, true),
        databases.createStringAttribute(db, questionCollection, "content", 10000, true),
        databases.createStringAttribute(db, questionCollection, "authorId", 100, true),
        databases.createStringAttribute(db, questionCollection, "tags", 100, true, undefined, true),
        databases.createStringAttribute(db, questionCollection, "attachmentId", 100, false),
    ])

    console.log(`Attributes created for ${questionCollection}`)

    // create indexes

    // may not work, incase create manually
    await Promise.all([
        databases.createIndex(db, questionCollection, "title", IndexType.Fulltext, ["title"], ["asc"]),
        databases.createIndex(db, questionCollection, "content", IndexType.Fulltext, ["content"], ["asc"]),
    ])

}