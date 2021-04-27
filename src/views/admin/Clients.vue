<template>
  <div class="container">
    <h1 class="title">Lista de Clientes</h1>
    <div v-if="!loading && users.length" class="card-list flex flex-column">
      <Card
        v-for="user in users"
        :key="user.cpf"
        @click.native="$router.push(`/admin/client/${user._id}`)"
      >
        <ProfileCircle :name="user.name" />
        <div class="details">
          <p>{{ user.name }}</p>
          <p>
            <svg
              style="margin-right: 5px;"
              xmlns="http://www.w3.org/2000/svg"
              width="16.707"
              height="16.738"
              viewBox="0 0 16.707 16.738"
            >
              <path
                id="phone"
                d="M17.817,13.782v2.369A1.579,1.579,0,0,1,16.1,17.73a15.628,15.628,0,0,1-6.815-2.424,15.4,15.4,0,0,1-4.738-4.738A15.628,15.628,0,0,1,2.118,3.721,1.579,1.579,0,0,1,3.69,2H6.059A1.579,1.579,0,0,1,7.638,3.358a10.139,10.139,0,0,0,.553,2.219,1.579,1.579,0,0,1-.355,1.666l-1,1a12.635,12.635,0,0,0,4.738,4.738l1-1a1.579,1.579,0,0,1,1.666-.355,10.139,10.139,0,0,0,2.219.553,1.579,1.579,0,0,1,1.358,1.6Z"
                transform="translate(-1.611 -1.5)"
                fill="none"
                stroke="#d9d9d9"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
              />
            </svg>
            {{ user.phone }}
          </p>
          <div v-if="user.fund" class="cash flex space-between">
            <p class="is-pink">
              {{
                user.fund.invested.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })
              }}
            </p>
            <p class="is-green">
              {{
                (user.fund.gained + user.fund.invested).toLocaleString(
                  'pt-BR',
                  {
                    style: 'currency',
                    currency: 'BRL'
                  }
                )
              }}
            </p>
            <p class="is-blue">
              {{
                (
                  ((user.fund.gained + user.fund.invested) /
                    user.fund.invested) *
                    100 -
                  100
                ).toFixed(1)
              }}%
            </p>
          </div>
          <div v-else class="cash flex space-between">
            <p class="is-pink">
              R$ 0,00
            </p>
            <p class="is-green">
              R$ 0,00
            </p>
            <p class="is-blue">
              0%
            </p>
          </div>
        </div>
      </Card>
    </div>
    <div v-else-if="!users.length && !loading">
      <h3 class="lighter txt-center">Nenhum usuário foi cadastrado ainda.</h3>
    </div>
  </div>
</template>

<script>
import ProfileCircle from '@/components/ProfileCircle.vue'
import Card from '@/components/Card.vue'
export default {
  name: 'Clients',
  components: { ProfileCircle, Card },
  data: () => ({
    users: [],
    loading: true,
    isPrevClient: false
  }),
  async mounted() {
    try {
      const {
        data: { userWithFunds }
      } = await this.$axios.get('/manager/users')

      this.users = userWithFunds
    } catch (error) {
      console.error(error)
    } finally {
      this.loading = false
    }
  },
  methods: {
    setPrev(prev) {
      this.isPrevClient = prev
    }
  },
  beforeRouteEnter(_to, from, next) {
    if (from.name === 'Client Details') {
      next(vm => vm.setPrev(true))
    }
    next()
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
}

.card-list {
  align-items: center;
}
.details {
  margin-left: 1rem;
  flex-grow: 1;
  p {
    padding: 0;
    margin: 0;
    font-size: 14px;
    &:first-of-type {
      font-size: 24px;
      margin-bottom: 5px;
    }
  }
  .cash {
    margin-top: 15px;
    width: 100%;
    p {
      font-size: 14px;
    }
  }
}

.anim-enter {
  /deep/.nav-item {
    &:nth-of-type(2) {
      animation: spaceRight ease 0.3s;
    }
    &:nth-of-type(3) {
      animation: spaceLeft ease 0.3s;
    }

    @keyframes spaceRight {
      from {
        padding-right: 25px;
      }
      to {
        padding-right: 0;
      }
    }

    @keyframes spaceLeft {
      from {
        padding-left: 0;
      }
      to {
        padding-left: 0;
      }
    }
  }
}
</style>
