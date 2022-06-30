<script setup>
import { useDiceRollStore } from "@/stores/diceRollStore";
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
    <table class="table-responsive table">
      <tr>
        <th>Rolls total</th>
        <td>{{ diceRolls.statistics.numberOfDiceRolls.total }}</td>
      </tr>
      <tr class="rolls-better">
        <th>Rolls better than average</th>
        <td class="table-success">
          {{ diceRolls.statistics.numberOfDiceRolls.betterThanAverage }}
        </td>
      </tr>
      <tr class="rolls-average">
        <th>Rolls equal to average</th>
        <td class="table-success">
          {{ diceRolls.statistics.numberOfDiceRolls.average }}
        </td>
      </tr>
      <tr class="rolls-worse">
        <th>Rolls worse than average</th>
        <td class="table-success">
          {{ diceRolls.statistics.numberOfDiceRolls.worseThanAverage }}
        </td>
      </tr>
      <tr>
        <th>Sum of all rolls</th>
        <td
          :class="{
            'rolls-average': diceRolls.statistics.sumOfAllRolls === diceRolls.statistics.sumOfAverages,
            'rolls-better': diceRolls.statistics.sumOfAllRolls > diceRolls.statistics.sumOfAverages,
            'rolls-worse': diceRolls.statistics.sumOfAllRolls < diceRolls.statistics.sumOfAverages,
          }"
        >
          {{ diceRolls.statistics.sumOfAllRolls }} (Sum of averages: {{ diceRolls.statistics.sumOfAverages }})
        </td>
      </tr>
    </table>
  </div>
</template>
