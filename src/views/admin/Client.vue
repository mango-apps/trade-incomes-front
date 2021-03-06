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
    <modal ref="add-funds">
      <template v-slot:header>
        <h1>Modal title</h1>
      </template>

      <template v-slot:body>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc sed
          velit dignissim sodales ut eu sem integer vitae. Id aliquet lectus
          proin nibh nisl condimentum. Fringilla urna porttitor rhoncus dolor
          purus. Nam aliquam sem et tortor. Nisl vel pretium lectus quam id.
          Cras pulvinar mattis nunc sed. Quis ipsum suspendisse ultrices gravida
          dictum fusce ut placerat orci. Tristique magna sit amet purus.
          Fermentum et sollicitudin ac orci phasellus egestas tellus. Erat
          pellentesque adipiscing commodo elit at imperdiet dui accumsan. Felis
          eget nunc lobortis mattis aliquam faucibus. Tincidunt eget nullam non
          nisi est sit amet facilisis. Mi in nulla posuere sollicitudin aliquam
          ultrices sagittis orci. Vitae proin sagittis nisl rhoncus mattis
          rhoncus urna neque. Eget nunc scelerisque viverra mauris in aliquam
          sem fringilla ut. Nec nam aliquam sem et tortor consequat id. Commodo
          nulla facilisi nullam vehicula ipsum a. Elementum tempus egestas sed
          sed. Faucibus purus in massa tempor nec feugiat nisl pretium fusce.
        </p>
        <p>
          Arcu cursus vitae congue mauris rhoncus aenean. Tempor id eu nisl nunc
          mi. Pharetra diam sit amet nisl suscipit adipiscing bibendum. Ut
          faucibus pulvinar elementum integer enim. Odio facilisis mauris sit
          amet massa vitae tortor condimentum lacinia. Eu non diam phasellus
          vestibulum lorem sed risus. Porttitor rhoncus dolor purus non enim
          praesent. Sit amet mauris commodo quis imperdiet. Lobortis feugiat
          vivamus at augue eget. Nibh tellus molestie nunc non blandit. Tellus
          mauris a diam maecenas sed enim ut. Tortor aliquam nulla facilisi cras
          fermentum odio eu feugiat pretium. Mattis aliquam faucibus purus in
          massa.
        </p>
      </template>

      <template v-slot:footer>
        <div>
          <button @click="$refs.modalName.closeModal()">Cancel</button>
          <button @click="$refs.modalName.closeModal()">Save</button>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
import ProfileCircle from '@/components/ProfileCircle.vue'
import Card from '@/components/Card.vue'
import Modal from '@/components/Modal.vue'
export default {
  name: 'ClientDetails',
  components: { Card, ProfileCircle, Modal },
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
