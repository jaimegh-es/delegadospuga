import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
    const response = await next();

    // Obtener la URL de la petición
    const url = new URL(context.request.url);
    const pathname = url.pathname;

    // Verificar si es una imagen
    const isImage = /\.(jpg|jpeg|png|gif|svg|webp|avif|ico)$/i.test(pathname);

    if (isImage) {
        // Para imágenes: caché largo
        response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    } else {
        // Para todo lo demás: sin caché
        response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');
        response.headers.set('Pragma', 'no-cache');
        response.headers.set('Expires', '0');
    }

    return response;
});
