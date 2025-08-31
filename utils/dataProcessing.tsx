import { Show } from "@/datas/IShowsData";
import { promises as fs } from "fs";
import { cache } from "@/lib/cache";

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

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const filteredAndSortedShows = [...showsData.shows]
            .filter(show => {
                try {
                    if (!show.id) {
                        console.error("Show missing ID:", show);
                        return false;
                    }
                    const showDate = new Date(show.id);
                    if (isNaN(showDate.getTime())) {
                        console.error("Invalid date for show:", show.id);
                        return false;
                    }
                    showDate.setHours(0, 0, 0, 0);
                    return showDate >= today;
                } catch (error) {
                    console.error("Error filtering show:", error);
                    return false;
                }
            })
            .sort((a, b) => {
                try {
                    return new Date(a.id).getTime() - new Date(b.id).getTime();
                } catch (error) {
                    console.error("Error sorting shows:", error);
                    return 0;
                }
            });
        
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

