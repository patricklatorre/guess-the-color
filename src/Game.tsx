import { createSignal, For, Match, onMount, Signal, Switch } from 'solid-js';
import css from './Game.module.css';

import { generateColors, RGB, rgbToCss, rgbToHex } from './lib/colors';
import { randInt } from './lib/math';
import { getRandomGameOverText, getRandomSikeText } from './lib/random-text';


function Game() {  
  let [colors, setColors]: Signal<RGB[]>  = createSignal([]);
  let [correctIndex, setCorrectIndex]     = createSignal(0);
  let [correctHex, setCorrectHex]         = createSignal('');
  let [score, setScore]                   = createSignal(0);
  let [gameOver, setGameOver]             = createSignal(false);
  let [gameOverText, setGameOverText]     = createSignal('');

  const colorCount = 6;


  onMount(() => {
    newRound();
  });


  function newRound() {
    let _colors = generateColors(colorCount);
    let _correctIndex = randInt(0, colorCount);
    let _correctHex = rgbToHex(_colors[_correctIndex]).toUpperCase();

    setCorrectIndex(_correctIndex);
    setCorrectHex(_correctHex);
    setColors(_colors);
  }


  function restartGame() {
    setScore(0);
    newRound();
    setGameOver(false);
  }


  function chooseColor(index: number) {
    if (index === correctIndex()) {
      setScore(score => score + 1);
      newRound();
    } else {
      endGame();
    }
  }


  function endGame() {
    setGameOverText(getRandomGameOverText());
    setTimeout(() => setGameOverText(getRandomSikeText()), 1200);
    setGameOver(true);
  }


  function isInitialized() {
    return colors().length > 0 && correctHex() !== '';
  }


  function bgColorStyle(color: RGB) {
    return { 'background-color': rgbToCss(color) };
  }


  function GameScreen() {
    return (
      <>
        {/* HEX CODE TEXT */}
        <h2 class={css.correctHex}>{correctHex()}</h2>

        {/* COLOR CHOICES */}
        <div class={css.colorGrid}>
          <For each={colors()}>
            {(color, index) => (
              <div
                class={css.square}
                style={bgColorStyle(color)}
                onClick={() => chooseColor(index())}
              ></div>
            )}
          </For>
        </div>

        {/* INSTRUCTION & SCORE */}
        <Switch>
          <Match when={score() === 0}>
            <span class={css.instruction}>Choose the color that matches the hex</span>
          </Match>

          <Match when={score() > 0}>
              <span class={css.instruction}>Score : <strong>{score()}</strong></span>
          </Match>
        </Switch>
      </>
    );
  }


  function EndScreen() {
    return (
      <div class={css.EndScreen}>
        <h4 class={css.gameOverText}>{gameOverText()}</h4>
        <h4 class={css.gameOverScore}>{score()}</h4>
        <button class={css.restartBtn} onClick={restartGame}>
          Try again
        </button>
      </div>
    );
  }


  return (
    <main class={css.Root}>
      <Switch>
        <Match when={isInitialized() && !gameOver()}>
          <GameScreen />
        </Match>

        <Match when={gameOver()}>
          <EndScreen />
        </Match>
      </Switch>
    </main>
  );
}


export default Game;
