let ASCII_A = 65

export function numToLabelCode(num: number): string {
    let code = ''
    if (num <= 0) {
        return code;
    }
    let startingCode = ASCII_A
    while (num > 26) {
        num -= 26
        startingCode += 1
    }
    if (startingCode === ASCII_A) {
        return String.fromCharCode(ASCII_A - 1 + num)
    }
    else {
        code = String.fromCharCode(startingCode - 1)
        code += String.fromCharCode(ASCII_A - 1 + num)
    }
    return code
}