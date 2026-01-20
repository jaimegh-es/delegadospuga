# Guía de Formato para Detalles en Calendario y Eventos

Ahora puedes usar **HTML** en el campo `detalles` de los exámenes y eventos para agregar formato rico, enlaces, botones y más.

## 🎨 Elementos HTML Soportados

### 1. **Enlaces (Links)**
```javascript
detalles: `
    <p>Visita el <a href="https://ejemplo.com" target="_blank">sitio web oficial</a></p>
`
```

### 2. **Botones**
```javascript
detalles: `
    <a href="https://ejemplo.com" target="_blank" class="btn">Descargar PDF</a>
    <a href="https://ejemplo.com/inscripcion" target="_blank" class="btn">Inscribirse</a>
`
```

### 3. **Texto en Negrita y Cursiva**
```javascript
detalles: `
    <p>Esto es <strong>muy importante</strong> y esto es <em>opcional</em></p>
    <p>También puedes usar <b>negrita</b> e <i>itálica</i></p>
`
```

### 4. **Listas**
```javascript
detalles: `
    <p>Temas del examen:</p>
    <ul>
        <li>Tema 1: Introducción</li>
        <li>Tema 2: Desarrollo</li>
        <li>Tema 3: Conclusión</li>
    </ul>
`
```

### 5. **Listas Numeradas**
```javascript
detalles: `
    <p>Pasos a seguir:</p>
    <ol>
        <li>Estudiar el capítulo 1</li>
        <li>Hacer los ejercicios</li>
        <li>Repasar los apuntes</li>
    </ol>
`
```

### 6. **Párrafos**
```javascript
detalles: `
    <p>Este es el primer párrafo.</p>
    <p>Este es el segundo párrafo.</p>
`
```

### 7. **Separadores**
```javascript
detalles: `
    <p>Información general</p>
    <hr>
    <p>Información adicional</p>
`
```

### 8. **Código o Texto Destacado**
```javascript
detalles: `
    <p>Recuerda traer <code>calculadora científica</code></p>
`
```

## 📝 Ejemplos Completos

### Ejemplo 1: Examen con Enlaces y Lista
```javascript
"2026-02-05": [
    {
        asignatura: "Examen libro gallego",
        hora: "",
        aula: "B1B",
        detalles: `
            <p>El libro es <strong>'As malas mulleres'</strong>, de <em>Marilar Alexandre</em>.</p>
            <p>Recursos útiles:</p>
            <ul>
                <li>📚 <a href="https://example.com/resumen" target="_blank">Resumen del libro</a></li>
                <li>📝 <a href="https://example.com/analisis" target="_blank">Análisis de personajes</a></li>
            </ul>
            <a href="https://example.com/comprar" target="_blank" class="btn">Comprar libro</a>
        `,
    },
],
```

### Ejemplo 2: Evento con Botones
```javascript
"2026-02-13": [
    {
        asignatura: "Fiesta carnaval",
        hora: "",
        aula: "",
        detalles: `
            <p><strong>¡Este año la organizamos nosotros!</strong> 🎉</p>
            <p>Información importante:</p>
            <ul>
                <li>🎭 Disfraces obligatorios</li>
                <li>🎵 Música en directo</li>
                <li>🍕 Comida y bebida incluida</li>
            </ul>
            <hr>
            <p><em>Para más información:</em></p>
            <a href="https://example.com/carnaval" target="_blank" class="btn">Ver programa completo</a>
            <a href="https://example.com/inscripcion" target="_blank" class="btn">Inscribirse</a>
        `,
    },
],
```

### Ejemplo 3: Examen con Instrucciones Detalladas
```javascript
"2026-01-28": [
    {
        asignatura: "Examen Mate",
        hora: "",
        aula: "B1B",
        detalles: `
            <p><strong>Temas que entran:</strong></p>
            <ol>
                <li>Derivadas e integrales</li>
                <li>Límites</li>
                <li>Funciones trigonométricas</li>
            </ol>
            <hr>
            <p><em>Material permitido:</em></p>
            <ul>
                <li>✅ Calculadora científica</li>
                <li>✅ Regla y compás</li>
                <li>❌ Apuntes (NO permitidos)</li>
            </ul>
            <p>Descarga la <a href="https://example.com/formulario.pdf" target="_blank">hoja de fórmulas</a></p>
            <a href="https://example.com/ejercicios" target="_blank" class="btn">Ejercicios de práctica</a>
        `,
    },
],
```

## 🎨 Estilos Aplicados Automáticamente

Los siguientes elementos tienen estilos predefinidos:

- **Enlaces (`<a>`)**: Color azul (#2000ad), subrayado al pasar el ratón
- **Botones (`.btn`)**: Gradiente azul, efecto hover con elevación
- **Negrita (`<strong>`, `<b>`)**: Color azul (#2000ad)
- **Cursiva (`<em>`, `<i>`)**: Color gris (#64748b)
- **Código (`<code>`)**: Fondo gris claro, fuente monoespaciada
- **Separadores (`<hr>`)**: Línea gris (#e2e8f0)

## ⚠️ Notas Importantes

1. **Usa comillas invertidas (backticks)**: Para textos multilínea con HTML, usa `` ` `` en lugar de `"` o `'`
2. **Target="_blank"**: Agrega `target="_blank"` a los enlaces para que se abran en una nueva pestaña
3. **Clase "btn"**: Para crear botones, usa la clase `class="btn"` en un enlace `<a>`
4. **Emojis**: Puedes usar emojis directamente en el HTML (🎉 📚 ✅ ❌ etc.)

## 🔄 Cómo Editar

1. Abre el archivo `CalendarioExamenes.astro` o `Eventos.astro`
2. Busca el objeto de datos en la parte superior
3. Modifica el campo `detalles` usando HTML
4. Guarda el archivo

¡Ahora tus detalles pueden ser mucho más informativos y atractivos! 🚀
