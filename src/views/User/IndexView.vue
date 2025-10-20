<script setup>
import { onMounted } from "vue";
import { useUser } from "@/stores/user";

const store = useUser();

onMounted(() => {
  store.getUsers();
});
</script>
<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
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
        <tr
          v-for="user in store.users.data"
          :key="user.id"
          class="odd:bg-white even:bg-gray-50 border-b border-gray-200"
        >
          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
            {{ user.full_name }}
          </th>
          <td class="px-6 py-4">
            <span 
              v-for="dept in user.department" 
              :key="dept.id"
              class="text-xs font-semibold mr-2">
              {{ dept.name }}
            </span>
          </td>
          <td class="px-6 py-4">{{ user.employee_no }}</td>
          <td class="px-6 py-4">{{ user.join_at }}</td>
          <td class="px-6 py-4">
            <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >Edit</a
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
