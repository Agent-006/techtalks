import {IndexType, Permission} from "node-appwrite"

import {commentCollection, db} from "../name"
import {databases} from './config'

export default async function createCommentCollection() {
    // create collection
    await databases.createCollection(db, commentCollection, commentCollection, [
        Permission.read("any"),
        Permission.read("users"),
        Permission.create("users"),
        Permission.delete("users"),
        Permission.update("users"),
    ])
    console.log(`Collection ${commentCollection} created`)

    // creating attributes
    await Promise.all([
        databases.createStringAttribute(db, commentCollection, "content", 10000, true),
        databases.createEnumAttribute(db, commentCollection, "type", ["answer", "question"], true),
        databases.createStringAttribute(db, commentCollection, "typeId", 100, true),
        databases.createStringAttribute(db, commentCollection, "authorId", 100, true),
    ]);
    console.log(`Attributes created for ${commentCollection}`)
}