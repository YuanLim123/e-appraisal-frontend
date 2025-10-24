import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import dayjs from "dayjs";

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
    department_ids: [],
    is_login_enabled: false,
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
          page: page,
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
        return response.data.data;
      })
      .then((data) => {
        form.first_name = data.first_name;
        form.last_name = data.last_name;
        form.company_email = data.company_email;
        form.email = data.email;
        form.username = data.username;
        form.office_phone = data.office_phone;
        form.phone = data.phone;
        form.join_at = dayjs(Date(data.join_at)).format("YYYY-MM-DD");
        form.role_id = data.role;
        form.position_id = data.position;
        form.employee_no = data.employee_no;
        form.is_login_enabled = data.is_login_enabled;
        form.departments = data.department;
      })
      .finally(() => {
        loading.value = false;
      });
  }

  function storeUser() {
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

  function updateUser(user) {
    if (loading.value) return;

    loading.value = true;
    errors.value = {};

    // extract only ids to submit
    form.position_id = form.position_id ? form.position_id.id : "";
    form.role_id = form.role_id ? form.role_id.id : "";
    form.departments = form.departments.map((dept) => dept.id);

    window.axios
      .put(`hr/users/${user.id}`, form)
      .then((response) => {
        alert(response.data.message);
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
        getUser(user.id);
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
    storeUser,
    updateUser,
  };
});
