<template>
  <v-container>
    <v-row justify="center">
      <v-col v-for="company in companies" :key="company.id" cols="12" sm="6">
        <company-card class="fill-height" :company="company" />
      </v-col>
    </v-row>
    <v-snackbar v-model="error" right>
      {{ errorText }}
      <v-btn color="error" text @click="error = false">Fermer</v-btn>
    </v-snackbar>
    <v-snackbar v-model="success" right>
      {{ successText }}
      <v-btn color="success" text @click="success = false">Fermer</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import CompanyCard from '@/components/CompanyCard.vue'
import { mapState } from 'vuex'

export default {
  components: {
    CompanyCard,
  },
  async fetch({ store }) {
    !store.state.others.companies.length &&
      (await store.dispatch('others/fetchCompanies'))
  },
  computed: {
    ...mapState({
      companies: (state) => state.others.companies,
    }),
  },
  data() {
    return {
      success: false,
      successText: '',
      error: false,
      errorText: '',
    }
  },
}
</script>
