<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="4" sm="4" md="4">
        <v-card :loading="loading" class="pa-1 custom-card">
          <v-card-title class="text-h5 text-center">
            <span role="img" aria-label="validate">🗝️</span>
          </v-card-title>
          <v-card-text class="mt-2">
            <v-form>
              <v-text-field
                v-model="iban"
                :error-messages="errors.iban"
                label="IBAN"
                required
                variant="outlined"
                class="mt-2"
                @input="clearError('iban')"
              ></v-text-field>

              <v-btn class="mt-4" block color="primary" @click="submit">
                Save
              </v-btn>
              <v-btn class="mt-4" block color="default" @click="logout">
                Logout
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "@/services/axios";
import { useRouter } from "vue-router";

const router = useRouter();

const iban = ref();
const loading = ref(false);
const errors = ref({});

const clearError = (field) => {
  if (errors.value[field]) {
    delete errors.value[field];
  }
};

const logout = () => {
  localStorage.removeItem("token");
  router.push({ name: "login" });
};

const submit = async () => {
  loading.value = true;

  try {
    await axios.post("iban", {
      iban: iban.value,
    });

    alert("IBAN Added successfully.");

    errors.value = {};

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

onMounted(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    router.push({ name: "login" });
  }
});
</script>

<style scoped>
.custom-card {
  box-shadow: 0 4px 6px;
}
</style>
