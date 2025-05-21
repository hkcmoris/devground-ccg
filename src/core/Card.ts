// src/core/Card.ts
export type CardType = "hero" | "character" | "spell" | "location";

export interface Card {
    id: string; // uuid
    name: string;
    description: string;
    type: CardType;
    cost: number;
    imageUrl?: string; // URL to the card image
    rarity?: "common" | "uncommon" | "rare" | "legendary"; // could be an enum

    attack?: number;
    health?: number;

    abilities?: string[]; // could later be full ability objects
}

/**
 * Hero cards are a special type of card that represent the player's avatar in the game.
 * They have unique abilities and can be awakened to gain new powers.
 * Once the hero's health reaches 0, the player loses the game.
 */
export interface AwakeningCondition {
    type: "healthThreshold";
    value: number;
}

export interface HeroCard extends Card {
    type: "hero";
    attack: number;
    awakened: boolean;
    awakenCondition?: AwakeningCondition;
    awakenedForm?: HeroCard;
}

/**
 * Character cards represent creatures or allies that can be summoned to the battlefield.
 * They have attack and health values, and can attack other characters or the opponent directly.
 */
export interface CharacterCard extends Card {
  type: "character";
  attack: number;
  health: number;
}
