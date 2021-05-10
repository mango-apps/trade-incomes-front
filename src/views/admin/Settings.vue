<template>
  <div class="container">
    <h1 class="title">Configurações</h1>
    <button @click="$router.push({ name: 'Change Admin Pass' })">
      Trocar senha <uil-key-skeleton size="30px" />
    </button>
    <button @click.prevent="logout">Sair <uil-signout size="30px" /></button>
  </div>
</template>

<script>
import { UilSignout, UilKeySkeleton } from '@iconscout/vue-unicons'
import { mapMutations } from 'vuex'

export default {
  components: { UilSignout, UilKeySkeleton },
  methods: {
    ...mapMutations(['setToken', 'setIsAdmin']),
    logout() {
      this.setToken('')
      this.setIsAdmin(false)

      localStorage.removeItem('vuex')

      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
button {
  height: 3.25rem;
  margin-top: 2rem;
  width: 100%;
  border: transparent;
  border-radius: 7px;
  font-weight: bold;
  color: $background;
  font-size: 1.15rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #efefef;
  @media (prefers-color-scheme: dark) {
    color: $background;
    background-color: #efefef;
  }
  &:nth-of-type(2) {
    color: $foreground;
    background: $danger;
  }
  svg {
    margin-left: 5px;
  }
}
</style>
