"use server";
import { getInsforgeServer } from "@/lib/insforge-server";
import { revalidatePath } from "next/cache";
export async function createAttendance(data:any){const s=await getInsforgeServer();const{error}=await s.database.from("attendance").insert(data);if(error)throw error;revalidatePath("/attendance");}
export async function updateAttendance(id:string,data:any){const s=await getInsforgeServer();const{error}=await s.database.from("attendance").update(data).eq("id",id);if(error)throw error;revalidatePath("/attendance");}
export async function deleteAttendance(id:string){const s=await getInsforgeServer();const{error}=await s.database.from("attendance").delete().eq("id",id);if(error)throw error;revalidatePath("/attendance");}
