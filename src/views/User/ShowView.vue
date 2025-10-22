<script setup>
import { watchEffect, onBeforeUnmount } from "vue";
import { useUser } from "@/stores/user";
import { useRoute } from "vue-router";
const store = useUser();
const route = useRoute();

watchEffect(async () => {
  store.getUser(route.params.id);
});

onBeforeUnmount(store.resetUser);
</script>
<template>
  <section class="bg-white mb-4">
    <div v-show="store.loading" class="absolute inset-0 flex items-center justify-center">
      <pulse-loader :loading="store.loading"></pulse-loader>
    </div>
    <div class="flex justify-around">
      <div class="py-8 px-4 max-w-2xl">
      <h2 class="mb-2 text-xl font-semibold leading-none text-gray-900 md:text-2xl">
        {{ store.user?.full_name }}
      </h2>
      <div class="grid grid-rows-4 grid-cols-2 mt-4 gap-4">
          <div class="flex items-center gap-3">
            <p class="font-medium">Employee No:</p>
            <p class="font-light">{{ store.user?.employee_no }}</p>
          </div>
          <div class="flex items-center gap-3">
            <p class="font-medium">Employee Number:</p>
            <p class="font-light">{{ store.user?.employee_no }}</p>
          </div>
          <div class="flex items-center gap-3">
            <p class="font-medium">Email:</p>
            <p class="font-light">{{ store.user?.email }}</p>
          </div>
          <div class="flex items-center gap-3">
            <p class="font-medium">Phone:</p>
            <p class="font-light">{{ store.user?.phone }}</p>
          </div>
          <div class="flex items-center gap-3">
            <p class="font-medium">Departments:</p>
            <div>
                <span 
                  v-for="dept in store.user?.department" 
                  :key="dept.id"
                  class="bg-blue-50 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded mr-2">
                  {{ dept.name }}
                </span>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <p class="font-medium">Role:</p>
            <p class="font-light">{{ store.user?.role.name }}</p>
          </div>
      </div>
      <div class="flex items-center space-x-4">
        <button
          type="button"
          class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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
        </button>
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
      </div>
      <div class="flex items-center justify-center p-4">
        <img class="max-w-md max-h-32 hidden md:block" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/cta/cta-dashboard-mockup-dark.svg" alt="dashboard image">
      </div>
    </div>
  </section>      
  <AppraisalRecordSection />
</template>
