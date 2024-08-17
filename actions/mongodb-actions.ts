"use server";
import mongoDBClient from "@/lib/mongodb";
import { ObjectId, WithId } from "mongodb";

const db = mongoDBClient.db(process.env.MONGODB_DBNAME);

export async function fetchFAQS() {
  try {
    const collectionName = process.env.MONGODB_COLLECTIONNAME as string;
    const documentId = process.env.MONGODB_DOCUMENTID as string;

    const faqs = await db.collection(collectionName).findOne({
      _id: ObjectId.createFromHexString(documentId),
    });

    console.log('FETCHED FAQS:: ', faqs);
    

    if (!faqs) {
      throw new Error("Error fetching data from db");
    }
    return faqs as WithId<Document>;
  } catch (error) {
    console.error(error);
    return null;
  }
}
