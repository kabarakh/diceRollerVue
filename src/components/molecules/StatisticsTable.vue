<script setup>
import { useDiceRollStore } from "../../stores/diceRollStore";
import { ref } from "vue";

const diceRolls = useDiceRollStore();

const displayTable = ref(false);

function toggleTable() {
  displayTable.value = !displayTable.value;
}
</script>

<template>
  <button class="btn btn-outline-secondary mb-2" @click="toggleTable">
    Toggle statistics
  </button>

  <div class="table-responsive mb-2" v-if="displayTable">
    <table class="table">
      <tr>
        <th>Rolls total</th>
        <td>{{diceRolls.statistics.numberOfDiceRolls.total}}</td>
      </tr>
      <tr>
        <th>Rolls better than average</th>
        <td class="table-success">{{diceRolls.statistics.numberOfDiceRolls.betterThanAverage}}</td>
      </tr>
      <tr>
        <th>Rolls equal to average</th>
        <td class="table-success">{{diceRolls.statistics.numberOfDiceRolls.average}}</td>
      </tr>
      <tr>
        <th>Rolls worse than average</th>
        <td class="table-success">{{diceRolls.statistics.numberOfDiceRolls.worseThanAverage}}</td>
      </tr>
      <tr>
        <th>Sum of all rolls</th>
        <td>{{diceRolls.statistics.sumOfAllRolls}} (Sum of averages: {{diceRolls.statistics.sumOfAverages}})</td>
      </tr>
    </table>
  </div>
</template>
