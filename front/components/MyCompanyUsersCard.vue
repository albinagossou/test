<template>
  <v-card>
    <v-card-title>Les utilisateurs de l'entreprise</v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="companyUsers"
        class="elevation-1"
      >
      </v-data-table>
    </v-card-text>
  </v-card>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'MyCompanyUsersCard',
  computed: {
    headers() {
      return [
        { text: 'Email', value: 'email' },
        { text: 'Nom', value: 'lastName' },
        { text: 'Prenom', value: 'firstName' },
        { text: 'Telephone', value: 'phone' },
      ]
    },
    ...mapState({
      companyUsers: (state) => state.me.companyUsers,
    }),
  },
}
</script>
