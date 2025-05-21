// tests/Game.test.ts
import { Game } from "../src/core/Game";
import { Player } from "../src/core/Player";
import { Zone } from "../src/core/Zone";
import { CharacterCard, HeroCard } from "../src/core/Card";
import { v4 as uuidv4 } from "uuid";

function createTestCharacter(name: string, atk: number, hp: number): CharacterCard {
    return {
        id: uuidv4(),
        name,
        description: "A test character.",
        type: "character",
        cost: 1,
        attack: atk,
        health: hp,
    };
}

function createTestHero(name: string): HeroCard {
    return {
        id: uuidv4(),
        name,
        description: "Test Hero",
        type: "hero",
        cost: 0,
        attack: 2,
        awakened: false,
        awakenCondition: { type: "healthThreshold", value: 3 },
        awakenedForm: {
            id: uuidv4(),
            name: "Awakened " + name,
            description: "Awakened Hero",
            type: "hero",
            cost: 0,
            attack: 4,
            awakened: true,
        },
    };
}

function createTestPlayer(name: string): Player {
    return {
        id: uuidv4(),
        name,
        life: 5,
        mana: 3,
        hero: createTestHero(name),
        deck: { name: "Deck", cards: [] },
        hand: { name: "Hand", cards: [] },
        board: { name: "Board", cards: [] },
        graveyard: { name: "Graveyard", cards: [] },
    };
}

describe("Game", () => {
    let game: Game;
    let p1: Player;
    let p2: Player;

    beforeEach(() => {
        p1 = createTestPlayer("Goku");
        p2 = createTestPlayer("Vegeta");
        game = new Game(p1, p2);
    });

    test("initializes game with two players", () => {
        expect(game.players.length).toBe(2);
        expect(game.currentPlayer.name).toBe("Goku");
        expect(game.opponent.name).toBe("Vegeta");
    });

    test("switches turns correctly", () => {
        game.nextTurn();
        expect(game.currentPlayer.name).toBe("Vegeta");
        game.nextTurn();
        expect(game.currentPlayer.name).toBe("Goku");
    });

    test("character vs character combat and cleanup", () => {
        const attacker = createTestCharacter("Punchy", 3, 5);
        const defender = createTestCharacter("Blocky", 2, 2);

        p1.board.cards.push(attacker);
        p2.board.cards.push(defender);

        game.simulateAttack(0, 0);
        expect(p2.board.cards.length).toBe(0); // defender died
        expect(p1.board.cards.length).toBe(1); // attacker survived
    });

    test("character attacks player and deals damage if attack >= hero.attack", () => {
        const attacker = createTestCharacter("Sneaky", 3, 3);
        p1.board.cards.push(attacker);
        game.simulateAttack(0, 0, true);

        expect(p2.life).toBe(4); // 1 damage dealt
    });

    test("character fails to damage player if attack < hero.attack", () => {
        const attacker = createTestCharacter("Weakling", 1, 3);
        p1.board.cards.push(attacker);
        game.simulateAttack(0, 0, true);

        expect(p2.life).toBe(5); // no damage
    });

    test("cleanup removes only dead characters", () => {
        const alive = createTestCharacter("Alive", 2, 3);
        const dead = createTestCharacter("Dead", 2, 0);

        p1.board.cards.push(alive, dead);
        game.cleanup();

        expect(p1.board.cards.length).toBe(1);
        expect(p1.board.cards[0].name).toBe("Alive");
    });
});
