// src/index.ts
import { v4 as uuidv4 } from "uuid";
import { Card } from "./core/Card";
import { Player } from "./core/Player";
import { Zone } from "./core/Zone";
import { Game } from "./core/Game";
import { endTurn } from "./systems/TurnManager";
import { drawCard } from "./systems/actions";
import { updateGameUI, updateLocalPlayerUI, updateOpponentUI } from "./ui/updateTurnUI";

// === Preload UI Assets ===
// Preload essential UI assets to ensure they are available when needed
// This is a simple function to preload images
// You can expand this to include other assets like audio, fonts, etc.
const preloadUIAssets = () => {
  const assets = [
    '/assets/ui/btn-end-turn.png',
    '/assets/ui/btn-end-turn-highlighted.png',
    '/assets/ui/health.png',
    '/assets/ui/mana.png',
    '/assets/ui/cards.png',
    // add more essentials
  ];

  assets.forEach(src => {
    const img = new Image();
    img.src = src;
  });
};

preloadUIAssets();

// === Game Initialization ===

function createDummyCard(name: string): Card {
    return {
        id: uuidv4(),
        name,
        description: `A mysterious card named ${name}.`,
        type: "character",
        cost: Math.floor(Math.random() * 5) + 1,
        attack: Math.floor(Math.random() * 5) + 1,
        health: Math.floor(Math.random() * 5) + 1,
    };
}

function createDeck(size: number): Zone {
    const cards = Array.from({ length: size }, (_, i) =>
        createDummyCard(`Card ${i + 1}`)
    );
    return {
        name: "Deck",
        cards,
    };
}

function createPlayer(name: string): Player {
    return {
        id: uuidv4(),
        name,
        life: 8,
        mana: 0,
        hero: {
            id: uuidv4(),
            name: `${name}'s Hero`,
            description: `The hero of ${name}.`,
            type: "hero",
            cost: 0,
            attack: 2,
            awakened: false,
            awakenCondition: { type: "healthThreshold", value: 4 },
            awakenedForm: {
                id: uuidv4(),
                name: `${name}'s Awakened Hero`,
                description: `The awakened form of ${name}'s hero.`,
                type: "hero",
                cost: 0,
                attack: 4,
                awakened: true,
            },
        },
        deck: createDeck(20),
        hand: { name: "Hand", cards: [] },
        board: { name: "Board", cards: [] },
        graveyard: { name: "Graveyard", cards: [] },
    };
}

// === Initialize the Game ===
const player1 = createPlayer("Moris");
const player2 = createPlayer("Kaiba");

drawCard(player1, 5);
drawCard(player2, 5);

console.log(`🃏 ${player1.name} vs ${player2.name}`);
console.log(`💖 ${player1.name} Life: ${player1.life}`);
console.log(`💖 ${player2.name} Life: ${player2.life}`);
console.log(`🃏 ${player1.name} Deck: ${player1.deck.cards.length} cards`);
console.log(`🃏 ${player2.name} Deck: ${player2.deck.cards.length} cards`);
console.log(`🃏 ${player1.name} Hand: ${player1.hand.cards.length} cards`);
console.log(`🃏 ${player2.name} Hand: ${player2.hand.cards.length} cards`);

const game: Game = new Game(player1, player2);

updateGameUI(player1, player2, game.currentPlayer);

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("btn-end-turn");
    if (btn) {
        btn.addEventListener("click", () => {
            console.log("End Turn button clicked!");
            endTurn(game); // call your game's end turn logic here
        });
    }
});

console.log(`🎮 Game Start 🎮`);
console.log(`${game.currentPlayer.name} goes first`);

// for (let i = 0; i < 10; i++) {
//     console.log(`=== TURN ${game.turn} ===`);
//     endTurn(game);
// }
