export interface Show {
    id: string; // ID simple (ex: "1", "2", "3")
    team: 'micim' | 'tipaix';
    title: string;
    date: string; // Format DD/MM/YYYY (ex: "04/10/2025")
    location: string;
    city: string;
    startingHour: string; // Format HHhMM (ex: "20h00")
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
