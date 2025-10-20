import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import { useAuth } from "@/stores/auth";
 
export const useLogin = defineStore("login", () => {
  const auth = useAuth();
  const errors = reactive({});
  const loading = ref(false);
  const form = reactive({
    username: "",
    password: "",
  });
 
  function resetForm() {
    form.username = "";
    form.password = "";
 
    errors.value = {};
  }

  function resetError() {
    errors.value = {};
  }
 
  async function handleSubmit() {
    if (loading.value) return;
 
    loading.value = true;
    errors.value = {};
 
    return window.axios
      .post("login", form)
      .then((response) => {
        console.log(response.data)
        auth.login(response.data.access_token);
      })
      .catch((error) => {
        if (error.response.status === 422) {
          const errorData = error.response.data;

          if (errorData.errors) {
            errors.value = errorData.errors;
          } else {
             errors.value = errorData.message
          }
          
          console.log(errors.value)
        }
      })
      .finally(() => {
        form.password = "";
        loading.value = false;
      });
  }
 
  return { form, errors, loading, resetForm, resetError, handleSubmit };
});