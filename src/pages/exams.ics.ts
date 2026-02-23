import type { APIRoute } from "astro";
import { db } from "../../lib/firebase/server";

export const GET: APIRoute = async ({ request }) => {
  try {
    // 1. Obtener metadatos de última actualización
    const metaDoc = await db.collection("app_meta").doc("exams").get();
    const lastUpdated = (metaDoc.exists && metaDoc.data()?.lastUpdated) 
      ? metaDoc.data().lastUpdated.toDate() 
      : new Date();
    
    // 2. Formatear fecha para ICS (UTC)
    const formatICSDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    };

    const stamp = formatICSDate(lastUpdated);

    // 3. Obtener exámenes
    const snapshot = await db.collection("calendar_events").where("type", "==", "exam").get();
    
    // 4. Construir contenido ICS siguiendo RFC 5545
    let icsLines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//1B_Bach//Examenes//ES",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "X-WR-CALNAME:Exámenes 1B Bach",
      "X-WR-TIMEZONE:Europe/Madrid",
      "X-WR-CALDESC:Calendario de exámenes de 1º Bachillerato B",
      "REFRESH-INTERVAL;VALUE=DURATION:PT1H",
      "X-PUBLISHED-TTL:PT1H"
    ];

    snapshot.docs.forEach(doc => {
      const data = doc.data();
      const id = doc.id;
      
      // Fecha en formato YYYYMMDD (para eventos de todo el día) o YYYYMMDDTHHMMSS
      const dateParts = data.date.split("-"); // [YYYY, MM, DD]
      const timeParts = (data.time || "08:30").split(":"); // [HH, MM]
      
      const startStr = `${dateParts[0]}${dateParts[1]}${dateParts[2]}T${timeParts[0].padStart(2, '0')}${timeParts[1].padStart(2, '0')}00`;
      
      // Calcular fin (suponemos 1 hora de duración)
      const startDate = new Date(`${data.date}T${data.time || "08:30"}:00`);
      const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);
      const endStr = `${endDate.getFullYear()}${(endDate.getMonth() + 1).toString().padStart(2, '0')}${endDate.getDate().toString().padStart(2, '0')}T${endDate.getHours().toString().padStart(2, '0')}${endDate.getMinutes().toString().padStart(2, '0')}00`;

      const summary = (data.title || data.subject || "Examen").replace(/[,;]/g, "\\$0");
      const description = [
        data.subject ? `Asignatura: ${data.subject}` : "",
        data.details ? `Detalles: ${data.details.replace(/<[^>]*>?/gm, '').replace(/\n/g, '\\n')}` : "", 
        `Aula: ${data.classroom || "B1B"}`
      ].filter(Boolean).join("\\n").replace(/[,;]/g, "\\$0");

      icsLines.push("BEGIN:VEVENT");
      icsLines.push(`UID:${id}@1bach.vercel.app`);
      icsLines.push(`DTSTAMP:${stamp}`);
      icsLines.push(`DTSTART:${startStr}`); // Floating time (compatible con cualquier zona horaria local)
      icsLines.push(`DTEND:${endStr}`);
      icsLines.push(`SUMMARY:${summary}`);
      icsLines.push(`DESCRIPTION:${description}`);
      icsLines.push(`LOCATION:${(data.classroom || "B1B").replace(/[,;]/g, "\\$0")}`);
      icsLines.push(`LAST-MODIFIED:${stamp}`);
      icsLines.push("END:VEVENT");
    });

    icsLines.push("END:VCALENDAR");

    // Unir con CRLF (\r\n) como exige el estándar
    const icsContent = icsLines.join("\r\n");

    return new Response(icsContent, {
      status: 200,
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Content-Disposition": 'attachment; filename="examenes.ics"',
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=3600",
        "Access-Control-Allow-Origin": "*",
        "Last-Modified": lastUpdated.toUTCString(),
      }
    });
  } catch (error) {
    console.error("Error generating ICS:", error);
    return new Response("Error", { status: 500 });
  }
};
