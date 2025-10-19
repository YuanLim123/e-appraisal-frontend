import { computed } from "vue";
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { useRouter } from "vue-router";

export const useAuth = defineStore("auth", () => {
  const router = useRouter();
  const accessToken = useStorage("access_token", "");
  const check = computed(() => !!accessToken.value);

  function setAccessToken(value) {
    accessToken.value = value;
    window.axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken.value}`;
  }

  function login(accessToken) {
    setAccessToken(accessToken);

    router.push({ name: "dashboard" });
  }

  function destroyTokenAndRedirectTo(routeName = "login") {
    setAccessToken(null);
    router.push({ name: routeName });
  }

  async function logout() {
    const userResult = confirm("Are you sure you want to logout?");
    if (!userResult) return;
    return window.axios.post('logout').finally(() => {
      destroyTokenAndRedirectTo();
    });
  }

  return { login, logout, check, destroyTokenAndRedirectTo };
});
