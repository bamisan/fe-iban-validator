<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="4" sm="4" md="4">
        <v-card :loading="loading" class="pa-1 custom-card">
          <v-card-title class="text-h5 text-center">IBAN</v-card-title>
          <v-card-text class="mt-2">
            <v-form>
              <v-text-field
                v-model="credentials.email"
                label="Email"
                :rules="emailRules"
                :error-messages="errors.email"
                required
                type="email"
                variant="outlined"
                @input="clearError('email')"
              ></v-text-field>

              <v-text-field
                v-model="credentials.password"
                label="Password"
                :rules="passwordRules"
                :error-messages="errors.password"
                required
                type="password"
                variant="outlined"
                class="mt-2"
                @input="clearError('email')"
              ></v-text-field>

              <v-btn class="mt-4" block color="primary" @click="submit">
                Login
              </v-btn>

              <v-btn class="mt-2" block text :to="{ name: 'registration' }">
                Don't have an account? Register
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import axios from "@/services/axios";
import { emailRules, passwordRules } from "@/utils/validationRules";
import { useRouter } from "vue-router";

const router = useRouter();

const credentials = ref({
  email: "",
  password: "",
});
const loading = ref(false);
const errors = ref({});

const clearError = (field) => {
  if (errors.value[field]) {
    delete errors.value[field];
  }
};

const submit = async () => {
  loading.value = true;

  try {
    const { data } = await axios.post("login", {
      email: credentials.value.email,
      password: credentials.value.password,
    });

    localStorage.setItem("token", data.data.token);

    alert("Login successfully.");

    errors.value = {};

    if (data.data.is_admin == false) {
      router.push({ name: "user-dashboard" });
    }

    router.push({ name: "admin-dashboard" });

    loading.value = false;
  } catch (error) {
    if (error.response && error.response.status === 422) {
      errors.value = error.response.data.errors;
    } else {
      console.error("Unexpected error:", error.message);
    }

    loading.value = false;
  }
};
</script>

<style scoped>
.custom-card {
  box-shadow: 0 4px 6px;
}
</style>
