<template>
  <div class="clients container">
    <h1 class="title">Lista de Clientes</h1>
    <div class="card-list flex-container flex-column">
      <Card v-for="user in users" :key="user.cpf">
        <div class="profile flex center flex-row vertical-center">
          <h1 class="is-dark">{{ user.name | splitInitials }}</h1>
        </div>
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
          <div class="cash flex space-between">
            <p class="is-pink">R$ 1.000,00</p>
            <p class="is-green">R$ 2.000,00</p>
            <p class="is-blue">100%</p>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'
export default {
  name: 'Clients',
  components: { Card },
  data: () => ({
    users: [],
    loading: true
  }),
  filters: {
    splitInitials(name) {
      const splitted = name.split(' ')
      return splitted[0].charAt(0) + splitted[1].charAt(0)
    }
  },
  async created() {
    try {
      const {
        data: { users }
      } = await this.$axios.get('/manager/users')

      this.users = users
    } catch (error) {
      console.error(error)
    }
  }
}
</script>

<style lang="scss" scoped>
.profile {
  width: 90px;
  height: 90px;
  background: $primary;
  border-radius: 50%;
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
</style>
