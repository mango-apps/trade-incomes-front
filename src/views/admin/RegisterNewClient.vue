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
        class="input"
        placeholder="joao@email.com"
      />

      <label for="nome" class="label">Nome:</label>
      <input
        type="text"
        name="nome"
        id="nome"
        class="input"
        placeholder="João Silva"
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
      />

      <label for="cpf" class="label">CPF:</label>
      <input
        type="text"
        name="cpf"
        id="cpf"
        class="input"
        v-mask="'###.###.###-##'"
        placeholder="123.456.789-10"
      />

      <button type="submit">
        Finalizar
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data: () => ({
    phone: null
  })
}
</script>
<style lang="scss" scoped>
.form {
  .label {
    margin: 5px 0;
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
    @media (min-width: 600px) {
      position: unset;
      margin-top: 1rem;
      width: 25%;
      margin-left: 75%;
    }
  }
}
</style>
