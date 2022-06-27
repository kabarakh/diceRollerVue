<script setup lang="ts">
const props = defineProps<{
  validationError: string;
}>();

const availableErrors: {[index: string]: string} = {
  pattern: "Invalid input.",
  required: "Some input is required.",
};
</script>

<template>
  <div v-if="validationError" class="alert alert-danger">
    {{ availableErrors[props.validationError] || "" }}
  </div>
</template>
