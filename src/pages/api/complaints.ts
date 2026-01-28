import type { APIRoute } from "astro";
import { db } from "../../lib/firebase/server";
import { Timestamp } from "firebase-admin/firestore";

export const POST: APIRoute = async ({ request, locals }) => {
  if (!locals.uid) return new Response("Unauthorized", { status: 401 });

  try {
    const data = await request.json();
    const { type, teacher, description } = data; // type: 'disrespect' | 'general'

    if (!description) return new Response("Description required", { status: 400 });

    await db.collection("complaints").add({
      type,
      teacher: teacher || null,
      description,
      createdBy: locals.uid,
      authorName: locals.displayName,
      createdAt: Timestamp.now(),
      status: 'pendiente'
    });

    return new Response("Complaint registered", { status: 201 });
  } catch (error) {
    return new Response("Error saving complaint", { status: 500 });
  }
};

export const GET: APIRoute = async ({ locals }) => {
  if (!locals.uid || locals.role !== 'admin') {
      // Allow getting count for dashboard summary? Maybe a separate endpoint for count is safer/cleaner.
      // For now, this endpoint is full list for admins.
      return new Response("Unauthorized", { status: 403 });
  }

  try {
    const snapshot = await db.collection("complaints").orderBy("createdAt", "desc").get();
    const complaints = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate().toISOString()
    }));
    return new Response(JSON.stringify(complaints), { status: 200 });
  } catch (error) {
    return new Response("Error fetching complaints", { status: 500 });
  }
};

export const DELETE: APIRoute = async ({ request, locals }) => {
  if (!locals.uid || locals.role !== 'admin') {
    return new Response("Unauthorized", { status: 403 });
  }

  try {
    const { id } = await request.json();
    if (!id) return new Response("ID required", { status: 400 });

    await db.collection("complaints").doc(id).delete();
    return new Response("Deleted", { status: 200 });
  } catch (error) {
    return new Response("Error deleting complaint", { status: 500 });
  }
};
