import {IndexType, Permission} from "node-appwrite"

import {voteCollection, db} from "../name"
import {databases} from './config'

export default async function createvoteCollection() {
    // create collection
    await databases.createCollection(db, voteCollection, voteCollection, [
        Permission.read("any"),
        Permission.read("users"),
        Permission.create("users"),
        Permission.delete("users"),
        Permission.update("users"),
    ])
    console.log(`Collection ${voteCollection} created`)

    // creating attributes
    await Promise.all([
        databases.createEnumAttribute(db, voteCollection, "type", ["question", "answer"], true),
        databases.createStringAttribute(db, voteCollection, "typeId", 100, true),
        databases.createEnumAttribute(db, voteCollection, "voteStatus", ["upvoted", "downvoted"], true),
        databases.createStringAttribute(db, voteCollection, "votedById", 100, true),
    ]);
    console.log(`Attributes created for ${voteCollection}`)
}