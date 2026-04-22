import type { APIRoute } from "astro";
import fs from 'node:fs/promises';
import path from 'node:path';

const PUBLIC_DIR = path.join(process.cwd(), 'public');

export const GET: APIRoute = async ({ locals }) => {
    if (!locals.uid || locals.role !== 'admin') {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 403 });
    }

    try {
        const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'];
        
        async function getFiles(dir: string, baseDir: string = ''): Promise<string[]> {
            const entries = await fs.readdir(dir, { withFileTypes: true });
            const files = await Promise.all(entries.map(async (entry) => {
                const res = path.join(dir, entry.name);
                const relativePath = baseDir ? path.join(baseDir, entry.name) : entry.name;
                
                if (entry.isDirectory()) {
                    // Solo entramos en uploads por ahora para no saturar
                    if (entry.name === 'uploads' || entry.name === '1bach carteles') {
                        return getFiles(res, relativePath);
                    }
                    return [];
                } else {
                    const ext = path.extname(entry.name).toLowerCase();
                    return imageExtensions.includes(ext) ? [relativePath] : [];
                }
            }));
            
            return files.flat();
        }

        const images = await getFiles(PUBLIC_DIR);

        return new Response(JSON.stringify(images), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    } catch (error) {
        console.error("Error reading directory:", error);
        return new Response(JSON.stringify({ error: "Error reading directory" }), { status: 500 });
    }
};
