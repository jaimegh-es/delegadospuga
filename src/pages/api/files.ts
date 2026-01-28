import type { APIRoute } from "astro";
import fs from 'node:fs/promises';
import path from 'node:path';

const PUBLIC_DIR = path.join(process.cwd(), 'public');

export const GET: APIRoute = async ({ locals }) => {
    if (!locals.uid || locals.role !== 'admin') {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 403 });
    }

    try {
        const files = await fs.readdir(PUBLIC_DIR);
        const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'];
        
        const images = files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return imageExtensions.includes(ext);
        });

        return new Response(JSON.stringify(images), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Error reading directory" }), { status: 500 });
    }
};
