<script setup>
import { useUser } from "@/stores/user";
import { useAppraisal } from "@/stores/appraisal";
import { onMounted, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const userStore = useUser();
const appraisalStore = useAppraisal();
const showSelectAppraiserModal = ref(false);
const showSelectApproverModal = ref(false);

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

function removeAppraiser() {
  appraisalStore.removeAppraiser();
}

onMounted(() => {
  userStore.getUsers();
});

onMounted(() => {
  appraisalStore.resetForm();
});

watchEffect(() => {
  appraisalStore.getAppraisal(route.params.id);
});
</script>
<template>
  <section>
    <div class="py-4 px-4 max-w-5xl">
      <div
        v-show="appraisalStore.loading"
        class="absolute inset-0 flex items-center justify-center"
      >
        <pulse-loader :loading="appraisalStore.loading"></pulse-loader>
      </div>
      <AlertMessage :errors="appraisalStore.errors" @closeAlert="appraisalStore.resetError" />
      <h2 class="mb-4 text-xl font-bold text-gray-900">
        Edit Appraisal for {{ appraisalStore.appraisal?.appraisee?.full_name }}
      </h2>
      <form @submit.prevent="appraisalStore.updateAppraisal({ id: route.params.id })" novalidate>
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
            Update
          </button>
        </div>
      </form>
    </div>
  </section>
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
