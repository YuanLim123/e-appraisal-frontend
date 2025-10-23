<script setup>
import { onMounted, computed } from "vue";
import { useUser } from "@/stores/user";
import { RouterLink } from "vue-router";
import UserSearch from "@/components/UserSearch.vue";

const store = useUser();

onMounted(() => {
  store.getUsers();
});

const hasEmptyRecords = computed(() => {
  return store?.users?.data?.length == 0;
});
</script>
<template>
  <div class="flex justify-end rounded-md mb-4">
    <RouterLink
      :to="{ name: 'users.create' }"
      aria-current="page"
      class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
    >
      Add User
    </RouterLink>
    <a
      href="#"
      class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
    >
      Import Users
    </a>
  </div>
  <section class="bg-gray-100 mb-4 rounded-lg">
    <div class="py-8 px-4">
      <UserSearch />
    </div>
  </section>

  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <div v-show="store.loading" class="absolute inset-0 flex items-center justify-center">
      <pulse-loader :loading="store.loading"></pulse-loader>
    </div>
    <table class="w-full text-sm text-left rtl:text-right text-gray-500">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-3">Full Name</th>
          <th scope="col" class="px-6 py-3">Department</th>
          <th scope="col" class="px-6 py-3">Employee No</th>
          <th scope="col" class="px-6 py-3">Join Date</th>
          <th scope="col" class="px-6 py-3">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="hasEmptyRecords">
          <td colspan="5" class="text-center px-3 py-4 text-gray-500">
            No user records found.
          </td>
        </tr>
        <tr
          v-for="user in store.users.data"
          :key="user.id"
          class="odd:bg-white even:bg-gray-50 border-b border-gray-200"
        >
          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
            {{ user.full_name }}
          </th>
          <td class="px-6 py-4">
            <span v-for="dept in user.department" :key="dept.id" class="text-xs font-semibold mr-2">
              {{ dept.name }}
            </span>
          </td>
          <td class="px-6 py-4">{{ user.employee_no }}</td>
          <td class="px-6 py-4">{{ user.join_at }}</td>
          <td class="px-6 py-4">
            <RouterLink
              :to="{ name: 'users.show', params: { id: user.id } }"
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >Edit</RouterLink
            >
          </td>
        </tr>
      </tbody>
    </table>
    <TailwindPagination
      :data="store.users"
      :limit="2"
      @pagination-change-page="store.getUsers"
      class="mt-4"
    />
  </div>
</template>
