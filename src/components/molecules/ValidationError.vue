<script setup lang="ts">
const props = defineProps<{
  validationError: string;
}>();
</script>

<template>
  <div v-if="validationError" class="alert alert-danger">
    <div>
      Some input is required.
    </div>
    <div>
      Invalid input.
    </div>
  </div>
</template>
