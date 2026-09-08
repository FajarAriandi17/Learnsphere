"use server";
import { getInsforgeServer } from "@/lib/insforge-server";
import { revalidatePath } from "next/cache";
export async function createExam(data:any){const s=await getInsforgeServer();const{error}=await s.database.from("exams").insert(data);if(error)throw error;revalidatePath("/exams");}
export async function updateExam(id:string,data:any){const s=await getInsforgeServer();const{error}=await s.database.from("exams").update(data).eq("id",id);if(error)throw error;revalidatePath("/exams");}
export async function deleteExam(id:string){const s=await getInsforgeServer();const{error}=await s.database.from("exams").delete().eq("id",id);if(error)throw error;revalidatePath("/exams");}
