<template>
  <v-card>
    <v-card-title>Les utilisateurs de l'entreprise</v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="companyUsers"
        class="elevation-1"
      >
        <template v-slot:item.action="{ item }">
          <div class="d-flex justify-center">
            <v-icon
              small
              color="error"
              @click="
                userIdToRemove = item.id
                removeUserDialog = true
              "
            >
              mdi-delete
            </v-icon>
          </div>
        </template>
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
    <v-dialog v-model="removeUserDialog" width="300">
      <v-card>
        <v-card-title
          class="error deadline"
          style="font-weight: bold; color: white"
          >Confirmer la suppression</v-card-title
        >
        <v-card-text
          >Etes vous sur de vouloir supprimer cet utilisateur?</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="removeUserDialog = false">Non</v-btn>
          <v-btn :loading="removeUserLoading" color="error" @click="removeUser"
            >Oui
          </v-btn>
        </v-card-actions>
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
      removeUserDialog: true,
      userToAdd: null,
      addUserLoading: false,
      removeUserLoading: false,
    }
  },
  computed: {
    headers() {
      return [
        { text: 'Email', value: 'email' },
        { text: 'Nom', value: 'lastName' },
        { text: 'Prenom', value: 'firstName' },
        { text: 'Telephone', value: 'phone' },
        { text: 'Actions', value: 'action' },
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
    removeUser() {
      this.removeUserLoading = true
      this.$store
        .dispatch('me/removeUserFromMyCompany', this.userIdToRemove)
        .then(() => {
          this.removeUserLoading = false
          this.$emit('remove-user-success')
          this.removeUserDialog = false
        })
        .catch((err) => {
          this.removeUserLoading = false
          this.$emit('remove-user-fail', err)
        })
    },
  },
}
</script>
