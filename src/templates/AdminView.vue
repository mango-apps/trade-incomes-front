<template>
  <div class="admin-view">
    <admin-nav />
    <router-view />
  </div>
</template>

<script>
import AdminNav from '../components/AdminNav.vue'
export default {
  components: { AdminNav }
}
</script>
