<script setup>
import { ref, watch } from "vue";
import { useDiceRollStore } from "@/stores/diceRollStore";

const diceRolls = useDiceRollStore();
const inputString = ref("");
const dirty = ref(false);
const validationError = ref("");

function resetInput() {
  console.log("reset");

  this.inputString.value = "";
  this.inputStringdirty.value = false;
  this.inputStringvalidationError.value = "";
};

watch(inputString, (currentInputString) => {
  console.log("watch", currentInputString);
  if (currentInputString.length) {
    dirty.value = true;
  }
  if (dirty.value) {
    if (!currentInputString.length) {
      validationError.value = 'required';
    } else if (/^[a-zA-Z]+$/.test(currentInputString) === false) {
      validationError.value = 'pattern';
    } else {
      validationError.value = '';
    }
  }
});
</script>

<template>
  <h2>Type in your dice roll</h2>
  <div class="alert alert-info">You can use [count]d[type] or [count]w[type] and add or subtract dice or modifiers</div>
  <div class="alert alert-danger">

    <div>
      Some input is required.
    </div>
    <div>
      Invalid input.
    </div>
  </div>
  <form class="row justify-content-center" @submit.prevent="diceRolls.addDiceRoll(inputString)">
    <div class="col-lg-8 col-12 mb-2">
      <input
        v-model="inputString"
        @keydown="validateInput"
        id="dice-input"
        autocomplete="off"
        name="dice-input"
        class="form-control"
      />
    </div>
    <div class="col-lg-4 col-12 row roll-buttons">
      <div class="col-sm-6 col mb-2">
        <input class="btn btn-primary" type="submit" value="Submit" />
      </div>
      <div class="col-sm-6 col-12 mb-2">
        <button type="button" class="btn btn-secondary" @click="resetInput">Reset input</button>
      </div>
    </div>
  </form>
</template>
