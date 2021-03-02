<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="6">
        <profile-card
          class="fill-height"
          @update-profile-success="
            successText = 'Informations bien mises à jour !'
            success = true
          "
          @update-profile-fail="
            errorText =
              $event.response &&
              $event.response.data &&
              $event.response.data.error
                ? $event.response.data.error
                : $event
            error = true
          "
        />
      </v-col>
      <v-col cols="12" sm="6">
        <my-company-card
          @create-company-success="
            successText = 'Entreprise créée !'
            success = true
          "
          @create-company-fail="
            errorText =
              $event.response &&
              $event.response.data &&
              $event.response.data.error
                ? $event.response.data.error
                : $event
            error = true
          "
          @update-company-success="
            successText = 'Informations entreprise bien mises à jour !'
            success = true
          "
          @update-company-fail="
            errorText =
              $event.response &&
              $event.response.data &&
              $event.response.data.error
                ? $event.response.data.error
                : $event
            error = true
          "
          @add-user-success="
            successText = 'Ajout utilisateur réussi'
            success = true
          "
          @add-user-fail="
            errorText =
              $event.response &&
              $event.response.data &&
              $event.response.data.error
                ? $event.response.data.error
                : $event
            error = true
          "
          @remove-user-success="
            successText = 'Suppression utilisateur réussie'
            success = true
          "
          @remove-user-fail="
            errorText =
              $event.response &&
              $event.response.data &&
              $event.response.data.error
                ? $event.response.data.error
                : $event
            error = true
          "
        />
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
import ProfileCard from '@/components/ProfileCard.vue'
import MyCompanyCard from '@/components/MyCompanyCard.vue'
export default {
  components: {
    ProfileCard,
    MyCompanyCard,
  },
  async fetch({ store }) {
    !store.state.auth.user && (await store.dispatch('me/getProfile'))
    !store.state.me.company &&
      (await store.dispatch('me/fetchMyCompany').catch(() => {}))
    !store.state.me.companyUsers.length &&
      (await store.dispatch('me/fetchMyCompanyUsers').catch(() => {}))
    !store.state.others.users.length &&
      (await store.dispatch('others/fetchUsers'))
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
