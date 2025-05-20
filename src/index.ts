import { v4 as uuidv4 } from "uuid";
import { Card } from "./core/Card";
import { Player } from "./core/Player";
import { Zone } from "./core/Zone";
import { Game } from "./core/Game";
import { endTurn } from "./systems/TurnManager";

function createDummyCard(name: string): Card {
    return {
        id: uuidv4(),
        name,
        description: `A mysterious card named ${name}.`,
        type: "creature",
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
        life: 20,
        mana: 0,
        deck: createDeck(20),
        hand: { name: "Hand", cards: [] },
        board: { name: "Board", cards: [] },
        graveyard: { name: "Graveyard", cards: [] },
    };
}

// === Initialize the Game ===
const player1 = createPlayer("Moris");
const player2 = createPlayer("Kaiba");

console.log(`🃏 ${player1.name} vs ${player2.name}`);
console.log(`💖 ${player1.name} Life: ${player1.life}`)
console.log(`💖 ${player2.name} Life: ${player2.life}`)
console.log(`🃏 ${player1.name} Deck: ${player1.deck.cards.length} cards`);
console.log(`🃏 ${player2.name} Deck: ${player2.deck.cards.length} cards`);
console.log(`🃏 ${player1.name} Hand: ${player1.hand.cards.length} cards`);
console.log(`🃏 ${player2.name} Hand: ${player2.hand.cards.length} cards`);

const game: Game = {
    players: [player1, player2],
    currentPlayer: player1,
    turn: 1,
};

console.log(`🎮 Game Start - Turn ${game.turn}`);
console.log(`${game.currentPlayer.name} goes first`);

for (let i = 0; i < 10; i++) {
    endTurn(game);
}
