<script setup>
import { watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useAppraisal } from "@/stores/appraisal";

const store = useAppraisal();
const route = useRoute();

watchEffect(async () => {
  store.getAppraisal(route.params.id);
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <AppraiseeSection :appraisee="store.appraisal?.appraisee" />
    <AppraiserSection :appraiser="store.appraisal?.appraiser" />
  </div>
</template>
