<script setup>
import { useUser } from "@/stores/user";
import { useAppraisal } from "@/stores/appraisal";
import { onMounted, ref, onUnmounted } from "vue";

const userStore = useUser();
const appraisalStore = useAppraisal();
const showSelectAppraiseeModal = ref(false);
const showSelectAppraiserModal = ref(false);
const showSelectApproverModal = ref(false);

function openSelectAppraiseeModal() {
  showSelectAppraiseeModal.value = true;
}

function closeSelectAppraiseeModal() {
  showSelectAppraiseeModal.value = false;
}

function openSelectAppraiserModal() {
  showSelectAppraiserModal.value = true;
}

function closeSelectAppraiserModal() {
  showSelectAppraiserModal.value = false;
}

function openSelectApproverModal() {
  showSelectApproverModal.value = true;
}

function closeSelectApproverModal() {
  showSelectApproverModal.value = false;
}

function selectAppraisee(user) {
  appraisalStore.setAppraisee(user);
  closeSelectAppraiseeModal();
}

function selectAppraiser(user) {
  appraisalStore.setAppraiser(user);
  closeSelectAppraiserModal();
}

function selectApprover(user) {
  appraisalStore.addApprover(user);
  closeSelectApproverModal();
}

function removeApprover(user) {
  appraisalStore.removeApprover(user);
}

function removeAppraisee() {
  appraisalStore.removeAppraisee();
}

function removeAppraiser() {
  appraisalStore.removeAppraiser();
}

onMounted(() => {
  userStore.getUsers();
});

onMounted(() => {
  appraisalStore.resetForm();
});

</script>
<template>
  <section>
    <div class="py-4 px-4 max-w-5xl">
      <h2 class="mb-4 text-xl font-bold text-gray-900">Add a new Appraisal</h2>
      <form @submit.prevent="appraisalStore.addAppraisal" novalidate>
        <div class="flex flex-col mb-8">
          <div>
            <button
              @click.prevent="openSelectAppraiseeModal"
              href="#"
              class="font-medium text-blue-600 hover:underline"
            >
              Click here to select appraisee
            </button>
            <ValidationError :errors="appraisalStore.errors" field="appraisee_id" />
          </div>
          <UserCard
            :user="appraisalStore.form.appraisee"
            label="Appraisee"
            @remove="removeAppraisee"
          />
        </div>
        <div class="flex flex-col mb-8">
          <div>
            <button
              @click.prevent="openSelectAppraiserModal"
              href="#"
              class="font-medium text-blue-600 hover:underline"
            >
              Click here to select appraiser
            </button>
            <ValidationError :errors="appraisalStore.errors" field="appraiser_id" />
          </div>
          <UserCard
            :user="appraisalStore.form.appraiser"
            label="Appraiser"
            @remove="removeAppraiser"
          />
        </div>
        <div class="flex flex-col mb-8">
          <div>
            <button
              @click.prevent="openSelectApproverModal"
              href="#"
              class="font-medium text-blue-600 hover:underline"
            >
              Click here to select approvers
            </button>
            <ValidationError :errors="appraisalStore.errors" field="approvers" />
          </div>
          <p class="font-medium text-md">Approver Flow:</p>
          <div class="mb-4 not-visited:flex flex-wrap gap-4">
            <ApproverCard
              v-for="(approver, idx) in appraisalStore.form.approvers_temp"
              :key="approver.id"
              :user="approver"
              :step="idx + 1"
              @remove="removeApprover"
            />
          </div>
        </div>
        <div class="flex place-content-end mt-4">
          <button
            type="button"
            :disabled="appraisalStore.loading"
            class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="appraisalStore.loading"
            class="flex justify-center gap-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          >
            <IconSpinner v-show="appraisalStore.loading" />
            Add Appraisal
          </button>
        </div>
      </form>
    </div>
  </section>
  <SelectAppraiseeModal
    v-show="showSelectAppraiseeModal"
    :users="userStore.users.data"
    @close="closeSelectAppraiseeModal"
    @select="selectAppraisee"
  />
  <SelectAppraiserModal
    v-show="showSelectAppraiserModal"
    :users="userStore.users.data"
    @close="closeSelectAppraiserModal"
    @select="selectAppraiser"
  />
  <SelectApproverModal
    v-show="showSelectApproverModal"
    :users="userStore.users.data"
    @close="closeSelectApproverModal"
    @select="selectApprover"
  />
</template>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
