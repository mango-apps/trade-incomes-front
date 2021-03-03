<template>
  <div class="container">
    <h1 class="title">Rendimentos</h1>
    <div v-if="!loading" class="profile flex">
      <profile-circle :name="user.name" />
      <h3>{{ user.name }}</h3>
      <p>{{ user.phone }}</p>
    </div>
    <div class="card-list flex flex-column">
      <Card v-for="fund in funds" :key="fund._id">
        <div class="fund-details">
          <div>
            <p class="bold fund-title">
              Fundo:
            </p>
            <span class="is-pink bold">
              {{
                fund.invested.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })
              }}
            </span>
          </div>
          <div>
            <p class="fund-title">
              Acumulado:
            </p>
            <span class="is-green">
              {{
                fund.gained.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })
              }}
            </span>
          </div>
          <div>
            <p class="fund-title">
              Ganho:
            </p>
            <span class="is-blue">
              {{ (fund.gained / fund.invested) * 100 }}%
            </span>
          </div>
        </div>
      </Card>
    </div>

    <admin-nav tab-active="clients" :class="{ leave: 'leave-anim' }" />
  </div>
</template>

<script>
import AdminNav from '@/components/AdminNav.vue'
import ProfileCircle from '@/components/ProfileCircle.vue'
import Card from '@/components/Card.vue'

export default {
  name: 'ClientDetails',
  components: { AdminNav, Card, ProfileCircle },
  data: () => ({
    user: null,
    funds: [],
    loading: true
  }),
  async created() {
    try {
      const { data } = await this.$axios.get(
        `/manager/user/${this.$route.params.id}`
      )
      this.user = data.user

      const { data: fundsData } = await this.$axios.get(
        `/manager/user-funds/${this.$route.params.id}`
      )
      console.log(fundsData)
      this.funds = fundsData.funds
    } catch (error) {
      console.log(error)
    } finally {
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  @media (min-width: 600px) {
    max-width: 600px;
    margin: 0 auto;
  }
  .profile {
    margin-top: 5px;
    text-align: center;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    h3 {
      margin-bottom: 0;
      margin-top: 0;
      padding-bottom: 0;
      font-weight: lighter;
    }
    p {
      margin: 0;
      margin-bottom: 5px;
      color: rgba($color: $foreground, $alpha: 0.75);
    }
  }
  .card-list {
    align-items: center;
    justify-content: center;
    /deep/.card {
      margin: 5px 0;
      height: 90px;
      padding: 0 10px;
      &:last-of-type {
        margin-bottom: 150px;
      }
    }
    .fund-details {
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex: 1;
      div {
        flex: 1;
        text-align: center;
        p {
          font-size: 1.2rem;
          margin: 0;
        }
      }
    }
  }
}
/deep/.nav-item {
  &:nth-of-type(2) {
    animation: spaceRight ease 0.3s;
    padding-right: 25px;
  }
  &:nth-of-type(3) {
    animation: spaceLeft ease 0.3s;
    padding-left: 25px;
  }

  @keyframes spaceRight {
    from {
      padding-right: 0;
    }
    to {
      padding-right: 25px;
    }
  }

  @keyframes spaceLeft {
    from {
      padding-left: 0;
    }
    to {
      padding-left: 25px;
    }
  }
}
</style>
