export const cleanedString = (value: string): string => {
    const cleanedString = value.replace(/[^\w\s]/g, '').split(' ').join('');
    return cleanedString;
}