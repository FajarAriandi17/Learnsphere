"use server";

import { getInsforgeServer } from "@/lib/insforge-server";
import { revalidatePath } from "next/cache";

export async function createStudent(data: any) {
  const insforge = await getInsforgeServer();
  const { error } = await insforge.database.from("students").insert(data);
  if (error) throw error;
  revalidatePath("/students");
}

export async function updateStudent(id: string, data: any) {
  const insforge = await getInsforgeServer();
  const { error } = await insforge.database
    .from("students")
    .update(data)
    .eq("id", id);
  if (error) throw error;
  revalidatePath("/students");
}

export async function deleteStudent(id: string) {
  const insforge = await getInsforgeServer();
  const { error } = await insforge.database
    .from("students")
    .delete()
    .eq("id", id);
  if (error) throw error;
  revalidatePath("/students");
}
