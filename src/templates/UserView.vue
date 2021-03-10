<template>
  <div class="user-view">
    <user-nav />
    <router-view />
  </div>
</template>

<script>
import UserNav from '../components/UserNav.vue'
export default {
  components: { UserNav }
}
</script>
