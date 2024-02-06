export function convertDateFormat(input) {
    const year = input.substring(0, 4);
    const month = input.substring(4, 6);
    const day = input.substring(6, 8);
    const hour = input.substring(8, 10);
    const minute = input.substring(10, 12);
    const formattedDate = `${day}.${month}.${year}`;
    const formattedTime = `${hour}:${minute}`;
    const result = `${formattedDate}`;
    return result;
}

export function convertAccountNumber(input) {
    const first = input.substring(0, 4);
    const second = input.substring(4, 8);
    const third = input.substring(8, 12);
    const fourth = input.substring(12, 16);
    const result = `${first + ' ' + second + ' ' + third + ' ' + fourth}`;
    return result;
}
