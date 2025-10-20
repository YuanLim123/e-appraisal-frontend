<script setup>
import { useDepartment } from "@/stores/department";
import { useUser } from "@/stores/user";
import { useRole } from "@/stores/role";
import { onMounted } from "vue";

const userStore = useUser();
const departmentStore = useDepartment();
const roleStore = useRole();

onMounted(() => {
  departmentStore.getDepartments();
  roleStore.getRoles();
});
</script>
<template>
  <section>
    <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
      <h2 class="mb-4 text-xl font-bold text-gray-900">Add a new User</h2>
      <form action="#">
        <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div class="w-full">
            <label for="first-name" class="block mb-2 text-sm font-medium text-gray-900"
              >First Name</label
            >
            <input
              v-model="userStore.form.first_name"
              type="text"
              name="first-name"
              id="first-name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
          </div>
          <div class="w-full">
            <label for="last-name" class="block mb-2 text-sm font-medium text-gray-900"
              >Last Name</label
            >
            <input
              v-model="userStore.form.last_name"
              type="text"
              name="last-name"
              id="last-name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
          </div>
          <div class="w-full">
            <label for="employee-no" class="block mb-2 text-sm font-medium text-gray-900"
              >Employee No.</label
            >
            <input
              v-model="userStore.form.employee_no"
              type="text"
              name="employee-no"
              id="employee-no"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
          </div>
          <div>
            <label for="department" class="block mb-2 text-sm font-medium text-gray-900"
              >Department</label
            >
            <Multiselect
              id="department"
              v-model="userStore.form.departments"
              :options="departmentStore.departments"
              :multiple="true"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              label="name"
              track-by="name"
              placeholder="Select departments"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
            >
            </Multiselect>
          </div>
          <div>
            <label for="role" class="block mb-2 text-sm font-medium text-gray-900">Role</label>
            <Multiselect
              id="role"
              v-model="userStore.form.role_id"
              :options="roleStore.roles"
              :close-on-select="false"
              :clear-on-select="false"
              :preserve-search="true"
              label="name"
              track-by="name"
              placeholder="Select role"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
            >
            </Multiselect>
          </div>
          <div>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900"
              >Email</label
            >
            <input
              v-model="userStore.form.email"
              type="email"
              name="email"
              id="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
          </div>
          <div>
            <label for="item-weight" class="block mb-2 text-sm font-medium text-gray-900"
              >Item Weight (kg)</label
            >
            <input
              type="number"
              name="item-weight"
              id="item-weight"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="12"
            />
          </div>
          <div class="sm:col-span-2">
            <label for="description" class="block mb-2 text-sm font-medium text-gray-900"
              >Description</label
            >
            <textarea
              id="description"
              rows="8"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Your description here"
            ></textarea>
          </div>
        </div>
        <button
          type="submit"
          class="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 hover:bg-primary-800"
        >
          Add product
        </button>
      </form>
    </div>
  </section>
</template>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
