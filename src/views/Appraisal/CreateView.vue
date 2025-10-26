<script setup>
import { useUser } from "@/stores/user";
import { useAppraisal } from "@/stores/appraisal";
import { onMounted, ref } from "vue";

const userStore = useUser();
const appraisalStore = useAppraisal();
const showSelectAppraiseeModal = ref(false);

function openSelectAppraiseeModal() {
  showSelectAppraiseeModal.value = true;
}

function closeSelectAppraiseeModal() {
  showSelectAppraiseeModal.value = false;
}

onMounted(() => {
  userStore.getUsers();
});
</script>
<template>
  <section>
    <div class="py-4 px-4 max-w-2xl">
      <h2 class="mb-4 text-xl font-bold text-gray-900">Add a new Appraisal</h2>
      <form novalidate>
        <div>
          <a
            @click.prevent="openSelectAppraiseeModal"
            href="#"
            class="font-medium text-blue-600 hover:underline dark:text-blue-500"
            >Click here to select appraisee</a
          >
          <ValidationError :errors="userStore.errors" field="appraisee_id" />
        </div>
      </form>
    </div>
  </section>
  <SelectAppraiseeModal
    v-show="showSelectAppraiseeModal"
    :users="userStore.users.data"
    @close="closeSelectAppraiseeModal"
  />
</template>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
