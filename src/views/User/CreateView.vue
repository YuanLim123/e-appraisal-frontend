<script setup>
import { useDepartment } from "@/stores/department";
import { useUser } from "@/stores/user";
import { useRole } from "@/stores/role";
import { usePosition } from "@/stores/position";
import { onMounted, ref, watch } from "vue";

const userStore = useUser();
const departmentStore = useDepartment();
const positionStore = usePosition();
const isShow = ref(false);
const roles = ref([]);

onMounted(() => {
  departmentStore.getDepartments();
  positionStore.getPositions();
});

watch(
  () => userStore.form.position_id,
  (newVal) => {
    roles.value = [...newVal.roles];
  },
);
</script>
<template>
  <section>
    <div class="py-4 px-4 mx-auto max-w-2xl">
      <h2 class="mb-4 text-xl font-bold text-gray-900">Add a new User</h2>
      <form action="#">
        <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div class="w-full">
            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900"
              >First Name</label
            >
            <input
              v-model="userStore.form.first_name"
              type="text"
              name="first_name"
              id="first_name"
              required
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
          </div>
          <div class="w-full">
            <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900"
              >Last Name</label
            >
            <input
              v-model="userStore.form.last_name"
              type="text"
              name="last_name"
              id="last_name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
          </div>
          <div>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Email</label>
            <input
              v-model="userStore.form.email"
              type="email"
              name="email"
              id="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
          </div>
          <div>
            <label for="company_email" class="block mb-2 text-sm font-medium text-gray-900"
              >Company Email</label
            >
            <input
              v-model="userStore.form.company_email"
              type="email"
              name="company_email"
              id="company_email"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
          </div>
          <div>
            <label for="phone" class="block mb-2 text-sm font-medium text-gray-900">Phone</label>
            <input
              v-model="userStore.form.phone"
              type="text"
              name="phone"
              id="phone"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
          </div>
          <div>
            <label for="office_phone" class="block mb-2 text-sm font-medium text-gray-900"
              >Office Phone</label
            >
            <input
              v-model="userStore.form.office_phone"
              type="text"
              name="office_phone"
              id="office_phone"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
          </div>
          <div class="w-full">
            <label for="employee_num" class="block mb-2 text-sm font-medium text-gray-900"
              >Employee Number</label
            >
            <input
              v-model="userStore.form.employee_num"
              type="text"
              name="employee_num"
              id="employee_num"
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
              :close-on-select="true"
              :clear-on-select="true"
              :preserve-search="true"
              label="name"
              track-by="name"
              placeholder="Select department"
            >
            </Multiselect>
          </div>
          <div>
            <label for="role" class="block mb-2 text-sm font-medium text-gray-900">Role</label>
            <Multiselect
              id="role"
              v-model="userStore.form.role_id"
              :options="roles"
              :close-on-select="true"
              :clear-on-select="true"
              :preserve-search="true"
              label="name"
              track-by="name"
              placeholder="Select role"
              :disabled="roles.length === 0"
            >
            </Multiselect>
          </div>
          <div>
            <label for="position" class="block mb-2 text-sm font-medium text-gray-900"
              >Position</label
            >
            <Multiselect
              id="position"
              v-model="userStore.form.position_id"
              :options="positionStore.positions"
              :close-on-select="true"
              :clear-on-select="true"
              :preserve-search="true"
              label="name"
              track-by="name"
              placeholder="Select position"
            >
            </Multiselect>
          </div>
          <div>
            <label for="username" class="block mb-2 text-sm font-medium text-gray-900"
              >Username</label
            >
            <input
              v-model="userStore.form.username"
              type="text"
              name="username"
              id="username"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
          </div>
          <div>
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900"
              >Password</label
            >
            <div class="relative">
              <OpenedEyeIcon
                v-show="isShow"
                @click="isShow = !isShow"
                class="absolute inset-y-0 right-0 flex items-center pr-3"
              />
              <ClosedEyeIcon
                v-show="!isShow"
                @click="isShow = !isShow"
                class="absolute inset-y-0 right-0 flex items-center pr-3"
              />

              <input
                v-model="userStore.form.password"
                :type="isShow ? 'text' : 'password'"
                name="password"
                id="password"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              />
            </div>
          </div>
          <div>
            <label for="join_at" class="block mb-2 text-sm font-medium text-gray-900"
              >Join At</label
            >
            <input
              v-model="userStore.form.join_at"
              type="date"
              name="join_at"
              id="join_at"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
          </div>
          <div>
            <p class="block mb-2 text-sm font-medium text-gray-900">Enable Login</p>
            <div class="flex justify-start items-center gap-4">
              <div class="flex items-center gap-2">
                <input type="radio" id="on" :value="true" v-model="userStore.form.login_enabled" />
                <label for="on">On</label>
              </div>
              <div class="flex items-center gap-2">
                <input
                  type="radio"
                  id="off"
                  :value="false"
                  v-model="userStore.form.login_enabled"
                />
                <label for="off">Off</label>
              </div>
            </div>
          </div>
        </div>
        <div class="flex place-content-end mt-4">
          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          >
            Add product
          </button>
        </div>
      </form>
    </div>
  </section>
</template>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
