export const nameRules = [(v) => !!v || "Name is required"];

export const emailRules = [
  (v) => !!v || "Email is required",
  (v) => /.+@.+\..+/.test(v) || "Email must be valid",
];

export const passwordRules = [(v) => !!v || "Password is required"];
