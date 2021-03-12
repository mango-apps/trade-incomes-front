<template>
  <div class="container">
    <h1 class="title">Meus investimentos</h1>
    <div class="card-list flex flex-column">
      <Card v-for="fund in funds" :key="fund._id">
        <div class="fund-details" @click="openModal(fund)">
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
              {{ ((fund.gained / fund.invested) * 100 - 100).toFixed(1) }}%
            </span>
          </div>
        </div>
      </Card>
    </div>
    <modal v-if="step === 1">
      <template v-slot:header>
        <h1 class="title fs-medium">Sacar Investimento</h1>
      </template>
      <template v-slot:body>
        <div class="balance">
          <h3 class="balance__title is-bold txt-center">Saldo</h3>
          <p v-if="balance" class="balance__value is-green txt-center">
            {{
              balance.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })
            }}
          </p>
        </div>

        <label class="label" for="gain">Valor do saque:</label>
        <input
          id="gain"
          type="number"
          class="input"
          placeholder="R$ 1.000,00"
          v-model="widthdrawValue"
          :class="{ dirty: balanceDirty }"
        />
        <h6 class="balance__warn">
          O seu depósito será realizado em até 2 dias úteis.
        </h6>
      </template>
      <template v-slot:footer>
        <div>
          <button
            class="button button__ghost button__danger"
            @click="closeModal"
          >
            Cancelar
          </button>
          <button class="button button__primary" @click="setWithdrawValue">
            Continuar
          </button>
        </div>
      </template>
    </modal>
    <modal v-if="step === 2">
      <template v-slot:header>
        <h1 class="title fs-medium">Como deseja receber?</h1>
      </template>
      <template v-slot:body>
        <div class="flex flex-row vertical-center">
          <label for="pix" class="label">PIX: </label>
          <input type="radio" id="pix" value="PIX" v-model="paymentMethod" />
        </div>
        <div class="flex flex-row vertical-center">
          <label for="ted" class="label">TED: </label>
          <input type="radio" id="ted" value="TED" v-model="paymentMethod" />
        </div>
      </template>
      <template v-slot:footer>
        <div>
          <button
            class="button button__ghost button__danger"
            @click="closeModal"
          >
            Cancelar
          </button>
          <button class="button button__primary" @click="savePaymentMethod">
            Salvar
          </button>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'
import Modal from '@/components/Modal.vue'
import { mapMutations } from 'vuex'

export default {
  components: { Card, Modal },

  data: () => ({
    funds: [],
    balance: 0,
    widthdrawValue: null,
    balanceDirty: null,
    paymentMethod: null,
    step: 1
  }),

  methods: {
    ...mapMutations(['setAddFundsModal']),
    openModal(fund) {
      this.balance = fund.gained
      this.setAddFundsModal(true)
    },

    closeModal() {
      this.setAddFundsModal(false)
      this.balance = null
      this.widthdrawValue = null
      this.step = 1
    },

    setWithdrawValue() {
      if (this.widthdrawValue > this.balance) {
        this.balanceDirty = 'Não é possível sacar essa quantia.'
      } else {
        this.setAddFundsModal(false)
        this.step++
        setTimeout(() => {
          this.setAddFundsModal(true)
        }, 300)
      }
    },
    savePaymentMethod() {
      if (this.paymentMethod) {
        this.setAddFundsModal(false)
        this.step++
      }
    }
  },

  async created() {
    try {
      const { data } = await this.$axios.get('/user/funds')
      if (data.funds.length) {
        this.funds = data.funds
      }
    } catch (e) {
      console.error(e)
    }
  }
}
</script>

<style lang="scss" scoped>
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

.modal {
  .button.button__ghost.button__danger {
    margin-right: 10px;
  }
  .balance__title {
    font-weight: 400;
    margin-bottom: 0;
    padding-bottom: 0;
  }
  .balance__value {
    margin-top: 0.25rem;
  }
  .balance__warn {
    margin-top: 5px;
    font-weight: normal;
    font-size: 12px;
  }
  input[type='radio'] {
    width: 25px;
    height: 25px;
    margin-left: 15px;
    &:hover {
      background-color: red;
    }
  }
}
</style>
