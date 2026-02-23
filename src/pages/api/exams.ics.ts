import type { APIRoute } from "astro";
import { db } from "../../lib/firebase/server";

export const GET: APIRoute = async ({ request }) => {
  try {
    // 1. Obtener metadatos de última actualización con fallback robusto
    const metaDoc = await db.collection("app_meta").doc("exams").get();
    const lastUpdated = (metaDoc.exists && metaDoc.data()?.lastUpdated) 
      ? metaDoc.data().lastUpdated.toDate() 
      : new Date();
    
    // 2. Cache-Control para Vercel Edge Network
    // s-maxage=3600 (1 hora en los servidores de Vercel)
    // stale-while-revalidate=86400 (permite servir versión vieja mientras se regenera en segundo plano)
    const headers = new Headers({
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'inline; filename="examenes.ics"',
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      "Last-Modified": lastUpdated.toUTCString(),
    });

    // 3. Manejo de 304 Not Modified
    const ifModifiedSince = request.headers.get("if-modified-since");
    if (ifModifiedSince && new Date(ifModifiedSince).getTime() >= Math.floor(lastUpdated.getTime() / 1000) * 1000) {
        return new Response(null, { status: 304, headers });
    }

    // 4. Obtener exámenes
    const snapshot = await db.collection("calendar_events").where("type", "==", "exam").get();
    
    let icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//1bach//Examenes//ES",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "X-WR-CALNAME:Exámenes 1B",
      "X-WR-TIMEZONE:Europe/Madrid",
      "X-WR-CALDESC:Calendario de exámenes de 1º Bachillerato B",
      "X-PUBLISHED-TTL:PT1H",
      "REFRESH-INTERVAL;VALUE=DURATION:PT1H"
    ];

    snapshot.docs.forEach(doc => {
      const data = doc.data();
      const id = doc.id;
      const dateStr = data.date;
      const timeStr = data.time || "08:30";
      
      const [year, month, day] = dateStr.split("-");
      let [hours, minutes] = timeStr.split(":");
      hours = hours.padStart(2, '0');
      minutes = (minutes || '00').padStart(2, '0');
      
      const startDateTime = `${year}${month}${day}T${hours}${minutes}00`;
      
      const startDate = new Date(`${dateStr}T${hours}:${minutes}:00`);
      const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);
      const endYear = endDate.getFullYear().toString();
      const endMonth = (endDate.getMonth() + 1).toString().padStart(2, '0');
      const endDay = endDate.getDate().toString().padStart(2, '0');
      const endHours = endDate.getHours().toString().padStart(2, '0');
      const endMinutes = endDate.getMinutes().toString().padStart(2, '0');
      const endDateTime = `${endYear}${endMonth}${endDay}T${endHours}${endMinutes}00`;

      const summary = data.title || data.subject || "Examen";
      let description = [
        data.subject ? `Asignatura: ${data.subject}` : "",
        data.details ? `Detalles: ${data.details.replace(/<[^>]*>?/gm, '').replace(/\n/g, '\\n')}` : "", 
        `Aula: ${data.classroom || "B1B"}`
      ].filter(Boolean).join("\\n");

      icsContent.push("BEGIN:VEVENT");
      icsContent.push(`UID:${id}@1bach.vercel.app`);
      icsContent.push(`DTSTAMP:${lastUpdated.toISOString().replace(/[-:]/g, "").split(".")[0]}Z`);
      icsContent.push(`DTSTART;TZID=Europe/Madrid:${startDateTime}`);
      icsContent.push(`DTEND;TZID=Europe/Madrid:${endDateTime}`);
      icsContent.push(`SUMMARY:${summary}`);
      icsContent.push(`DESCRIPTION:${description}`);
      icsContent.push(`LOCATION:${data.classroom || "B1B"}`);
      icsContent.push("LAST-MODIFIED:" + lastUpdated.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z");
      icsContent.push("END:VEVENT");
    });

    icsContent.push("END:VCALENDAR");

    return new Response(icsContent.join("\r\n"), {
      status: 200,
      headers
    });
  } catch (error) {
    console.error("Error generating ICS:", error);
    return new Response("Error generating calendar", { status: 500 });
  }
};
