export const minLengthValidator = (str, requiredLength) => {
    return str.trim().length >= requiredLength
};

export const maxLengthValidator = (str, requiredLength) => {
    return str.trim().length <= requiredLength;
}

export const patternValidator = (str, pattern) => {
    return pattern.test(str.trim());
};