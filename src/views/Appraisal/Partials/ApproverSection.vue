<script setup>
const props = defineProps(["approvers"]);
</script>
<template>
  <section class="lg:max-w-full">
    <h2 class="text-lg font-semibold">Approver Flows</h2>
    <div class="py-4 px-4 bg-white mb-4 rounded-lg flex flex-wrap gap-4">
      <div
        class="flex flex-col basis-xs mt-2 gap-4 bg-gray-100 p-2 rounded"
        v-for="(approver) in props.approvers"
        :key="approver.id"
      >
        <p class="text-md font-semibold">{{ approver.sequence + '.'}}</p>
        <p class="font-medium">{{ approver.user.full_name }}</p>
        <p class="font-medium">{{ approver.user.employee_no }}</p>
      </div>
    </div>
  </section>
</template>
