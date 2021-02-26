<template>
  <div class="container flex flex-column">
    <h1>Bem-vindo de volta!</h1>
    <img src="../assets/icons/login.svg" alt="" srcset="" />

    <form class="form flex flex-column">
      <label for="email">Email:</label>
      <input id="email" type="email" />

      <label for="password">Senha: </label>
      <input type="password" name="password" id="password" />
    </form>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.container {
  h1 {
    text-align: center;
    font-weight: 100;
    font-size: 48px;
    line-height: 45px;
    word-break: break-all;
    padding: 0 2rem;
  }

  .form {
    label {
      color: $foreground;
      &:last-of-type {
        margin-top: 1rem;
      }
    }
    margin-top: 2rem;
  }
}
</style>
