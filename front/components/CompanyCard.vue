<template>
  <v-card>
    <v-list>
      <v-subheader>Carte Entreprise</v-subheader>
      <v-list-item-group>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-domain </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="company.name"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-bookmark</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="company.siren"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-email </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="company.email"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-phone </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="company.phone"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-account-group</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="company.usersQty"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: 'CompanyCard',
  props: {
    company: {
      type: Object,
      required: true,
    },
  },
}
</script>
