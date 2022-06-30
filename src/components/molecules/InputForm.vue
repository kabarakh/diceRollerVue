<script setup>
import { ref, watch } from "vue";
import { useDiceRollStore } from "@/stores/diceRollStore";
import ValidationError from "@/components/molecules/ValidationError.vue";

const diceRolls = useDiceRollStore();
const inputString = ref("");
const dirty = ref(false);
const validationError = ref("");

function resetInput() {
  inputString.value = "";
  dirty.value = false;
  validationError.value = "";
}

watch(inputString, (currentInputString) => {
  if (currentInputString.length) {
    dirty.value = true;
  }
  if (dirty.value) {
    if (!currentInputString.length) {
      validationError.value = "required";
    } else if (/^[+-]?[\d]*(d|w)?[\d]([+-]?[\d]*(d|w)?[\d])*$/.test(currentInputString) === false) {
      validationError.value = "pattern";
    } else {
      validationError.value = "";
    }
  }
});
</script>

<template>
  <h2>Type in your dice roll</h2>
  <div class="alert alert-info">
    You can use [count]d[type] or [count]w[type] and add or subtract dice or
    modifiers
  </div>
  <ValidationError :validation-error="validationError" />
  <form
    class="row justify-content-center"
    @submit.prevent="diceRolls.addDiceRoll(inputString)"
  >
    <div class="col-lg-8 col-12 mb-2">
      <input
        v-model="inputString"
        id="dice-input"
        autocomplete="off"
        name="dice-input"
        class="form-control"
      />
    </div>
    <div class="col-lg-4 col-12 row roll-buttons">
      <div class="col-sm-6 col mb-2">
        <input
          class="btn btn-primary"
          type="submit"
          value="Submit"
          :disabled="inputString.length === 0 || validationError.length > 0"
        />
      </div>
      <div class="col-sm-6 col-12 mb-2">
        <button type="button" class="btn btn-secondary" @click="resetInput">
          Reset input
        </button>
      </div>
    </div>
  </form>
</template>
