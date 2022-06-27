<script setup>
import { useDiceRollStore } from "../../stores/diceRollStore";

const diceRolls = useDiceRollStore();
</script>

<template>
  <table>
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
    <tr v-for="diceRoll in diceRolls.allRolls" :key="diceRoll.date.toString()">
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    </tbody>
  </table>
</template>
