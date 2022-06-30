import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import type { DiceRoll } from "@/interfaces/DiceRoll";
import type { SingleDie } from "@/interfaces/SingleDie";
import moment from "moment";

const prepareInputParts = (input: string): string[] => {
  input = input
    .toLowerCase()
    .replace(/\s/g, "")
    .replace(/([+-])/g, " $1");

  return input.split(" ");
};

const createDiceFromSinglePart = (input: string): SingleDie => {
  let delimiter = "+";
  let count = 0;
  let sides = 0;
  let average = 0;
  let sum = 0;

  if (input.match(/^([-+])/)) {
    delimiter = input.charAt(0);
    input = input.substr(1);
  }

  if (input.match(/[dw]/)) {
    const inputParts = input.split(/[dw]/);
    count = inputParts[0] === "" ? 1 : parseInt(inputParts[0], 10);
    sides = parseInt(inputParts[inputParts.length - 1], 10) || 0;
  }

  if (count && sides) {
    average = ((sides + 1) / 2) * count;

    for (let i = 0; i < count; i++) {
      sum += Math.floor(1 + Math.random() * sides);
    }
  } else if (input.match(/\d+/)) {
    average = sum = input.match(/^-/)
      ? -1 * parseInt(input, 10)
      : parseInt(input, 10);
  }

  return {
    input,
    delimiter,
    count,
    sides,
    average,
    sum,
  };
};

export const useDiceRollStore = defineStore({
  id: "diceRollStore",
  state: () => {
    return {
      diceRolls: useStorage("diceRolls", [] as DiceRoll[]),
    };
  },
  getters: {
    allRolls: (state) => state.diceRolls,
    statistics: (state) => {
      const statistics = {
        numberOfDiceRolls: {
          total: 0,
          average: 0,
          betterThanAverage: 0,
          worseThanAverage: 0,
        },
        sumOfAllRolls: 0,
        sumOfAverages: 0,
      };

      state.diceRolls.forEach((diceRoll: DiceRoll) => {
        statistics.numberOfDiceRolls.total++;

        if (diceRoll.average < diceRoll.sum) {
          statistics.numberOfDiceRolls.worseThanAverage++;
        } else if (diceRoll.average > diceRoll.sum) {
          statistics.numberOfDiceRolls.betterThanAverage++;
        } else {
          statistics.numberOfDiceRolls.average++;
        }

        statistics.sumOfAverages += diceRoll.average;
        statistics.sumOfAllRolls += diceRoll.sum;
      });

      return statistics;
    },
  },
  actions: {
    addDiceRoll(input: string) {
      if (input.length === 0) {
        return;
      }
      const inputParts = prepareInputParts(input);

      const diceList = [] as SingleDie[];

      let average = 0,
        sum = 0;

      inputParts.forEach((singlePart) => {
        if (!singlePart.match(/^([+-])$/)) {
          diceList.push(createDiceFromSinglePart(singlePart));
        }
      });

      diceList.forEach((die) => {
        if (die.delimiter === "+") {
          average += die.average;
          sum += die.sum;
        } else if (die.delimiter === "-") {
          average -= die.average;
          sum -= die.sum;
        }
      });

      const date = moment();

      const newDiceRoll: DiceRoll = {
        displayDate: date.format("DD.MM.YYYY HH:mm:ss"),
        key: date.valueOf().toString(),
        display: inputParts.join("&shy;"),
        input: input,
        dice: diceList,
        average: average,
        sum: sum,
      };

      this.diceRolls.unshift(newDiceRoll);
    },
    clearDiceRolls() {
      this.diceRolls = [];
    },
  },
});
