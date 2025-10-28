<script setup>
import { watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useAppraisal } from "@/stores/appraisal";

const appraisalStore = useAppraisal();
const route = useRoute();

watchEffect(async () => {
  appraisalStore.getAppraisal(route.params.id);
});
</script>

<template>
  <div class="flex flex-col gap-8">
    <div v-show="appraisalStore.loading" class="absolute inset-0 flex items-center justify-center">
      <pulse-loader :loading="appraisalStore.loading"></pulse-loader>
    </div>
    <AppraiseeSection :appraisee="appraisalStore.appraisal?.appraisee" />
    <AppraiserSection :appraiser="appraisalStore.appraisal?.appraiser" />
    <ApproverSection :approvers="appraisalStore.appraisal?.approvers" />
  </div>
</template>
