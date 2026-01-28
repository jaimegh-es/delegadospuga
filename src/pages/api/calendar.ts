import type { APIRoute } from "astro";
import { db } from "../../lib/firebase/server";
import { Timestamp } from "firebase-admin/firestore";

export const GET: APIRoute = async () => {
  try {
    const snapshot = await db.collection("calendar_events").get();
    const events = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return new Response(JSON.stringify(events), { 
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error fetching events" }), { status: 500 });
  }
};

export const POST: APIRoute = async ({ request, locals }) => {
  if (!locals.uid || locals.role !== 'admin') {
    return new Response("Unauthorized", { status: 403 });
  }

  try {
    const data = await request.json();
    const { type, date, subject, title, details, classroom, time } = data;

    if (!type || !date) {
        return new Response("Type and Date are required", { status: 400 });
    }

    await db.collection("calendar_events").add({
      type,
      date,
      subject: subject || null,
      title: title || null,
      details: details || "",
      classroom: classroom || "",
      time: time || "",
      createdAt: Timestamp.now(),
      createdBy: locals.uid
    });

    return new Response(JSON.stringify({ success: true }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error creating event" }), { status: 500 });
  }
};

export const PATCH: APIRoute = async ({ request, locals }) => {
  if (!locals.uid || locals.role !== 'admin') {
    return new Response("Unauthorized", { status: 403 });
  }

  try {
    const data = await request.json();
    const { id, type, date, subject, title, details, classroom, time } = data;

    if (!id || !type || !date) {
        return new Response("ID, Type and Date are required", { status: 400 });
    }

    await db.collection("calendar_events").doc(id).update({
      type,
      date,
      subject: subject || null,
      title: title || null,
      details: details || "",
      classroom: classroom || "",
      time: time || "",
      updatedAt: Timestamp.now(),
      updatedBy: locals.uid
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error updating event" }), { status: 500 });
  }
};

export const DELETE: APIRoute = async ({ request, locals }) => {
  if (!locals.uid || locals.role !== 'admin') {
    return new Response("Unauthorized", { status: 403 });
  }

  try {
    const { id } = await request.json();
    if (!id) return new Response("ID required", { status: 400 });

    await db.collection("calendar_events").doc(id).delete();
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error deleting event" }), { status: 500 });
  }
};
