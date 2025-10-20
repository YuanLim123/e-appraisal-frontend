import { reactive, ref } from "vue";
import { defineStore } from "pinia";

export const useUser = defineStore("user", () => {
  const errors = reactive({});
  const loading = ref(false);
  const users = ref([]);
  const form = reactive({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
    join_at: "",
    role_id: "",
    departments: [],
  });

  function resetForm() {
    form.first_name = "";
    form.last_name = "";
    form.email = "";
    form.password = "";
    form.phone = "";
    form.join_at = "";
    form.role_id = "";
    form.departments = [];

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
