// src/core/Player.ts
import { HeroCard } from "./Card";
import { Zone } from "./Zone";

export interface Player {
    id: string;
    name: string;
    life: number;
    mana: number;

    hero: HeroCard;

    deck: Zone;
    hand: Zone;
    board: Zone;
    graveyard: Zone;
}
