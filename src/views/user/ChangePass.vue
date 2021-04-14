<template>
  <div class="container">
    <h1 class="title">Alteração de senha</h1>
    <form
      action="post"
      @submit.prevent="submitPassword"
      class="form flex flex-column"
    >
      <label for="email" class="label">Email:</label>
      <input
        type="email"
        name="email"
        id="email"
        :class="['input', { dirty: emailDirty }]"
        placeholder="seuemail@mail.com"
        v-model="email"
        required
      />
      <span class="is-red" v-if="emailDirty">{{ emailDirty }}</span>

      <label for="password" class="label">Senha atual:</label>
      <input
        type="password"
        name="password"
        id="password"
        :class="['input', { dirty: oldPasswordDirty }]"
        placeholder="******"
        v-model="oldPassword"
        required
      />
      <span class="is-red" v-if="oldPasswordDirty">{{ oldPasswordDirty }}</span>

      <label for="newpassword" class="label">Nova senha:</label>
      <input
        type="password"
        name="newpassword"
        id="newpassword"
        :class="['input', { dirty: newPasswordDirty }]"
        placeholder="******"
        v-model="newPassword"
        required
      />
      <span class="is-red" v-if="newPasswordDirty">{{ newPasswordDirty }}</span>

      <label for="confirmpassword" class="label">Confirmar nova senha:</label>
      <input
        type="password"
        name="confirmpassword"
        id="confirmpassword"
        :class="['input', { dirty: newPasswordDirty }]"
        placeholder="******"
        v-model="confirmPassword"
        required
      />
      <span class="is-red" v-if="newPasswordDirty">{{ newPasswordDirty }}</span>

      <button type="submit">
        Finalizar
      </button>
    </form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data: () => ({
    email: null,
    emailDirty: null,
    oldPassword: null,
    oldPasswordDirty: null,
    newPassword: null,
    confirmPassword: null,
    newPasswordDirty: null
  }),
  watch: {
    oldPassword() {
      this.oldPasswordDirty = null
    },
    newPassword() {
      this.newPasswordDirty = null
    },
    confirmPassword() {
      this.newPasswordDirty = null
    },
    email() {
      this.emailDirty = null
    }
  },
  methods: {
    ...mapMutations(['setToken', 'setIsAdmin']),
    async submitPassword() {
      if (this.newPassword !== this.confirmPassword) {
        this.newPasswordDirty = 'Senhas não coincidem'
        return
      }

      const payload = {
        newPassword: this.newPassword,
        oldPassword: this.oldPassword,
        email: this.email
      }

      try {
        await this.$axios.put('/user/change-password', {
          ...payload
        })

        localStorage.removeItem('vuex')
        this.setToken('')
        this.setIsAdmin(false)

        this.$router.push('/')
      } catch ({ response }) {
        if (response.data.error === `Password don't match`) {
          this.oldPasswordDirty = 'Senha inserida está incorreta'
        }

        if (response.data.error === 'Got error at user load') {
          this.emailDirty = 'Email inserido incorretamente'
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.form {
  .label {
    margin-top: 12px;
  }
  button {
    height: 2.25rem;
    margin-top: 3rem;
    width: 100%;
    border: transparent;
    border-radius: 7px;
    font-weight: bold;
    color: $background;
    font-size: 1.15rem;
    @media (min-width: 600px) {
      position: unset;
      margin-top: 1rem;
      width: 25%;
      margin-left: 75%;
    }
  }
}
</style>
