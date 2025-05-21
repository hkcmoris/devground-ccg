// src/core/combat.ts
import { CharacterCard } from "./Card";
import { Player } from "./Player";

export function characterBattle(attacker: CharacterCard, defender: CharacterCard) {
    defender.health -= attacker.attack;

    console.log(`⚔️ ${attacker.name} attacks ${defender.name} for 💥${attacker.attack} damage!`);
    console.log(`${defender.name} has ${defender.health} health remaining!`);
    if (defender.health <= 0) console.log(`${defender.name} dies!`);
}

export function attackPlayer(attacker: CharacterCard, defendingPlayer: Player) {
    const hero = defendingPlayer.hero;

    if (attacker.attack >= hero.attack) {
        defendingPlayer.life -= 1;
        console.log(
            `⚔️ ${attacker.name} penetrates defenses! ${defendingPlayer.name} takes 💥1 damage.`
        );
    } else {
        console.log(`${attacker.name} failed to damage the hero.`);
    }
}
