"use server";
import { getInsforgeServer } from "@/lib/insforge-server";
import { revalidatePath } from "next/cache";
export async function createExamQuestion(data:any){const s=await getInsforgeServer();const{error}=await s.database.from("exam_questions").insert(data);if(error)throw error;revalidatePath("/exams");}
export async function updateExamQuestion(id:string,data:any){const s=await getInsforgeServer();const{error}=await s.database.from("exam_questions").update(data).eq("id",id);if(error)throw error;revalidatePath("/exams");}
export async function deleteExamQuestion(id:string){const s=await getInsforgeServer();const{error}=await s.database.from("exam_questions").delete().eq("id",id);if(error)throw error;revalidatePath("/exams");}
