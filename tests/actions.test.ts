// tests/actions.test.ts
import { drawCard, playFirstAvailableCard } from "../src/systems/actions";
import { Player } from "../src/core/Player";
import { Card } from "../src/core/Card";

function createCard(id: string, cost = 1): Card {
    return {
        id,
        name: `Card ${id}`,
        description: "Test card",
        type: "character",
        cost,
        attack: 1,
        health: 1,
    };
}

function createPlayer(): Player {
    return {
        id: "p1",
        name: "Test Player",
        life: 10,
        mana: 3,
        hero: {
            id: "h1",
            name: "Hero",
            description: "",
            type: "hero",
            cost: 0,
            attack: 1,
            awakened: false,
        },
        deck: { name: "Deck", cards: [] },
        hand: { name: "Hand", cards: [] },
        board: { name: "Board", cards: [] },
        graveyard: { name: "Graveyard", cards: [] },
    };
}

describe("drawCard", () => {
    test("should draw a card from the deck into the hand", () => {
        const player = createPlayer();
        const card = createCard("c1");
        player.deck.cards.push(card);

        drawCard(player);

        expect(player.hand.cards).toContain(card);
        expect(player.deck.cards).not.toContain(card);
    });

    test("should do nothing if deck is empty", () => {
        const player = createPlayer();

        drawCard(player);

        expect(player.hand.cards.length).toBe(0);
    });
});

describe("playFirstAvailableCard", () => {
    test("should play card if enough mana", () => {
        const player = createPlayer();
        const card = createCard("c2", 2);
        player.hand.cards.push(card);

        const played = playFirstAvailableCard(player);

        expect(played).toBe(true);
        expect(player.board.cards).toContain(card);
        expect(player.hand.cards).not.toContain(card);
        expect(player.mana).toBe(1); // 3 - 2 = 1
    });

    test("should not play card if not enough mana", () => {
        const player = createPlayer();
        const card = createCard("c3", 5); // costs more than 3 mana
        player.hand.cards.push(card);

        const played = playFirstAvailableCard(player);

        expect(played).toBe(false);
        expect(player.board.cards).not.toContain(card);
        expect(player.hand.cards).toContain(card);
        expect(player.mana).toBe(3); // unchanged
    });

    test("should play first affordable card, not necessarily all", () => {
        const player = createPlayer();
        const cheap = createCard("c4", 1);
        const expensive = createCard("c5", 5);
        player.hand.cards.push(expensive, cheap); // cheap second

        const played = playFirstAvailableCard(player);

        expect(played).toBe(true);
        expect(player.board.cards).toContain(cheap);
        expect(player.hand.cards).not.toContain(cheap);
        expect(player.hand.cards).toContain(expensive); // stays in hand
        expect(player.mana).toBe(2); // 3 - 1
    });
});
