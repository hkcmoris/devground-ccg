// src/systems/actions.ts
import { Player } from "../core/Player";
import { Card } from "../core/Card";

export function drawCard(player: Player): void {
    const card = player.deck.cards.shift();
    if (card) {
        player.hand.cards.push(card);
        console.log(`${player.name} draws ${card.name}`);
    } else {
        console.log(
            `${player.name} tried to draw a card, but the deck is empty!`
        );
    }
}

export function playFirstAvailableCard(player: Player): boolean {
    const playable = player.hand.cards.find((card) => card.cost <= player.mana);
    if (!playable) {
        console.log(`${player.name} has no playable cards.`);
        return false;
    }

    // Pay mana and move card to board
    player.mana -= playable.cost;
    player.hand.cards = player.hand.cards.filter(
        (card) => card.id !== playable.id
    );
    player.board.cards.push(playable);

    console.log(
        `${player.name} plays (${playable.cost}) ${playable.name} [${playable.attack} / ${playable.health}] to the board.`
    );
    
    return true;
}
