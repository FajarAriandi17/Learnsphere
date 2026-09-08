"use server";
import { getInsforgeServer } from "@/lib/insforge-server";
import { revalidatePath } from "next/cache";
export async function createTeacher(data:any){const s=await getInsforgeServer();const{error}=await s.database.from("teachers").insert(data);if(error)throw error;revalidatePath("/settings");}
export async function updateTeacher(id:string,data:any){const s=await getInsforgeServer();const{error}=await s.database.from("teachers").update(data).eq("id",id);if(error)throw error;revalidatePath("/settings");}
export async function deleteTeacher(id:string){const s=await getInsforgeServer();const{error}=await s.database.from("teachers").delete().eq("id",id);if(error)throw error;revalidatePath("/settings");}
