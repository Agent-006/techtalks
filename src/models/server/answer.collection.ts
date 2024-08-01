import {IndexType, Permission} from "node-appwrite"

import {answerCollection, db} from "../name"
import {databases} from './config'

export default async function createAnswerCollection() {
    // create collection
    await databases.createCollection(db, answerCollection, answerCollection, [
        Permission.read("any"),
        Permission.read("users"),
        Permission.create("users"),
        Permission.delete("users"),
        Permission.update("users"),
    ])
    console.log(`Collection ${answerCollection} created`)

    // creating attributes
    await Promise.all([
        databases.createStringAttribute(db, answerCollection, "content", 10000, true),
        databases.createStringAttribute(db, answerCollection, "authorId", 100, true),
        databases.createStringAttribute(db, answerCollection, "questionId", 100, true),
    ]);
    console.log(`Attributes created for ${answerCollection}`)
}