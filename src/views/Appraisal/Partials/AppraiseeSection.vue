<script setup>
const props = defineProps(["appraisee"]);
</script>
<template>
  <section class="max-w-3xl lg:max-w-full">
    <h2 class="text-lg font-semibold">Appraisee</h2>
    <div class="py-8 px-4 bg-white mb-4 rounded-lg">
      <div class="flex flex-col mt-2 gap-4">
        <div class="flex items-center gap-3">
          <p class="font-medium">Name:</p>
          <p class="font-light">{{ props.appraisee?.full_name }}</p>
        </div>
        <div class="flex items-center gap-3">
          <p class="font-medium">Employee No:</p>
          <p class="font-light">{{ props.appraisee?.employee_no }}</p>
        </div>
        <div class="flex items-center gap-3">
          <p class="font-medium">Departments:</p>
          <div>
            <span
              v-for="dept in props.appraisee?.department"
              :key="dept.id"
              class="bg-blue-50 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded mr-2"
            >
              {{ dept.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
