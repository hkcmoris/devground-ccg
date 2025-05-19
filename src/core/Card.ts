export type CardType = 'creature' | 'spell' | 'artifact' | 'land';

export interface Card {
  id: string; // uuid
  name: string;
  description: string;
  type: CardType;
  cost: number;

  attack?: number;
  health?: number;

  abilities?: string[]; // could later be full ability objects
}
