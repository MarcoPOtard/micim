import { Show } from "@/datas/IShowsData";
import { promises as fs } from "fs";

export const showData = async () => {
    const file = await fs.readFile(
        process.cwd() + "/datas/showsData.json",
        "utf8"
    );
    const showsData = JSON.parse(file);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const filteredAndSortedShows = [...showsData.shows]
        .filter(show => {
            const showDate = new Date(show.id);
            showDate.setHours(0, 0, 0, 0);
            return showDate >= today;
        })
        .sort((a, b) => {
            return new Date(a.id).getTime() - new Date(b.id).getTime();
        });
    return filteredAndSortedShows;

}

export const displayShows = async (number:number) => {
    const shows: Show[] = await showData();

    if (number === 0) return shows;

    return shows.slice(0, number);
}

