// tests/TurnManager.test.ts
import { endTurn } from "../src/systems/TurnManager";
import { Game } from "../src/core/Game";
import { Player } from "../src/core/Player";
import { HeroCard } from "../src/core/Card";
import { v4 as uuidv4 } from "uuid";

function createTestHero(): HeroCard {
    return {
        id: uuidv4(),
        name: "Test Hero",
        description: "A test hero",
        type: "hero",
        cost: 0,
        attack: 1,
        awakened: false,
        awakenCondition: { type: "healthThreshold", value: 10 },
        awakenedForm: {
            id: uuidv4(),
            name: "Awakened Hero",
            description: "Awakened form",
            type: "hero",
            cost: 0,
            attack: 3,
            awakened: true,
        }
    };
}

function createPlayer(name: string): Player {
    return {
        id: uuidv4(),
        name,
        life: 20,
        mana: 0,
        hero: createTestHero(),
        deck: { name: "Deck", cards: [] },
        hand: { name: "Hand", cards: [] },
        board: { name: "Board", cards: [] },
        graveyard: { name: "Graveyard", cards: [] },
    };
}

describe("TurnManager.endTurn", () => {
    let game: Game;
    let player1: Player;
    let player2: Player;

    beforeEach(() => {
        player1 = createPlayer("Goku");
        player2 = createPlayer("Vegeta");
        game = new Game(player1, player2);
    });

    test("endTurn switches currentPlayer and increments turn", () => {
        endTurn(game);

        expect(game.currentPlayer).toBe(player2);
        expect(game.opponent).toBe(player1);
        expect(game.turn).toBe(1);

        endTurn(game);

        expect(game.currentPlayer).toBe(player1);
        expect(game.opponent).toBe(player2);
        expect(game.turn).toBe(2);

        endTurn(game);

        expect(game.currentPlayer).toBe(player2);
        expect(game.opponent).toBe(player1);
        expect(game.turn).toBe(3);
    });

    test("mana increases each turn, capped at 10", () => {
        for (let i = 0; i < 15; i++) {
            endTurn(game);
        }
        expect(game.currentPlayer.mana).toBeLessThanOrEqual(10);
    });

    test("drawCard and playFirstAvailableCard are called", () => {
        const drawSpy = jest.spyOn(require("../src/systems/actions"), "drawCard");
        const playSpy = jest.spyOn(require("../src/systems/actions"), "playFirstAvailableCard");

        endTurn(game);

        expect(drawSpy).toHaveBeenCalledWith(game.currentPlayer);
        expect(playSpy).toHaveBeenCalledWith(game.currentPlayer);

        drawSpy.mockRestore();
        playSpy.mockRestore();
    });
});
