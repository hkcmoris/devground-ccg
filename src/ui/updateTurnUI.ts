import { Player } from "../core/Player";

// src/ui/updateTurnUI.ts
export function updateTurnUI(currentPlayer: Player, localPlayer: Player): void {
    const playerLabel = document.getElementById("player-info");
    const opponentLabel = document.getElementById("opponent-info");

    const isPlayerTurn = currentPlayer === localPlayer;
    playerLabel?.classList.toggle("active", isPlayerTurn);
    opponentLabel?.classList.toggle("active", !isPlayerTurn);
}

export function updateLocalPlayerUI(player: Player): void {
    const playerLabel = document.getElementById("player-info");
    if (playerLabel) {
        playerLabel.innerHTML = `
            <h2>${player.name}</h2>
            <div class="counter life-counter"><span class="counter-value">${player.life}</span></div>
            <div class="counter mana-counter"><span class="counter-value">${player.mana}</span></div>
            <div class="counter cards-counter"><span class="counter-value">${player.hand.cards.length}</span></div>
        `;
    }
}

export function updateOpponentUI(player: Player): void {
    const opponentLabel = document.getElementById("opponent-info");
    if (opponentLabel) {
        opponentLabel.innerHTML = `
            <h2>${player.name}</h2>
            <div class="counter life-counter"><span class="counter-value">${player.life}</span></div>
            <div class="counter mana-counter"><span class="counter-value">${player.mana}</span></div>
            <div class="counter cards-counter"><span class="counter-value">${player.hand.cards.length}</span></div>
        `;
    }
}

export function updateGameUI(localPlayer: Player, opponent: Player, currentPlayer: Player): void {
    updateLocalPlayerUI(localPlayer);
    updateOpponentUI(opponent);
    updateTurnUI(currentPlayer, localPlayer);
}