import type { SingleDie } from "@/interfaces/SingleDie";
import type { Moment } from "moment";

export interface DiceRoll {
  dice: SingleDie[];
  average: number;
  sum: number;
  displayDate: string;
  key: string;
  input: string;
  display: string;
}
