"use server";

import { insforge } from "@/lib/insforge";

export async function getStudents() {
  const { data, error } = await insforge.database
    .from("students")
    .select("*, classes(class_name)");
  
  if (error) {
    console.error("Error fetching students:", error);
    return [];
  }
  return data;
}

export async function getClasses() {
  const { data, error } = await insforge.database
    .from("classes")
    .select("*");
  
  if (error) {
    console.error("Error fetching classes:", error);
    return [];
  }
  return data;
}
