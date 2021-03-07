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
        <h1>Adicionar Fundos</h1>
      </template>

      <template v-slot:body>
        <label class="label" for="invest">Investimento:</label>
        <input
          id="invest"
          type="number"
          placeholder="R$ 4.000,00"
          v-model="invested"
          :class="['input', { dirty: investedDirty.state }]"
        />
        <span class="is-red" v-if="investedDirty.state">{{
          investedDirty.message
        }}</span>
        <label class="label" for="gain">Ganho:</label>
        <input
          id="gain"
          type="number"
          class="input"
          placeholder="R$ 1.000,00"
          v-model="gained"
          :class="{ dirty: gainedDirty.state }"
        />
        <span class="is-red" v-if="gainedDirty.state">{{
          gainedDirty.message
        }}</span>
      </template>

      <template v-slot:footer>
        <div>
          <button
            class="button button__ghost button__danger"
            @click="setAddFundsModal(false)"
          >
            Cancelar
          </button>
          <button class="button button__primary" @click="insterFunds">
            Salvar
          </button>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
import ProfileCircle from '@/components/ProfileCircle.vue'
import Card from '@/components/Card.vue'
import Modal from '@/components/Modal.vue'
import { mapMutations } from 'vuex'
export default {
  name: 'ClientDetails',
  components: { Card, ProfileCircle, Modal },
  data: () => ({
    user: null,
    funds: [],
    invested: null,
    investedDirty: {
      state: false,
      message: ''
    },
    gained: null,
    gainedDirty: {
      state: false,
      message: ''
    },
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
  },
  watch: {
    gained() {
      this.gainedDirty.state = false
    },
    invested() {
      this.investedDirty.state = false
    }
  },
  methods: {
    ...mapMutations(['setAddFundsModal']),
    async insterFunds() {
      if (!this.invested) {
        this.investedDirty.state = true
        this.investedDirty.message = 'O investimento não pode ser vazio'
      } else if (!this.gained) {
        this.gainedDirty.state = true
        this.gainedDirty.message = 'O ganho não pode ser vazio'
      } else {
        try {
          const payload = {
            email: this.user.email,
            invested: this.invested,
            gained: this.gained
          }

          const { data } = await this.$axios.post('/manager/funds', {
            ...payload
          })

          if (data.fund) {
            this.setAddFundsModal(false)
            this.$router.go()
          }
        } catch (e) {
          this.setAddFundsModal(false)
        }
      }
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

/deep/.modal {
  .button.button__ghost.button__danger {
    margin-right: 10px;
  }
}
</style>
