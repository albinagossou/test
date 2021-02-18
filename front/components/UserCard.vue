<template>
  <v-card>
    <v-list>
      <v-subheader>Carte Utilisateur</v-subheader>
      <v-list-item-group>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-email </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="user.email"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-account-circle-outline </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="user.firstName"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-account-circle </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="user.lastName"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-phone </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="user.phone"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: 'UserCard',
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
}
// { firstName: 'Albin', lastName: 'Agossou', email: 'albin.agossou@heqtor.fr', phone: '0033123456789' }
// { firstName: 'Albin', lastName: 'Agossou', email: 'albin.agossou@heqtor.fr' }
</script>
