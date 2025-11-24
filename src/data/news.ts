export interface NewsItem {
    title: string;
    image: string;
    description: string;
    link: string;
    date: string;
}

export const news: NewsItem[] = [
    {
        title: "Recogida de propuestas",
        image: "./public/delegados.png",
        description: "Hemos creado una encuesta anónima para recoger propuestas que libremente deseeis hacer.",
        link: "https://live.e-survey.io/switch/share/2859b07c28",
        date: "24 Nov 2025"
    },
   /* {
        title: "Recogida de propuestas",
        image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop",
        description: "Hemos creado una encuesta anónima para recoger propuestas que libremente deseeis hacer.",
        link: "/noticias/ejemplo",
        date: "24 Nov 2025"
    }*/
];
