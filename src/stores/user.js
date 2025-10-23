import { reactive, ref } from "vue";
import { defineStore } from "pinia";

export const useUser = defineStore("user", () => {
  const errors = reactive({});
  const loading = ref(false);
  const users = ref([]);
  const user = ref();
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
    employee_no: "",
    is_login_enabled: false,
    departments: [],
  });

  const searchForm = reactive({
    name: "",
    employee_no: "",
    department_id: "",
    position_id: "",
    role_id: "",
    join_at: "",
  });

  function clearSearchForm() {
    searchForm.name = "";
    searchForm.employee_no = "";
    searchForm.department_id = "";
    searchForm.position_id = "";
    searchForm.role_id = "";
    searchForm.join_before = "";
    searchForm.join_after = "";
  }

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
    form.employee_no = "";
    form.is_login_enabled = false;
    form.departments = [];

    errors.value = {};
  }

  function resetUser() {
    user.value = null;
  }

  function getUsers(page = 1) {

    searchForm.position_id = searchForm.position_id ? searchForm.position_id.id : "";
    searchForm.role_id = searchForm.role_id ? searchForm.role_id.id : "";
    searchForm.department_id = searchForm.department_id ? searchForm.department_id.id : "";

    loading.value = true;
    window.axios
      .get("users", {
        params: {
          page:page,
          ...searchForm,
        },
      })
      .then((response) => {
        users.value = response.data;
      })
      .finally(() => {
        loading.value = false;
      });
  }

  function getUser(user_id) {
    loading.value = true;
    window.axios
      .get(`users/${user_id}`)
      .then((response) => {
        user.value = response.data.data;
      })
      .finally(() => {
        loading.value = false;
      });
  }

  function handleSubmit() {
    if (loading.value) return;

    loading.value = true;
    errors.value = {};

    // extract only ids to submit
    form.position_id = form.position_id ? form.position_id.id : "";
    form.role_id = form.role_id ? form.role_id.id : "";
    form.departments = form.departments.map((dept) => dept.id);

    window.axios
      .post("hr/users", form)
      .then((response) => {
        alert(response.data.message);
        resetForm();
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 422) {
          const errorData = error.response.data;

          if (errorData.errors) {
            errors.value = errorData.errors;
          } else {
            errors.value = errorData.message;
          }

          console.log(errors.value);
        }
      })
      .finally(() => {
        form.password = "";
        loading.value = false;
      });
  }

  return {
    form,
    errors,
    loading,
    users,
    user,
    searchForm,
    clearSearchForm,
    resetForm,
    resetUser,
    getUsers,
    getUser,
    handleSubmit,
  };
});
