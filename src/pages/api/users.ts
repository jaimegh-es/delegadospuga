import type { APIRoute } from "astro";
import { db } from "../../lib/firebase/server";

export const GET: APIRoute = async ({ locals }) => {
  if (!locals.uid || locals.role !== 'admin') {
    return new Response("Unauthorized", { status: 403 });
  }

  try {
    const snapshot = await db.collection("users").get();
    const users = snapshot.docs.map(doc => ({
      uid: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate().toISOString(),
    }));
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new Response("Error fetching users", { status: 500 });
  }
};

export const POST: APIRoute = async ({ request, locals }) => {
    if (!locals.uid || locals.role !== 'admin') {
      return new Response("Unauthorized", { status: 403 });
    }
  
    try {
      const { uid, ban } = await request.json(); // ban is boolean
      if (!uid) return new Response("UID required", { status: 400 });
  
      await db.collection("users").doc(uid).update({
          banned: ban
      });
  
      return new Response("User updated", { status: 200 });
    } catch (error) {
      return new Response("Error updating user", { status: 500 });
    }
  };
