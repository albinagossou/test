<template>
  <v-container>
    <v-row justify="center">
      <v-col v-for="user in users" :key="user.id" cols="12" sm="6">
        <user-card class="fill-height" :user="user" />
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
import UserCard from '@/components/UserCard.vue'
import { mapState } from 'vuex'

export default {
  components: {
    UserCard,
  },
  async fetch({ store }) {
    !store.state.others.users.length &&
      (await store.dispatch('others/fetchUsers'))
  },
  computed: {
    ...mapState({
      users: (state) => state.others.users,
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
