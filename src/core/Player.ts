import { Zone } from './Zone';

export interface Player {
  id: string;
  name: string;
  life: number;
  mana: number;

  deck: Zone;
  hand: Zone;
  board: Zone;
  graveyard: Zone;
}
