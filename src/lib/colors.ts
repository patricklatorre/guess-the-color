import { randInt } from "./math";

export type RGB = {
    r: number;
    g: number;
    b: number;
}


export function generateColors(amount: number) {
    let colors: RGB[] = [];

    for (let i = 0; i < amount; i++) {
        let r = randInt(0, 256);
        let g = randInt(0, 256);
        let b = randInt(0, 256);
        colors.push({ r, g, b });
    }

    return colors;
}


export function rgbToCss(rgb: RGB) {
    return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
}


export function rgbToHex(rgb: RGB) {
    return '#' + toHex(rgb.r) + toHex(rgb.g) + toHex(rgb.b);
}


function toHex(bin: number) {
    let hex = Number(bin).toString(16);
    if (hex.length < 2) {
        hex = "0" + hex;
    }
    return hex;
}
