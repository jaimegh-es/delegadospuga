import type { APIRoute } from "astro";
import { db } from "../../lib/firebase/server";
import { Timestamp } from "firebase-admin/firestore";

export const GET: APIRoute = async () => {
  try {
    const snapshot = await db.collection("news").orderBy("date", "desc").get();
    const news = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return new Response(JSON.stringify(news), { 
        status: 200,
        headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error fetching news" }), { status: 500 });
  }
};

export const POST: APIRoute = async ({ request, locals }) => {
  if (!locals.uid || locals.role !== 'admin') {
    return new Response("Unauthorized", { status: 403 });
  }

  try {
    const data = await request.json();
    const { title, description, image, content, date } = data;

    if (!title || !date) {
        return new Response("Title and Date are required", { status: 400 });
    }

    const docRef = await db.collection("news").add({
      title,
      description: description || "",
      image: image || "favicon.svg",
      content: content || "",
      date,
      createdAt: Timestamp.now(),
      createdBy: locals.uid
    });

    return new Response(JSON.stringify({ success: true, id: docRef.id }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error creating news" }), { status: 500 });
  }
};

export const PATCH: APIRoute = async ({ request, locals }) => {
  if (!locals.uid || locals.role !== 'admin') {
    return new Response("Unauthorized", { status: 403 });
  }

  try {
    const data = await request.json();
    const { id, title, description, image, content, date } = data;

    if (!id || !title || !date) {
        return new Response("ID, Title and Date are required", { status: 400 });
    }

    await db.collection("news").doc(id).update({
      title,
      description: description || "",
      image: image || "favicon.svg",
      content: content || "",
      date,
      updatedAt: Timestamp.now(),
      updatedBy: locals.uid
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error updating news" }), { status: 500 });
  }
};

export const DELETE: APIRoute = async ({ request, locals }) => {
  if (!locals.uid || locals.role !== 'admin') {
    return new Response("Unauthorized", { status: 403 });
  }

  try {
    const { id } = await request.json();
    if (!id) return new Response("ID required", { status: 400 });

    await db.collection("news").doc(id).delete();
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error deleting news" }), { status: 500 });
  }
};
