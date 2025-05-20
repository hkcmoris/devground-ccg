import { Game } from "../core/Game";
import { Player } from "../core/Player";
import { drawCard, playFirstAvailableCard } from "./actions";

// Simple max mana cap
const MAX_MANA = 10;

export function endTurn(game: Game): void {
    // Switch player
    const nextPlayer = game.players.find((p) => p !== game.currentPlayer)!;
    game.currentPlayer = nextPlayer;
    game.turn++;

    console.log(`\n🔁 Turn ${game.turn}: ${nextPlayer.name}'s turn`);

    // Add mana (capped)
    nextPlayer.mana = Math.min(game.turn, MAX_MANA);
    console.log(`${nextPlayer.name} has ${nextPlayer.mana} mana`);

    // Draw a card
    drawCard(nextPlayer);
    playFirstAvailableCard(nextPlayer);
}
