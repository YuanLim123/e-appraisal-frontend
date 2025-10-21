import { reactive, ref } from "vue";
import { defineStore } from "pinia";

export const useUser = defineStore("user", () => {
  const errors = reactive({});
  const loading = ref(false);
  const users = ref([]);
  const form = reactive({
    first_name: "",
    last_name: "",
    company_email: "",
    email: "",
    username: "",
    password: "",
    office_phone: "",
    phone: "",
    join_at: "",
    role_id: "",
    position_id: "",
    employee_num: "",
    login_enabled: false,
    departments: [],
  });

  function resetForm() {
    form.first_name = "";
    form.last_name = "";
    form.company_email = "";
    form.email = "";
    form.username = "";
    form.password = "";
    form.office_phone = "";
    form.phone = "";
    form.join_at = "";
    form.role_id = "";
    form.position_id = "";
    form.employee_num = "";
    form.login_enabled = false;
    form.departments = [];

    errors.value = {};
  }

  function getUsers(page = 1) {
    return window.axios.get("users", { params: { page } }).then((response) => {
      console.log(response.data);
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
