"use server";
import { getInsforgeServer } from "@/lib/insforge-server";
import { revalidatePath } from "next/cache";
export async function createSchool(data:any){const s=await getInsforgeServer();const{error}=await s.database.from("schools").insert(data);if(error)throw error;revalidatePath("/settings");}
export async function updateSchool(id:string,data:any){const s=await getInsforgeServer();const{error}=await s.database.from("schools").update(data).eq("id",id);if(error)throw error;revalidatePath("/settings");}
export async function deleteSchool(id:string){const s=await getInsforgeServer();const{error}=await s.database.from("schools").delete().eq("id",id);if(error)throw error;revalidatePath("/settings");}
