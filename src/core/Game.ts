// src/core/Game.ts
import { CharacterCard } from "./Card";
import { Player } from "./Player";
import { characterBattle, attackPlayer } from "./combat";

export interface Game {
    players: Player[];
    currentPlayerIndex: number;
    turn: number;

    // could expand later
    // stack: Card[];
    // eventLog: string[];
}

export class Game {
    players: Player[];
    currentPlayerIndex: number = 0;
    turn: number = 0;

    constructor(p1: Player, p2: Player) {
        this.players = [p1, p2];
    }

    get currentPlayer(): Player {
        return this.players[this.currentPlayerIndex];
    }

    set currentPlayer(player: Player) {
        const index = this.players.indexOf(player);
        if (index === -1) {
            throw new Error("Player not found in game");
        }
        this.currentPlayerIndex = index;
    }

    get opponent(): Player {
        return this.players[1 - this.currentPlayerIndex];
    }

    nextTurn() {
        this.currentPlayerIndex = 1 - this.currentPlayerIndex;
        console.log(`It's now ${this.currentPlayer.name}'s turn!`);
        // simulate some action here for testing
    }

    simulateAttack(
        attackerIndex: number,
        targetIndex: number,
        targetIsPlayer: boolean = false
    ) {
        const attacker = this.currentPlayer.board.cards[attackerIndex];
        if (!attacker) return console.warn("Invalid attacker");
        if (attacker.type !== "character")
            return console.warn("Attacker is not a character");
        if (targetIsPlayer) {
            attackPlayer(attacker as CharacterCard, this.opponent);
        } else {
            const target = this.opponent.board.cards[targetIndex];
            if (!target) return console.warn("Invalid target");
            if (target.type !== "character")
                return console.warn("Target is not a character");
            characterBattle(attacker as CharacterCard, target as CharacterCard);
        }

        // Clean up dead cards from boards
        this.cleanup();
    }

    cleanup() {
        for (const player of this.players) {
            player.board.cards = player.board.cards.filter(
                (card) => typeof card.health === "number" && card.health > 0
            );
        }
    }
}
