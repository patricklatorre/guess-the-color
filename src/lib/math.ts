export function randInt(inclusiveMin: number, exclusiveMax: number) {
    inclusiveMin = Math.ceil(inclusiveMin);
    exclusiveMax = Math.floor(exclusiveMax);
    return Math.floor(Math.random() * (exclusiveMax - inclusiveMin)) + inclusiveMin;
}
