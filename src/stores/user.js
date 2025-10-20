import { reactive, ref } from "vue";
import { defineStore } from "pinia";

export const useUser = defineStore("user", () => {
  const errors = reactive({});
  const loading = ref(false);
  const users = ref([]);
  const form = reactive({
    plate_number: "",
    description: "",
  });

  function resetForm() {
    form.plate_number = "";
    form.description = "";

    errors.value = {};
  }

  function getUsers(page = 1) {
    return window.axios.get("users", { params: { page } }).then((response) => {
      console.log(response.data)
      users.value = response.data;
      return response.data;
    });
  }

  return {
    form,
    errors,
    loading,
    users,
    resetForm,
    getUsers,
  };
});
