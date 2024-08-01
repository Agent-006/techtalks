import {IndexType, Permission} from "node-appwrite"

import {db, questionAttachmentCollection} from "../name"
import {databases, storage} from './config'

export default async function getOrCreateStorage() {
    try {
        await storage.getBucket(questionAttachmentCollection);
        console.log("Storage Bucket Connected")
    } catch (error) {
        try {
            await storage.createBucket(questionAttachmentCollection, questionAttachmentCollection, [
                Permission.read("any"),
                Permission.read("users"),
                Permission.create("users"),
                Permission.delete("users"),
                Permission.update("users"),
            ],
            false, 
            undefined,
            undefined,
            ["jpg", "png", "gif", "jpeg", "webp", "heic"]
        );
            console.log("Storage Bucket Created")
            console.log("Storage Bucket Connected")
        }
        catch (error) {
            console.log("Error in Storage Bucket")
            console.error(error)
        }
    }
}