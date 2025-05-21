// src/systems/TurnManager.ts
import { Game } from "../core/Game";
import { Player } from "../core/Player";
import { drawCard, playFirstAvailableCard } from "./actions";

// Simple max mana cap
const MAX_MANA = 10;

export function endTurn(game: Game): void {
    // Switch player
    game.currentPlayer = game.opponent;
    game.turn++;

    console.log(`\n🔁 Turn ${game.turn}: ${game.currentPlayer.name}'s turn`);

    // Add mana (capped)
    game.currentPlayer.mana = Math.min(game.turn, MAX_MANA);
    console.log(`${game.currentPlayer.name} has ${game.currentPlayer.mana} mana`);

    // Draw a card
    drawCard(game.currentPlayer);
    playFirstAvailableCard(game.currentPlayer);
}
