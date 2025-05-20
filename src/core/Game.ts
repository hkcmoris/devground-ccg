import { Player } from "./Player";

export interface Game {
    players: [Player, Player];
    currentPlayer: Player;
    turn: number;

    // could expand later
    // stack: Card[];
    // eventLog: string[];
}
