<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="10" sm="10" md="10">
        <v-card class="pa-10 custom-card">
          <v-card-title class="text-h5 text-center"> </v-card-title>
          <v-card-text>
            <v-data-table-server
              v-model:items-per-page="itemsPerPage"
              :headers="headers"
              :items="serverItems"
              :items-length="totalItems"
              :loading="loading"
              @update:options="loadItems"
            >
              <template v-slot:[`item.iban`]="{ value }">
                <span cols="6">
                  {{ value }}
                </span>
              </template>
            </v-data-table-server>
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

const headers = [
  { title: "NUMBER", align: "start", sortable: false, key: "iban" },
  { title: "USER NAME", align: "start", sortable: false, key: "user.name" },
  { title: "USER EMAIL", align: "start", sortable: false, key: "user.email" },
];

const serverItems = ref([]);
const loading = ref(false);
const totalItems = ref(0);
const itemsPerPage = ref(10);

const loadItems = async (options) => {
  loading.value = true;
  try {
    const {
      data: { data },
    } = await axios.get("iban", {
      params: {
        page: options.page,
        per_page: options.itemsPerPage,
      },
    });

    serverItems.value = data.data;

    totalItems.value = data.total;
  } catch (error) {
    console.error("Error fetching IBAN data:", error);
  } finally {
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
