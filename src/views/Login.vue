<template>
  <div class="container flex flex-column">
    <header>
      <h1>Bem-vindo de volta!</h1>
      <img src="../assets/icons/login.svg" alt="" srcset="" />
    </header>

    <form class="form flex flex-column" @submit.prevent="login" method="post">
      <label for="email">Email:</label>
      <input
        id="email"
        ref="email"
        type="email"
        placeholder="nome.sobrenome@email.com"
        :class="{ dirty: emailDirty.state }"
        v-model="email"
      />
      <span v-if="emailDirty.state">{{ emailDirty.message }}</span>

      <label for="password">Senha: </label>
      <input
        type="password"
        ref="password"
        name="password"
        id="password"
        placeholder="**********"
        :class="{ dirty: passwordDirty.state }"
        v-model="password"
      />
      <span v-if="passwordDirty.state">{{ passwordDirty.message }}</span>

      <button type="submit">
        {{ loading ? 'Entrando...' : 'Login' }}
      </button>
    </form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'Login',
  data: () => ({
    email: '',
    password: '',
    loading: false,
    emailDirty: {
      state: false,
      message: ''
    },
    passwordDirty: {
      state: false,
      message: ''
    }
  }),
  watch: {
    email() {
      this.emailDirty.state = false
    },
    password() {
      this.passwordDirty.state = false
    }
  },
  methods: {
    ...mapMutations(['setToken', 'setIsAdmin']),
    async login() {
      this.loading = true
      try {
        const { data } = await this.$axios.post('/auth/login', {
          email: this.email,
          password: this.password
        })

        this.$axios.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${data.token}`

        this.setToken(data.token)
        this.setIsAdmin(data.admin)

        if (data.admin) {
          this.$router.push('/admin/clients')
        } else {
          this.$router.push('/user/investments')
        }
      } catch ({ response: { data } }) {
        if (data.error === 'Email is malformatted' && this.email === '') {
          this.emailDirty = {
            state: true,
            message: 'Email mal formatado'
          }
        } else if (data.error === 'User not found') {
          this.emailDirty = {
            state: true,
            message: 'Usuário não encontrado'
          }
        } else if (data.error === `Password don't match`) {
          this.passwordDirty = {
            state: true,
            message: 'Senha incorreta'
          }
        }
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  @media (min-width: 600px) {
    max-width: 600px;
    margin: 0 auto;
  }
  header {
    h1 {
      text-align: center;
      font-weight: 100;
      font-size: 48px;
      line-height: 45px;
      word-break: break-all;
      padding: 0 2rem;
    }
    img {
      max-width: 100%;
      @media (min-width: 600px) {
        display: block;
        margin: 0 auto;
      }
    }
  }

  .form {
    margin-top: 1rem;
    label {
      color: $foreground;
      font-size: 1.5rem;
      margin-bottom: 5px;
      &:last-of-type {
        margin-top: 1rem;
      }
    }
    input {
      height: 2.25rem;
      background: rgba($color: #fff, $alpha: 0.05);
      border: 2px solid $dark;
      border-radius: 7px;
      padding-left: 15px;
      font-size: 1rem;
      &::placeholder {
        font-size: 1rem;
        color: rgba($color: $foreground, $alpha: 0.5);
      }
      &:focus {
        outline: none;
        border-color: $primary;
      }
      &.dirty {
        border-color: $danger;
        margin-bottom: 5px;
        &::placeholder {
          color: $danger;
        }
      }
    }

    span {
      color: $danger;
    }

    button {
      height: 2.25rem;
      margin-top: 2rem;
      width: 100%;
      border: transparent;
      border-radius: 7px;
      font-weight: bold;
      color: $background;
      font-size: 1.15rem;
      background-color: #efefef;
      @media (prefers-color-scheme: dark) {
        color: $background;
        background-color: #efefef;
      }
      @media (min-width: 600px) {
        position: unset;
        margin-top: 1rem;
        width: 25%;
        margin-left: 75%;
      }
    }
  }
}
</style>
