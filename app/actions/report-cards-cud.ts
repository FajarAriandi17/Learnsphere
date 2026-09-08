"use server";
import { getInsforgeServer } from "@/lib/insforge-server";
import { revalidatePath } from "next/cache";
export async function createReportCard(data:any){const s=await getInsforgeServer();const{error}=await s.database.from("report_cards").insert(data);if(error)throw error;revalidatePath("/report-cards");}
export async function updateReportCard(id:string,data:any){const s=await getInsforgeServer();const{error}=await s.database.from("report_cards").update(data).eq("id",id);if(error)throw error;revalidatePath("/report-cards");}
export async function deleteReportCard(id:string){const s=await getInsforgeServer();const{error}=await s.database.from("report_cards").delete().eq("id",id);if(error)throw error;revalidatePath("/report-cards");}
