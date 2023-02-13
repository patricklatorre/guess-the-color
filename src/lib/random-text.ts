import { randInt } from "./math";

const gameOverTexts = [
    'Pretty good!',
    'Niceee',
    'Well played!',
    'Good eyes 😲',
    "WOW 😍",
];

const sikeTexts = [
    'sike',
    'jk',
    'not really',
    'lol jk',
];

export function getRandomGameOverText() {
    let index = randInt(0, gameOverTexts.length);
    return gameOverTexts[index];
}

export function getRandomSikeText() {
    let index = randInt(0, sikeTexts.length);
    return sikeTexts[index];
}
