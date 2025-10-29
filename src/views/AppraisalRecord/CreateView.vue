<script setup>
import { useAppraisalRecord } from "@/stores/appraisalRecord";

const appraisalRecordStore = useAppraisalRecord();
</script>

<template>
  <div class="py-4 px-4">
    <h2 class="mb-4 text-xl font-bold text-gray-900">Appraisal record</h2>
    <form class="flex flex-col gap-8" novalidate>
      <div class="w-2xl flex justify-between items-center">
        <p class="text-sm font-medium text-gray-900">Period of Review</p>
        <div class="flex gap-8">
          <div class="flex gap-2 items-center">
            <label for="period_from">From</label>
            <input
              type="date"
              name="period_from"
              id="period_from"
              required
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
          </div>
          <div class="flex gap-2 items-center">
            <label for="period_to">To</label>
            <input
              type="date"
              name="period_to"
              id="period_to"
              required
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
          </div>
        </div>
      </div>
      <div class="w-2xl">
        <p class="mb-2 text-sm font-medium">Purpose of Appraisal</p>
        <div class="flex gap-8">
          <div class="flex items-center gap-2">
            <input type="radio" id="one" value="One" v-model="appraisalRecordStore.form.purpose" />
            <label for="one">Confirmation / Promotion</label>
          </div>
          <div class="flex items-center gap-2">
            <input type="radio" id="two" value="Two" v-model="appraisalRecordStore.form.purpose" />
            <label for="two">Annual Review</label>
          </div>
          <div class="flex items-center gap-2">
            <input
              type="radio"
              id="three"
              value="three"
              v-model="appraisalRecordStore.form.purpose"
            />
            <label for="three">Special Review</label>
          </div>
        </div>
      </div>
      <div>
        <p class="mb-2 text-sm font-medium">SECTION 1</p>
        <div class="overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead class="text-xs text-gray-700 bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3">
                  <p class="font-semibold uppercase">PERFORMANCE GOALS</p>
                  <p class="font-light">List each goal for the performance period</p>
                  <p class="font-light">List the most important goal first</p>
                </th>
                <th scope="col" class="px-6 py-3">PERFORMANCE RESULTS</th>
                <th scope="col" class="px-6 py-3">RATING</th>
                <th scope="col" class="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </form>
  </div>
</template>
