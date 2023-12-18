/**
 * Calculates the time difference between the current date and a given date.
 * @param {string} postDate - The date to calculate the time difference from.
 * @returns {string} - The time difference in a human-readable format.
 */
export const getTimeSince = (postDate) => {
    const currentDate = new Date();
    const postDateTime = new Date(postDate);
    const timeDifference = currentDate - postDateTime;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) {
        return `${years}y`;
    } else if (months > 0) {
        return `${months}mo`;
    } else if (weeks > 0) {
        return `${weeks}w`;
    } else if (days > 0) {
        return `${days}d`;
    } else if (hours > 0) {
        return `${hours}h`;
    } else if (minutes > 0) {
        return `${minutes}m`;
    } else {
        return `${seconds}s`;
    }
}