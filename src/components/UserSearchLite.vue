<script setup>
import { useUser } from "@/stores/user";
import { onUnmounted } from "vue";

const userStore = useUser();

onUnmounted(() => {
  userStore.clearSearchForm();
});

function handleSearch() {
  userStore.getUsers();
}
</script>
<template>
  <div class="max-w-6xl lg:max-w-full">
    <form @submit.prevent="handleSearch" novalidate>
      <div class="grid sm:grid-cols-1 sm:gap-6 md:grid-cols-2 md:gap-4">
        <div class="w-full flex items-center">
          <label for="name" class="block mb-2 text-sm font-medium w-32 text-gray-900 mr-6"
            >Name</label
          >
          <input
            v-model="userStore.searchForm.name"
            type="text"
            name="name"
            id="name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          />
        </div>
        <div class="w-full flex items-center">
          <label for="employee_no" class="block mb-2 text-sm font-medium w-32 text-gray-900 mr-6"
            >Employee No</label
          >
          <input
            v-model="userStore.searchForm.employee_no"
            type="text"
            name="employee_no"
            id="employee_no"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          />
        </div>
      </div>
      <div class="flex justify-end gap-4 mt-2 mb-2">
        <button
          @click="userStore.clearSearchForm"
          type="button"
          class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Clear
        </button>
        <button
          type="submit"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Search
        </button>
      </div>
    </form>
  </div>
</template>
