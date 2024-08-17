"use server";
import mongoDBClient from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { FAQDocument } from ".";
const db = mongoDBClient.db(process.env.MONGODB_DBNAME);

export async function fetchFAQS(): Promise<FAQDocument[] | null> {
  try {
    const collectionName = process.env.MONGODB_COLLECTIONNAME as string;
    const documentId = process.env.MONGODB_DOCUMENTID as string;

    const faqs = await db.collection<FAQDocument[]>(collectionName).findOne({
      _id: ObjectId.createFromHexString(documentId),
    });

    console.log('FETCHED FAQS:: ', faqs);
    

    if (!faqs) {
      throw new Error("Error fetching data from db");
    }
    return faqs;

  } catch (error) {
    console.error(error);
    return null;
  }
}
