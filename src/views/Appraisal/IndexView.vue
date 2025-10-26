<script setup>
import { onMounted, computed } from "vue";
import { useAppraisal } from "@/stores/appraisal";
import { useRoute, RouterLink } from "vue-router";

const numberOfApproversToShow = 5;
const appraisalStore = useAppraisal();

onMounted(() => {
  appraisalStore.getAppraisals();
});

const hasEmptyRecords = computed(() => {
  return appraisalStore?.appraisals?.data?.length == 0;
});
</script>
<template>
  <div class="flex justify-end mb-4">
    <RouterLink
      :to="{ name: 'appraisals.create' }"
      aria-current="page"
      class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
    >
      Add Appraisal
    </RouterLink>
  </div>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div v-show="appraisalStore.loading" class="absolute inset-0 flex items-center justify-center">
      <pulse-loader :loading="appraisalStore.loading"></pulse-loader>
    </div>
    <table class="w-full text-sm text-left rtl:text-right text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-3">Appraisee</th>
          <th scope="col" class="px-6 py-3">Appraiser</th>
          <th scope="col" class="px-6 py-3 w-5xl">Approvers</th>
          <th scope="col" class="px-6 py-3">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="hasEmptyRecords">
          <td colspan="4" class="text-center px-3 py-4 text-gray-500">No records found.</td>
        </tr>
        <tr
          v-for="appraisal in appraisalStore.appraisals.data"
          :key="appraisal.id"
          class="odd:bg-white even:bg-gray-50 border-b border-gray-200"
        >
          <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
            <div class="flex flex-col">
              <p>{{ appraisal.appraisee?.full_name }}</p>
              <p class="text-sm text-gray-500">#{{ appraisal.appraisee?.employee_no }}</p>
              <div>
                <span
                  v-for="dept in appraisal.appraisee?.department"
                  :key="dept.id"
                  class="bg-gray-100 text-xs font-medium px-2.5 py-0.5 rounded mr-2"
                >
                  {{ dept.name }}
                </span>
              </div>
            </div>
          </td>
          <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
            <div class="flex flex-col">
              <p>{{ appraisal.appraiser?.full_name }}</p>
              <p class="text-sm text-gray-500">#{{ appraisal.appraiser?.employee_no }}</p>
            </div>
          </td>
          <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
            <div
              v-if="appraisal.approvers.length > numberOfApproversToShow"
              class="flex flex-wrap gap-4"
            >
              <div
                v-for="approver in appraisal.approvers.slice(0, numberOfApproversToShow)"
                :key="approver.id"
              >
                <div class="flex flex-col bg-gray-100 p-2 rounded">
                  <p>{{ approver.user?.full_name }}</p>
                  <p class="text-sm text-gray-500">#{{ approver.user?.employee_no }}</p>
                </div>
              </div>
              <p class="text-sm text-gray-500 mt-3">
                +{{ appraisal.approvers.length - numberOfApproversToShow }} more
              </p>
            </div>

            <div v-else class="flex flex-wrap gap-4">
              <div v-for="approver in appraisal.approvers" :key="approver.id">
                <div class="flex flex-col bg-gray-100 p-2 rounded">
                  <p>{{ approver.user?.full_name }}</p>
                  <p class="text-sm text-gray-500">#{{ approver.user?.employee_no }}</p>
                </div>
              </div>
            </div>
          </td>
          <td class="px-6 py-4">
            <RouterLink
              :to="{ name: 'appraisals.show', params: { id: appraisal.id } }"
              class="font-medium text-blue-600"
            >
              Edit
            </RouterLink>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
