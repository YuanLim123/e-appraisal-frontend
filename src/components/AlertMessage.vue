<script setup>
import { defineProps } from "vue";
const props = defineProps(["errors"]);
</script>

<template>
  <div
    v-if="props?.errors?.value?.length"
    class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
    role="alert"
  >
    <span class="font-medium">{{ props.errors.value }}</span>
  </div>
</template>
