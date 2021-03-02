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
    <v-dialog v-model="addUserDialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn block color="success" v-on="on"> Ajouter un utilisateur </v-btn>
      </template>
      <v-card>
        <v-card-title>Ajouter un utilisateur à mon entreprise</v-card-title>
        <v-card-text>
          <template>
            <v-row align="center">
              <v-col cols="12">
                <v-select
                  v-model="userToAdd"
                  :items="usersWithoutCompany"
                  :item-text="
                    (item) =>
                      `${item.firstName} ${item.lastName} (${item.email} - ${item.phone})`
                  "
                  return-object
                  label="Sélectionner un utilisateur"
                ></v-select>
              </v-col>
            </v-row>
          </template>
        </v-card-text>
        <v-btn :loading="addUserLoading" block color="success" @click="addUser">
          Valider l'ajout
        </v-btn>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'MyCompanyUsersCard',
  data() {
    return {
      addUserDialog: false,
      userToAdd: null,
      addUserLoading: false,
    }
  },
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
      users: (state) => state.others.users,
    }),
    usersWithoutCompany() {
      return this.users.filter((user) => user.companyId === null)
    },
  },
  methods: {
    addUser() {
      this.addUserLoading = true
      this.$store
        .dispatch('me/addUserToMyCompany', this.userToAdd)
        .then(() => {
          this.addUserLoading = false
          this.$emit('add-user-success')
          this.addUserDialog = false
        })
        .catch((err) => {
          this.addUserLoading = false
          this.$emit('add-user-fail', err)
        })
    },
  },
}
</script>
