<script setup>
import { useUser } from "@/stores/user";
import { onUnmounted } from "vue";

const props = defineProps(['departments', 'positions', 'roles']);

const userStore = useUser();

onUnmounted(() => {
  userStore.clearSearchForm();
});

</script>
<template>
  <div class="max-w-6xl lg:max-w-full">
    <form @submit.prevent="$emit('search')" novalidate>
      <div class="grid sm:grid-cols-1 sm:gap-6 md:grid-cols-2 md:gap-4">
        <div class="w-full flex items-center mb-4">
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
        <div class="w-full flex items-center mb-4">
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
        <div class="w-full flex items-center mb-2">
          <label for="department" class="block mb-2 text-sm font-medium w-32 text-gray-900 mr-6"
            >Department</label
          >
          <Multiselect
            id="department"
            v-model="userStore.searchForm.department_id"
            :options="props.departments"
            :close-on-select="true"
            :clear-on-select="true"
            :preserve-search="true"
            label="name"
            track-by="name"
            placeholder="Select department"
          >
          </Multiselect>
        </div>
        <div class="w-full flex items-center mb-2">
          <label for="position" class="block mb-2 text-sm font-medium w-32 text-gray-900 mr-6"
            >Position</label
          >
          <Multiselect
            id="position"
            v-model="userStore.searchForm.position_id"
            :options="props.positions"
            :close-on-select="true"
            :clear-on-select="true"
            :preserve-search="true"
            label="name"
            track-by="name"
            placeholder="Select position"
          >
          </Multiselect>
        </div>
        <div class="w-full flex items-center mb-2">
          <label for="role" class="block mb-2 text-sm font-medium w-32 text-gray-900 mr-6"
            >Role</label
          >
          <Multiselect
            id="role"
            v-model="userStore.searchForm.role_id"
            :options="props.roles"
            :close-on-select="true"
            :clear-on-select="true"
            :preserve-search="true"
            label="name"
            track-by="name"
            placeholder="Select role"
          >
          </Multiselect>
        </div>
        <div class="w-full flex items-center mb-2">
          <label for="join_before" class="block mb-2 text-sm font-medium text-gray-900 w-32 mr-6"
            >Join Before</label
          >
          <input
            v-model="userStore.searchForm.join_before"
            type="date"
            name="join_before"
            id="join_before"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          />
        </div>
        <div class="w-full flex items-center mb-2">
          <label for="join_after" class="block mb-2 text-sm font-medium text-gray-900 w-32 mr-6"
            >Join After</label
          >
          <input
            v-model="userStore.searchForm.join_after"
            type="date"
            name="join_after"
            id="join_after"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          />
        </div>
      </div>
      <div class="flex justify-end gap-4 mt-4">
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
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
