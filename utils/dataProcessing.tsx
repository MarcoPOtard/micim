import { Show } from "@/datas/IShowsData";
import { promises as fs } from "fs";
import { cache } from "@/lib/cache";
import { isShowInFuture, compareShowsByDate } from "@/utils/dateUtils";

export const showData = async (): Promise<Show[]> => {
    try {
        // Check cache first
        const cacheKey = 'shows-data';
        const cached = cache.get<Show[]>(cacheKey);
        if (cached) {
            return cached;
        }

        const filePath = process.cwd() + "/datas/showsData.json";
        const file = await fs.readFile(filePath, "utf8");
        
        if (!file.trim()) {
            console.error("Shows data file is empty");
            return [];
        }

        const showsData = JSON.parse(file);

        if (!showsData || !showsData.shows || !Array.isArray(showsData.shows)) {
            console.error("Invalid shows data structure");
            return [];
        }

        const filteredAndSortedShows = [...showsData.shows]
            .filter(show => {
                try {
                    if (!show.date) {
                        console.error("Show missing date:", show);
                        return false;
                    }
                    return isShowInFuture(show);
                } catch (error) {
                    console.error("Error filtering show:", error);
                    return false;
                }
            })
            .sort(compareShowsByDate);
        
        // Cache the result for 10 minutes
        cache.set(cacheKey, filteredAndSortedShows, 10);
        
        return filteredAndSortedShows;
    } catch (error) {
        console.error("Error loading shows data:", error);
        return [];
    }
}

export const displayShows = async (number: number): Promise<Show[]> => {
    try {
        const shows: Show[] = await showData();

        if (number === 0) return shows;

        return shows.slice(0, number);
    } catch (error) {
        console.error("Error in displayShows:", error);
        return [];
    }
}

export const displayMicimShows = async (number: number): Promise<Show[]> => {
    try {
        const shows: Show[] = await showData();
        const micimShows = shows.filter(show => show.team === 'micim');

        if (number === 0) return micimShows;

        return micimShows.slice(0, number);
    } catch (error) {
        console.error("Error in displayMicimShows:", error);
        return [];
    }
}

