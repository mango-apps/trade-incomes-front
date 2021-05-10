<template>
  <div class="container">
    <h1 class="title">Registro de cliente</h1>
    <form
      action="post"
      @submit.prevent="register"
      class="form flex flex-column"
    >
      <label for="email" class="label">Email:</label>
      <input
        type="email"
        name="email"
        id="email"
        :class="['input', { dirty: emailDirty }]"
        placeholder="joao@email.com"
        v-model="email"
        required
      />
      <span class="is-red" v-if="emailDirty">{{ emailDirty }}</span>

      <label for="nome" class="label">Nome:</label>
      <input
        type="text"
        name="nome"
        id="nome"
        class="input"
        placeholder="João Silva"
        v-model="name"
        required
      />

      <label for="telefone" class="label">Telefone:</label>
      <input
        type="text"
        name="telefone"
        id="telefone"
        class="input"
        v-mask="'(##) #####-####'"
        v-model="phone"
        placeholder="(67) 99123-4567"
        required
      />

      <label for="cpf" class="label">CPF:</label>
      <input
        type="text"
        name="cpf"
        id="cpf"
        :class="['input', { dirty: cpfDirty }]"
        v-mask="'###.###.###-##'"
        v-model="cpf"
        placeholder="123.456.789-10"
        required
      />
      <span class="is-red" v-if="cpfDirty">{{ cpfDirty }}</span>

      <button type="submit">
        Finalizar
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data: () => ({
    name: null,
    email: null,
    cpf: null,
    phone: null,
    emailDirty: null,
    cpfDirty: null
  }),
  watch: {
    email() {
      this.emailDirty = null
    }
  },
  methods: {
    async register() {
      const payload = {
        name: this.name,
        email: this.email,
        cpf: this.cpf,
        phone: this.phone,
        password: 'senha123'
      }

      try {
        const { data } = await this.$axios.post('/auth/register', {
          ...payload
        })
        if (data.email) {
          this.$router.push({ name: 'Client List' })
        }
      } catch ({ response }) {
        if (response.data.error === 'Email already registered') {
          this.emailDirty = 'Email já registrado anteriormente'
        }
        if (response.data.error === 'CPF already registered') {
          this.cpfDirty = 'CPF já registrado anteriormente'
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
</style>
