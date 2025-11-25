export interface NewsItem {
    title: string;
    image: string;
    description: string;
    link: string;
    date: string;
}

export const news: NewsItem[] = [
    {
        title: "Encuesta abierta",
        image: "./public/delegados.png",
        description: "Hemos creado una encuesta anónima para recoger propuestas que libremente deseeis hacer.",
        link: "https://live.e-survey.io/switch/share/2859b07c28",
        date: "25 Nov 2025"
    },
    {
        title: "Charla excursión",
        image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop",
        description: "El miércoles en el segundo recreo.",
        link: "",
        date: "25 Nov 2025"
    }
];
