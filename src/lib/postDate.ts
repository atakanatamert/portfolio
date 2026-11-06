// Dates are YYYY-MM-DD with no time zone, so format in UTC to avoid an off-by-one day.
export const formatPostDate = (date: string): string =>
    new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
    });
