<template>
  <div class="container flex flex-column">
    <header>
      <h1>Bem-vindo de volta!</h1>
      <img src="../assets/icons/login.svg" alt="" srcset="" />
    </header>

    <form class="form flex flex-column">
      <label for="email">Email:</label>
      <input id="email" type="email" placeholder="nome.sobrenome@email.com" />

      <label for="password">Senha: </label>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="**********"
      />

      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login'
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
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
    margin-top: 2rem;
    position: relative;
    flex-grow: 1;
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
    }

    button {
      height: 2.25rem;
      position: absolute;
      bottom: 10px;
      left: 0;
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
}
</style>
