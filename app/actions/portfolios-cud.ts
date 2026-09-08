"use server";
import { getInsforgeServer } from "@/lib/insforge-server";
import { revalidatePath } from "next/cache";
export async function createPortfolio(data:any){const s=await getInsforgeServer();const{error}=await s.database.from("portfolios").insert(data);if(error)throw error;revalidatePath("/portfolios");}
export async function updatePortfolio(id:string,data:any){const s=await getInsforgeServer();const{error}=await s.database.from("portfolios").update(data).eq("id",id);if(error)throw error;revalidatePath("/portfolios");}
export async function deletePortfolio(id:string){const s=await getInsforgeServer();const{error}=await s.database.from("portfolios").delete().eq("id",id);if(error)throw error;revalidatePath("/portfolios");}
