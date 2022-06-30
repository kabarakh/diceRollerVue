<script setup>
import { useDiceRollStore } from "@/stores/diceRollStore";

const diceRolls = useDiceRollStore();
</script>

<template>
  <table class="table table-responsive" v-if="diceRolls.allRolls.length">
    <thead>
      <tr>
        <th>Date</th>
        <th>Input</th>
        <th>Dice results</th>
        <th>Sum</th>
        <th>Average</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="diceRoll in diceRolls.allRolls" :key="diceRoll.key">
        <td>{{ diceRoll.displayDate }}</td>
        <td v-html="diceRoll.display"></td>
        <td>
          <span
            v-for="singleDie of diceRoll.dice"
            :key="diceRoll.key + singleDie.input"
          >
            {{ singleDie.delimiter }}{{ singleDie.sum }}&shy;
          </span>
        </td>
        <td
          :class="{
            'rolls-average': diceRoll.sum === diceRoll.average,
            'rolls-better': diceRoll.sum > diceRoll.average,
            'rolls-worse': diceRoll.sum < diceRoll.average,
          }"
        >
          {{ diceRoll.sum }}
        </td>
        <td
          :class="{
            'rolls-average': diceRoll.sum === diceRoll.average,
            'rolls-better': diceRoll.sum > diceRoll.average,
            'rolls-worse': diceRoll.sum < diceRoll.average,
          }"
        >
          {{ diceRoll.average }}
        </td>
        <td>
          <button
            type="button"
            @click="diceRolls.addDiceRoll(diceRoll.input)"
            class="btn btn-primary"
          >
            Reroll
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
