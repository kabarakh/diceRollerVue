import type { SingleDie } from "@/interfaces/SingleDie";

export interface DiceRoll {
  dice: SingleDie[];
  average: number;
  sum: number;
  date: Date;
  input: string;
}
