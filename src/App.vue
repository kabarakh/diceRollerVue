<script setup lang="ts">
import InputForm from "@/components/molecules/InputForm.vue";
import StatisticsTable from "@/components/molecules/StatisticsTable.vue";
import DiceRollTable from "@/components/molecules/DiceRollTable.vue";

import { useDiceRollStore } from "@/stores/diceRollStore";

const diceRolls = useDiceRollStore();
</script>

<template>
  <div class="container">
    <InputForm />
    <div class="mb-2 row">
      <div class="col-12">
        <button class="btn btn-secondary" type="button" @click="diceRolls.clearDiceRolls()">
          Reset table
        </button>
      </div>
    </div>
    <StatisticsTable />
    <DiceRollTable />
  </div>
</template>

<style lang="scss">
@import "./assets/Main.scss";
</style>
