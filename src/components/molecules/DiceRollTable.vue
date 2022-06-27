<script setup>

import { useDiceRollStore } from "../../stores/diceRollStore";

const diceRolls = useDiceRollStore();

</script>

<template>
  <table v-if="diceRolls.allRolls.length">
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
      <td>{{diceRoll.displayDate}}</td>
      <td>{{diceRoll.input}}</td>
      <td>
        <span v-for="singleDie of diceRoll.dice" :key="diceRoll.key + singleDie.input">{{singleDie.delimiter}}{{singleDie.sum}}</span>
      </td>
      <td>{{diceRoll.sum}}</td>
      <td>{{diceRoll.average}}</td>
      <td>
        <button type="button" @click="diceRolls.addDiceRoll(diceRoll.input)">Reroll</button>
      </td>
    </tr>
    </tbody>
  </table>
</template>
