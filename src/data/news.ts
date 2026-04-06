export interface NewsItem {
    title: string;
    image: string;
    description: string;
    link: string;
    date: string;
}

export const news: NewsItem[] = [
    {
        title: "Presentada reclamación por prohibición de uso de baños durante y después de clase de educación física",
        image: "delegados.png",
        description: "Esta medida, que afecta a todos, inclusive aquellos que no hemos hecho nada, prohibe el uso de los baños previamente, durante y después de la clase de EF en el pabellón y fuera de él.",
        link: "/noticias/presentada-solicitud-baños",
        date: "27 Mar 2026"
    },
];
