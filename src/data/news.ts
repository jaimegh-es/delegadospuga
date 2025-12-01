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
        image: "delegados.png",
        description: "Hemos creado una encuesta anónima para recoger propuestas que libremente deseeis hacer.",
        link: "https://live.e-survey.io/switch/share/2859b07c28",
        date: "25 Nov 2025"
    },
];
