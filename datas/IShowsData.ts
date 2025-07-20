export interface Show {
    id: string;
    title: string;
    date: string;
    shortDate: string;
    location: string;
    city: string;
    startingHour: string;
    image: string;
    poster: string;
    description: string;
    link?: string;
    posterWidth?: string;
    posterHeight?: string;
}

export interface ShowsDatas {
    shows: Show[];
}
