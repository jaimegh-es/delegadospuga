import type { APIRoute } from "astro";
import { db } from "../../lib/firebase/server";
import { Timestamp } from "firebase-admin/firestore";

export const POST: APIRoute = async ({ locals }) => {
  if (!locals.uid || locals.role !== 'admin') {
    return new Response("Unauthorized", { status: 403 });
  }

  try {
    await db.collection("app_meta").doc("exams").set({
      lastUpdated: Timestamp.now()
    }, { merge: true });

    return new Response(JSON.stringify({ success: true, message: "Calendar metadata updated" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error updating metadata" }), { status: 500 });
  }
};
