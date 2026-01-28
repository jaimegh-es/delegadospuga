import type { APIRoute } from "astro";
import { auth, db } from "../../../lib/firebase/server";
import { ADMIN_EMAIL } from "../../../lib/constants";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const { idToken } = await request.json();

  if (!idToken) {
    return new Response("No token provided", { status: 401 });
  }

  try {
    // Verify the token first to get the UID and Email securely
    const decodedToken = await auth.verifyIdToken(idToken);
    const { uid, email } = decodedToken;

    if (!email) {
      return new Response("Email required", { status: 400 });
    }

    // Check if user exists in Firestore
    const userRef = db.collection("users").doc(uid);
    const userDoc = await userRef.get();

    let role = "user";
    if (email === ADMIN_EMAIL) {
        role = "admin";
    }

    if (userDoc.exists) {
        const userData = userDoc.data();
        if (userData?.banned) {
            return new Response("User is banned", { status: 403 });
        }
        // Update role if it changed (e.g. became admin)
        if (userData?.role !== role) {
            await userRef.update({ role });
        }
    } else {
        // Create new user
        await userRef.set({
            email,
            role,
            banned: false,
            createdAt: new Date(),
        });
    }

    // 5 days expiration
    const expiresIn = 60 * 60 * 24 * 5 * 1000; 
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });

    cookies.set("session", sessionCookie, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: expiresIn / 1000,
    });

    return new Response("Success", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Unauthorized", { status: 401 });
  }
};
