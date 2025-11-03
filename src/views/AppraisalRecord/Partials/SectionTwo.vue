<script setup>
import { useAppraisalRecord } from "@/stores/appraisalRecord";

const props = defineProps(["question"]);

const appraisalRecordStore = useAppraisalRecord();
</script>
<template>
  <div>
    <p class="mb-2 text-sm font-medium">SECTION II</p>
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead class="text-xs text-gray-700 bg-gray-50">
          <tr>
            <th scope="col" class="border px-6 py-3 w-xl uppercase">
              QUALITIES AFFECTING PERFORMANCE
            </th>
            <th scope="col" class="border px-6 py-3 uppercase">RATING</th>
            <th scope="col" class="border px-6 py-3 uppercase">COMMENTS</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(ques, idx) in props.question"
            :key="idx"
            class="odd:bg-white even:bg-gray-50 border-b border-gray-200"
          >
            <td class="border">
              <div class="p-2">
                <p class="font-medium underline">
                  <span class="inline-block italic text-xs font-light mr-1">{{ idx + 1 }}</span>
                  {{ ques.title }}
                </p>

                <p class="font-light text-sm">{{ ques.subtitle }}</p>
              </div>
            </td>
            <td class="border">
              <div class="flex justify-around">
                <div>
                  <input
                    type="radio"
                    id="one"
                    value="1"
                    v-model="appraisalRecordStore.form.section_two_answers[idx].rating"
                  />
                  <label for="one">1</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="two"
                    value="2"
                    v-model="appraisalRecordStore.form.section_two_answers[idx].rating"
                  />
                  <label for="two">2</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="three"
                    value="3"
                    v-model="appraisalRecordStore.form.section_two_answers[idx].rating"
                  />
                  <label for="three">3</label>
                </div>

                <div>
                  <input
                    type="radio"
                    id="four"
                    value="4"
                    v-model="appraisalRecordStore.form.section_two_answers[idx].rating"
                  />
                  <label for="four">4</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="five"
                    value="5"
                    v-model="appraisalRecordStore.form.section_two_answers[idx].rating"
                  />
                  <label for="five">5</label>
                </div>
              </div>
            </td>
            <td class="border">
              <textarea
                type="text"
                class="table-input"
                v-model="appraisalRecordStore.form.section_two_answers[idx].comment"
              ></textarea>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="flex justify-between">
        <p>Points awarded: {{ appraisalRecordStore.form.score_for_section_two }}</p>
        <p>Total Attainable: {{ appraisalRecordStore.total_points_attainable_for_section_two }}</p>
        <p>Score II Percentage: {{ appraisalRecordStore.form.score_percentage_for_section_two }}</p>
      </div>
    </div>
  </div>
</template>
