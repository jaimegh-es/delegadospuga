import type { APIRoute } from "astro";
import { db } from "../../lib/firebase/server";
import { Timestamp } from "firebase-admin/firestore";

export const GET: APIRoute = async () => {
  try {
    const snapshot = await db.collection("absences").orderBy("date", "asc").get();
    const absences = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      // Convert timestamps to ISO strings for JSON serialization
      date: doc.data().date instanceof Timestamp ? doc.data().date.toDate().toISOString() : doc.data().date,
    }));
    return new Response(JSON.stringify(absences), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response("Error fetching absences", { status: 500 });
  }
};

export const POST: APIRoute = async ({ request, locals }) => {
  // Check auth (redundant if middleware works, but good practice)
  if (!locals.uid) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const data = await request.json();
    const { teacher, subject, date } = data;

    // Validación de tipos y contenido
    if (typeof teacher !== 'string' || typeof subject !== 'string' || !date) {
      return new Response("Invalid data types", { status: 400 });
    }

    const cleanTeacher = teacher.trim();
    const cleanSubject = subject.trim();

    if (cleanTeacher.length === 0 || cleanTeacher.length > 100 || 
        cleanSubject.length === 0 || cleanSubject.length > 100) {
      return new Response("Fields must be between 1 and 100 characters", { status: 400 });
    }

    const absenceDate = new Date(date);
    if (isNaN(absenceDate.getTime())) {
      return new Response("Invalid date", { status: 400 });
    }

    await db.collection("absences").add({
      teacher: cleanTeacher,
      subject: cleanSubject,
      date: Timestamp.fromDate(absenceDate),
      createdBy: locals.uid,
      createdAt: Timestamp.now(),
    });

    return new Response("Absence recorded", { status: 201 });
  } catch (error) {
    return new Response("Error saving absence", { status: 500 });
  }
};

export const DELETE: APIRoute = async ({ request, locals }) => {
  if (!locals.uid || locals.role !== 'admin') {
    return new Response("Unauthorized", { status: 403 });
  }

  try {
    const { id } = await request.json();
    if (!id) return new Response("ID required", { status: 400 });

    await db.collection("absences").doc(id).delete();
    return new Response("Deleted", { status: 200 });
  } catch (error) {
    return new Response("Error deleting", { status: 500 });
  }
};
