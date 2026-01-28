import type { APIRoute } from "astro";
import { auth } from "../../lib/firebase/server";

export const GET: APIRoute = async ({ request, locals }) => {
  if (!locals.uid) {
    return new Response("Unauthorized", { status: 401 });
  }

  const url = new URL(request.url);
  const uid = url.searchParams.get("uid");

  if (!uid) {
    return new Response("UID required", { status: 400 });
  }

  // Security check: Only allow users to see their own info or admins to see anyone's
  if (uid !== locals.uid && locals.role !== 'admin') {
    return new Response("Forbidden", { status: 403 });
  }

  try {
    const userRecord = await auth.getUser(uid);
    return new Response(JSON.stringify({ displayName: userRecord.displayName || "Usuario" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ displayName: "Desconocido" }), { status: 200 });
  }
};
