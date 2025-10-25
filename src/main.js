import "@/bootstrap.js";
import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import ValidationError from "@/components/ValidationError.vue";
import IconSpinner from "@/components/IconSpinner.vue";
import AlertMessage from "@/components/AlertMessage.vue";
import { TailwindPagination } from "laravel-vue-pagination";
import Multiselect from "vue-multiselect";
import OpenedEyeIcon from "@/components/OpenedEyeIcon.vue";
import ClosedEyeIcon from "@/components/ClosedEyeIcon.vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import AppraisalRecordSection from "@/views/User/Partials/AppraisalRecordSection.vue";
import UserSearch from "@/components/UserSearch.vue";
import AppraiseeSection from "@/views/Appraisal/Partials/AppraiseeSection.vue";
import AppraiserSection from "@/views/Appraisal/Partials/AppraiserSection.vue";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.component("ValidationError", ValidationError);
app.component("IconSpinner", IconSpinner);
app.component("AlertMessage", AlertMessage);
app.component("TailwindPagination", TailwindPagination);
app.component("Multiselect", Multiselect);
app.component("OpenedEyeIcon", OpenedEyeIcon);
app.component("ClosedEyeIcon", ClosedEyeIcon);
app.component("pulse-loader", PulseLoader);
app.component("AppraisalRecordSection", AppraisalRecordSection);
app.component("UserSearch", UserSearch);
app.component("AppraiseeSection", AppraiseeSection);
app.component("AppraiserSection", AppraiserSection);

app.mount("#app");
