/**
 * Determines the role based on the email domain.
 * @param {string} email - The email address.
 * @returns {string} The role associated with the email domain.
 */
export const getRoleFromEmail = (email) => {
    const domain = email?.split('@')[1].toLowerCase();

    if (domain === 'ug.bilkent.edu.tr') {
        return 'UG';
    } else if (domain === 'bcc.bilkent.edu.tr') {
        return 'BCC';
    } else if (domain === 'xx.bilkent.edu.tr') {
        return 'XX';
    } else if (domain === 'bilkent.edu.tr') {
        return 'PROF';
    } else {
        return 'Unknown';
    }
}

export const getNameFromEmail = (email) => {
    const domain = email?.split('@')[0].toLowerCase();

    return domain
}
