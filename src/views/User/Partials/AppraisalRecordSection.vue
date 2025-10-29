<script setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps(['appraisalRecords', 'user']);

const hasEmptyRecords = computed(() => {
  return !props.appraisalRecords || props.appraisalRecords.length === 0;
});

</script>
<template>
  <section class="bg-white py-4 px-4 max-w-3xl">
    <div class="flex justify-between mb-2">
      <h2>Appraisal Record</h2>
      <RouterLink
        :to="{ name: 'appraisalRecord.create', params: { id: user?.id } }"
        class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
      >
        Add
      </RouterLink>
    </div>
    <table class="w-full text-sm text-left rtl:text-right">
      <thead class="text-xs text-gray-700 uppercase bg-gray-100">
        <tr>
          <th scope="col" class="px-3 py-3">Type</th>
          <th scope="col" class="px-3 py-3">Status</th>
          <th scope="col" class="px-3 py-3">Purpose</th>
          <th scope="col" class="px-3 py-3">Review By</th>
          <th scope="col" class="px-3 py-3">Current Approver</th>
          <th scope="col" class="px-3 py-3">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="hasEmptyRecords">
          <td colspan="6" class="text-center px-3 py-4 text-gray-500">
            No appraisal records found.
          </td>
        </tr>
        <tr
          v-for="record in props.appraisalRecords "
          :key="record.id"
          class="odd:bg-white even:bg-gray-50 border-b border-gray-200"
        >
          <th scope="row" class="px-3 py-4 font-medium text-gray-900 whitespace-nowrap">
            {{ record?.type }}
          </th>
          <td class="px-3 py-4">{{ record?.status }}</td>
          <td class="px-3 py-4">{{ record?.purpose }}</td>
          <td class="px-3 py-4">{{ record?.appraiser }}</td>
          <td class="px-3 py-4">{{ record?.current_approver }}</td>
          <td class="px-3 py-4">View</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
