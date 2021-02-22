<template>
  <v-card>
    <v-card-title>
      Mon Entreprise
      <v-spacer />
      <v-icon color="info" large>mdi-bank</v-icon>
    </v-card-title>
    <v-divider />
    <v-card-text>
      <v-card outlined>
        <v-card-title>Mon entreprise</v-card-title>
        <v-card-text v-if="!company" class="text-center">
          Pas encore dans une entreprise ! --> faire un formulaire de création
          ici ;)
          <v-btn
            rounded
            color="success"
            :loading="createCompanyLoading"
            @click="showCompanyForm = true"
          >
            Creez votre entreprise
          </v-btn>
          <v-card v-if="showCompanyForm" outlined>
            <v-card-text class="text-center">
              <v-form>
                <v-text-field
                  v-model="companyData.name"
                  label="Nom de l'entreprise"
                  prepend-icon="mdi-account-circle"
                  :error-messages="nameCompanyErrors"
                  required
                  @input="$v.companyData.name.$touch()"
                  @blur="$v.companyData.name.$touch()"
                />
                <v-text-field
                  v-model="companyData.siren"
                  label="SIREN"
                  :error-messages="sirenCompanyErrors"
                  prepend-icon="mdi-account-circle"
                  required
                  @input="$v.companyData.siren.$touch()"
                  @blur="$v.companyData.siren.$touch()"
                />
                <v-text-field
                  v-model="companyData.email"
                  label="E-mail"
                  type="email"
                  :error-messages="emailCompanyErrors"
                  prepend-icon="mdi-email"
                  required
                  @input="$v.companyData.email.$touch()"
                  @blur="$v.companyData.email.$touch()"
                />
                <!-- Faire les gestions d'erreurs pour le formulaire company -->
                <v-text-field
                  v-model="companyData.phone"
                  label="Téléphone"
                  prepend-icon="mdi-phone-settings"
                  :error-messages="companyPhoneErrors"
                  required
                  @input="$v.companyData.phone.$touch()"
                  @blur="$v.companyData.phone.$touch()"
                />
              </v-form>
              <v-btn
                rounded
                color="success"
                :loading="createCompanyLoading"
                @click="createCompany"
              >
                Creez
              </v-btn>
            </v-card-text>
          </v-card>
        </v-card-text>
        <v-card-text v-else>
          <v-form>
            <v-text-field
              v-model="company.name"
              label="Nom de l'entreprise"
              prepend-icon="mdi-account-circle"
              disabled
            />
            <v-text-field
              v-model="company.siren"
              label="SIREN"
              prepend-icon="mdi-account-circle"
              disabled
            />
            <v-text-field
              v-model="company.email"
              label="E-mail"
              type="email"
              prepend-icon="mdi-email"
              disabled
            />
            <v-text-field
              v-model="updateCompanyPhone"
              label="Téléphone"
              prepend-icon="mdi-phone-settings"
              :error-messages="updateCompanyPhoneErrors"
              @input="$v.updateCompanyPhone.$touch()"
              @blur="$v.updateCompanyPhone.$touch()"
            />
            <v-text-field
              v-model="company.usersQty"
              label="Utilisateurs"
              prepend-icon="mdi-account-group"
              disabled
            />
          </v-form>
          <v-btn
            rounded
            color="success"
            :loading="updateCompanyLoading"
            @click="updateCompany"
          >
            Mettre à jour
          </v-btn>
          <v-btn
            rounded
            color="success"
            :loading="deleteCompanyLoading"
            @click="deleteMyCompany"
          >
            Supprimer
          </v-btn>
        </v-card-text>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import {
  required,
  minLength,
  maxLength,
  numeric,
  email,
} from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      companyData: this.createFreshCompanyData(),
      updateCompanyPhone: this.createFreshUpdateCompanyPhone(),
      createCompanyLoading: false,
      updateCompanyLoading: false,
      showCompanyForm: false,
      deleteCompanyLoading: false,
    }
  },
  computed: {
    ...mapState({
      company: (state) => state.me.company,
    }),
    companyPhoneErrors() {
      const errors = []
      if (!this.$v.companyData.phone.$dirty) return errors
      !this.$v.companyData.phone.numeric &&
        errors.push(
          'Numéro invalide : merci de respecter le format 0033xxxxxxxxx.'
        )
      !this.$v.companyData.phone.minLength &&
        errors.push(
          'Numéro invalide : merci de respecter le format 0033xxxxxxxxx.'
        )
      !this.$v.companyData.phone.maxLength &&
        errors.push(
          'Numéro invalide : merci de respecter le format 0033xxxxxxxxx.'
        )
      return errors
    },
    nameCompanyErrors() {
      const errors = []
      if (!this.$v.companyData.name.$dirty) return errors
      !this.$v.companyData.name.required &&
        errors.push('Ce champ ne doit pas être vide')
      !this.$v.companyData.name.minLength && errors.push('Nom trop court')
      !this.$v.companyData.name.maxLength && errors.push('Nom trop long')
      return errors
    },

    emailCompanyErrors() {
      const errors = []
      if (!this.$v.companyData.email.$dirty) return errors
      !this.$v.companyData.email.required &&
        errors.push('Un e-mail est requis.')
      !this.$v.companyData.email.email &&
        errors.push('mail invalide : merci de respecter le format xxxx@xxxxx.')

      return errors
    },
    sirenCompanyErrors() {
      const errors = []
      if (!this.$v.companyData.siren.$dirty) return errors
      !this.$v.companyData.siren.required &&
        errors.push('Ce champ ne doit pas être vide')
      !this.$v.companyData.siren.numeric &&
        errors.push('Numéro invalide : merci de respecter le format 123456789.')
      !this.$v.companyData.siren.minLength &&
        errors.push('Numéro invalide : merci de respecter le format 123456789.')
      !this.$v.companyData.siren.maxLength &&
        errors.push('Numéro invalide : merci de respecter le format 123456789.')
      return errors
    },
    updateCompanyPhoneErrors() {
      const errors = []
      if (!this.$v.updateCompanyPhone.$dirty) return errors
      !this.$v.updateCompanyPhone.numeric &&
        errors.push(
          'Numéro invalide : merci de respecter le format 0033xxxxxxxxx.'
        )
      !this.$v.updateCompanyPhone.minLength &&
        errors.push(
          'Numéro invalide : merci de respecter le format 0033xxxxxxxxx.'
        )
      !this.$v.updateCompanyPhone.maxLength &&
        errors.push(
          'Numéro invalide : merci de respecter le format 0033xxxxxxxxx.'
        )
      return errors
    },
  },
  mounted() {
    this.companyData = this.createFreshCompanyData()
    this.updateCompanyPhone = this.createFreshUpdateCompanyPhone()
  },
  methods: {
    createFreshCompanyData() {
      return {
        name: this.company ? this.company.name : '',
        siren: this.company ? this.company.siren : '',
        email: this.company ? this.company.email : '',
        phone: this.company ? this.company.phone : '',
      }
    },
    createFreshUpdateCompanyPhone() {
      return this.company ? this.company.phone : ''
    },
    createCompany() {
      this.$v.companyData.$touch()
      if (!this.$v.companyData.$invalid) {
        this.createCompanyLoading = true
        this.$store
          .dispatch('me/createCompany', this.companyData)
          .then(() => {
            this.createCompanyLoading = false
            this.$emit('create-company-success')
            this.companyData = this.createFreshCompanyData()
            this.$v.companyData.$reset()
            this.updateCompanyPhone = this.createFreshUpdateCompanyPhone()
            this.$v.updateCompanyPhone.$reset()
            this.showCompanyForm = false
          })
          .catch((err) => {
            this.createCompanyLoading = false
            this.$emit('create-company-fail', err)
          })
      }
    },
    updateCompany() {
      this.$v.updateCompanyPhone.$touch()
      if (!this.$v.updateCompanyPhone.$invalid) {
        this.updateCompanyLoading = true
        this.$store
          .dispatch('me/updateCompany', this.updateCompanyPhone)
          .then(() => {
            this.updateCompanyLoading = false
            this.$emit('update-company-success')
            this.updateCompanyPhone = this.createFreshUpdateCompanyPhone()
            this.$v.updateCompanyPhone.$reset()
          })
          .catch((err) => {
            this.updateCompanyLoading = false
            this.$emit('update-company-fail', err)
          })
      }
    },
    deleteMyCompany() {
      this.deleteCompanyLoading = true
      this.$store
        .dispatch('me/deleteMyCompany', this.companyData)
        .then(() => {
          this.deleteCompanyLoading = false
          this.$emit('delete-company-success')
          this.companyData = this.createFreshCompanyData()
          this.$v.companyData.$reset()
        })
        .catch((err) => {
          this.deleteCompanyLoading = false
          this.$emit('delete-company-fail', err)
        })
    },
  },
  validations: {
    companyData: {
      name: { required, minLength: minLength(1), maxLength: maxLength(35) },
      siren: {
        required,
        numeric,
        minLength: minLength(9),
        maxLength: maxLength(9),
      },
      email: { required, email, maxLength: maxLength(50) },
      phone: {
        required,
        numeric,
        minLength: minLength(13),
        maxLength: maxLength(13),
      },
    },
    updateCompanyPhone: {
      required,
      numeric,
      minLength: minLength(13),
      maxLength: maxLength(13),
    },
  },
}
</script>
