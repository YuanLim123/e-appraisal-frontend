<script setup>
import { watchEffect } from "vue";
import { useRoute, RouterLink } from "vue-router";
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
    <div class="flex items-center justify-end gap-4">
      <RouterLink
        class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        id="updateProductButton"
        :to="{ name: 'appraisals.edit', params: { id: appraisalStore.appraisal?.id } }"
      >
        <svg
          aria-hidden="true"
          class="mr-1 -ml-1 w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
          ></path>
          <path
            fill-rule="evenodd"
            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
            clip-rule="evenodd"
          ></path>
        </svg>
        Edit
      </RouterLink>
      <button
        type="button"
        class="inline-flex items-center text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        <svg
          aria-hidden="true"
          class="w-5 h-5 mr-1.5 -ml-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clip-rule="evenodd"
          ></path>
        </svg>
        Delete
      </button>
    </div>
    <AppraiseeSection :appraisee="appraisalStore.appraisal?.appraisee" />
    <AppraiserSection :appraiser="appraisalStore.appraisal?.appraiser" />
    <ApproverSection :approvers="appraisalStore.appraisal?.approvers" />
  </div>
</template>
