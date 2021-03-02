<template>
  <div class="container flex">
    <h1 class="title">Rendimentos</h1>
    <div v-if="!loading" class="profile">
      <profile-circle :name="user.name" />
      <h3>{{ user.name }}</h3>
      <p>{{ user.phone }}</p>
      <admin-nav tab-active="clients"></admin-nav>
    </div>
  </div>
</template>

<script>
import AdminNav from '@/components/AdminNav.vue'
import ProfileCircle from '@/components/ProfileCircle.vue'
export default {
  name: 'Client Details',
  components: { AdminNav, ProfileCircle },
  data: () => ({
    user: null,
    loading: true
  }),
  async created() {
    const { data } = await this.$axios.get(
      `/manager/user/${this.$route.params.id}`
    )
    this.user = data.user
    this.loading = false
  }
}
</script>

<style lang="scss" scoped>
.container.flex {
  flex-direction: column;
  align-items: center;

  .profile {
    margin-top: 1rem;
    text-align: center;
    h3 {
      margin-bottom: 0;
      padding-bottom: 0;
      font-weight: lighter;
    }
    p {
      margin: 0;
      color: rgba($color: $foreground, $alpha: 0.75);
    }
  }
}
</style>
