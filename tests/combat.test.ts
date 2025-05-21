// tests/combat.test.ts
import { characterBattle, attackPlayer } from "../src/core/combat";
import { CharacterCard, HeroCard } from "../src/core/Card";
import { Player } from "../src/core/Player";

function createChar(name: string, atk: number, hp: number): CharacterCard {
    return {
        id: "1",
        name,
        description: "",
        type: "character",
        cost: 1,
        attack: atk,
        health: hp,
    };
}

function createPlayer(name: string): Player {
    const hero: HeroCard = {
        id: "h1",
        name: `${name}'s Hero`,
        description: "",
        type: "hero",
        cost: 0,
        attack: 2,
        awakened: false,
    };

    return {
        id: "p1",
        name,
        life: 8,
        mana: 5,
        hero,
        deck: { name: "Deck", cards: [] },
        hand: { name: "Hand", cards: [] },
        board: { name: "Board", cards: [] },
        graveyard: { name: "Graveyard", cards: [] },
    };
}

test("characterBattle should reduce defender's health", () => {
    const attacker = createChar("Attacker", 3, 5);
    const defender = createChar("Defender", 2, 4);

    characterBattle(attacker, defender);

    expect(defender.health).toBe(1);
});

test("characterBattle should kill defender at 0 or less", () => {
    const attacker = createChar("Beast", 5, 5);
    const defender = createChar("Goblin", 2, 4);

    characterBattle(attacker, defender);

    expect(defender.health).toBeLessThanOrEqual(0);
});

test("attackPlayer should deal 1 damage if attack >= hero attack", () => {
    const attacker = createChar("Warrior", 3, 3);
    const player = createPlayer("Moris");

    attackPlayer(attacker, player);

    expect(player.life).toBe(7);
});

test("attackPlayer should do nothing if attack < hero attack", () => {
    const attacker = createChar("Baby Slime", 1, 2);
    const player = createPlayer("Kaiba");

    attackPlayer(attacker, player);

    expect(player.life).toBe(8);
});
