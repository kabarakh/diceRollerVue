import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import type { DiceRoll } from "@/interfaces/DiceRoll";

export const useDiceRollStore = defineStore({
  id: "diceRollStore",
  state: () => ({
    diceRolls: useStorage("diceRolls", [] as DiceRoll[]),
  }),
  getters: {
    allRolls: (state) => state.diceRolls,
    statistics: (state) => {
      return {
        numberOfDiceRolls: {
          total: 0,
          average: 0,
          betterThanAverage: 0,
          worseThanAverage: 0,
        },
        sumOfAllRolls: 0,
        sumOfAverages: 0,
      };
    },
  },
  actions: {
    addDiceRoll(input: string) {
      console.log("add", input);
    },
    clearDiceRolls() {
      console.log("clear");
      this.diceRolls = [];
    },
  },
});
