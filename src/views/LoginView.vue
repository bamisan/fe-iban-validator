<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="4" sm="4" md="4">
        <v-card class="pa-1 vh-30" variant="outlined">
          <v-card-title class="text-h5 text-center">IBAN</v-card-title>
          <v-card-text class="mt-2">
            <v-form ref="formRef" v-model="valid">
              <v-text-field
                v-model="credentials.email"
                label="Email"
                :rules="emailRules"
                required
                type="email"
                variant="outlined"
              ></v-text-field>

              <v-text-field
                v-model="credentials.password"
                label="Password"
                :rules="passwordRules"
                required
                type="password"
                variant="outlined"
                class="mt-2"
              ></v-text-field>

              <v-btn
                :disabled="!valid"
                class="mt-4"
                block
                color="primary"
                @click="submit"
              >
                Login
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref } from "vue";

export default {
  name: "LoginView",
  setup() {
    // Reactive state
    const formRef = ref(null);
    const credentials = ref({
      email: "",
      password: "",
    });
    const valid = ref(false);

    // Validation rules
    const emailRules = [
      (v) => !!v || "Email is required",
      (v) => /.+@.+\..+/.test(v) || "Email must be valid",
    ];
    const passwordRules = [(v) => !!v || "Password is required"];

    const submit = () => {
      if (formRef.value.validate()) {
        console.log(credentials.value);
      }
    };

    // Return all variables and methods to use in the template
    return {
      credentials,
      valid,
      emailRules,
      passwordRules,
      formRef,
      submit,
    };
  },
};
</script>
