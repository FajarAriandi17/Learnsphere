"use server";

import { insforge } from "@/lib/insforge";

export async function getExams() {
  const { data, error } = await insforge.database
    .from("exams")
    .select("*, teachers(name), classes(class_name)");
  
  if (error) {
    console.error("Error fetching exams:", error);
    return [];
  }
  return data;
}

export async function getBankItems() {
  const { data, error } = await insforge.database
    .from("exam_questions")
    .select("*");
  
  if (error) {
    console.error("Error fetching bank items:", error);
    return [];
  }
  return data;
}
