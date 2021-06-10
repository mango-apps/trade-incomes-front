<template>
  <div class="container">
    <h1 class="title">Minha Carteira</h1>
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
                (fund.gained + fund.invested).toLocaleString('pt-BR', {
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
              {{
                (
                  ((fund.gained + fund.invested) / fund.invested) * 100 -
                  100
                ).toFixed(1)
              }}%
            </span>
          </div>
          <div
            v-if="fund.status !== 0"
            :class="[
              'fund__status',
              { fund__status__pendent: fund.status === 1 }
            ]"
          ></div>
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
        <span class="is-red" v-if="balanceDirty">{{ balanceDirty }}</span>
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
    <modal v-if="step === 3 && paymentMethod === 'PIX'">
      <template v-slot:header>
        <h1 class="title fs-medium">Insira sua Chave PIX</h1>
      </template>
      <template v-slot:body>
        <label class="label" for="fullname">Nome completo:</label>
        <input
          type="text"
          id="fullname"
          placeholder="João José da Silva"
          v-model="fullname"
          :class="['input', { dirty: fullnameDirty }]"
        />
        <span v-if="fullnameDirty" class="is-red">{{ fullnameDirty }}</span>

        <label class="label" for="pixKey">Chave PIX:</label>
        <input
          id="pixKey"
          type="text"
          placeholder="Email, telefone ou chave randômica."
          v-model="pixKey"
          :class="['input', { dirty: pixKeyDirty }]"
        />
        <span v-if="pixKeyDirty" class="is-red">{{ pixKeyDirty }}</span>
      </template>
      <template v-slot:footer>
        <div>
          <button
            class="button button__ghost button__danger"
            @click="closeModal"
          >
            Cancelar
          </button>
          <button class="button button__primary" @click="checkOut">
            {{ loading ? 'Salvando...' : 'Salvar' }}
          </button>
        </div>
      </template>
    </modal>
    <modal v-if="step === 3 && paymentMethod === 'TED'">
      <template v-slot:header>
        <h1 class="title fs-medium">Insira os dados para a TED</h1>
      </template>
      <template v-slot:body>
        <label class="label" for="fullname">Nome completo:</label>
        <input
          type="text"
          id="fullname"
          placeholder="João José da Silva"
          v-model="fullname"
          :class="['input', { dirty: fullnameDirty }]"
        />
        <span v-if="fullnameDirty" class="is-red">{{ fullnameDirty }}</span>
        <label class="label" for="bank">Banco:</label>
        <select class="input" name="bank" id="bank" v-model="bankCode">
          <option
            v-for="bank in banks"
            :key="bank.code"
            :value="`${bank.Code} - ${bank.Name}`"
          >
            {{ bank.Code }} - {{ bank.Name }}
          </option>
        </select>
        <label for="cpf" class="label">CPF:</label>
        <input
          type="text"
          class="input"
          id="cpf"
          v-model="cpf"
          v-mask="'###.###.###-##'"
          placeholder="123.456.789-10"
        />
        <label class="label" for="agency">Agência:</label>
        <input
          id="agency"
          name="agency"
          type="text"
          class="input"
          placeholder="071-9"
          v-model="bankAgency"
        />
        <label class="label" for="agency">Conta:</label>
        <input
          id="account"
          name="account"
          type="text"
          class="input"
          placeholder="78910-2"
          v-model="bankAccount"
        />
      </template>
      <template v-slot:footer>
        <div>
          <button
            class="button button__ghost button__danger"
            @click="closeModal"
          >
            Cancelar
          </button>
          <button class="button button__primary" @click="checkOut">
            {{ loading ? 'Salvando...' : 'Salvar' }}
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
import Banks from '@/utils/Banks.json'

import fontawesome from '@fortawesome/fontawesome'
import faSolid from '@fortawesome/fontawesome-free-solid'

export default {
  components: { Card, Modal },

  data: () => ({
    loading: false,
    funds: [],
    balance: 0,
    idFund: null,
    widthdrawValue: null,
    balanceDirty: null,
    paymentMethod: null,
    pixKey: null,
    pixKeyDirty: null,
    fullname: null,
    fullnameDirty: null,
    banks: Banks,
    bankCode: null,
    bankAgency: null,
    bankAccount: null,
    cpf: null,
    step: 1
  }),

  watch: {
    fullname() {
      this.fullnameDirty = null
    },
    pixKey() {
      this.pixKeyDirty = null
    }
  },

  methods: {
    ...mapMutations(['setAddFundsModal']),
    async fetchFunds() {
      try {
        const { data } = await this.$axios.get('/user/funds')
        if (data.funds.length) {
          this.funds = data.funds
        }
      } catch (e) {
        console.error(e)
      }
    },

    openModal(fund) {
      if (fund.status === 0) {
        this.balance = fund.gained + fund.invested
        this.idFund = fund._id
        this.setAddFundsModal(true)
      }
    },

    closeModal() {
      this.setAddFundsModal(false)
      this.balance = null
      this.widthdrawValue = null
      this.balanceDirty = null
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
        setTimeout(() => {
          this.setAddFundsModal(true)
        }, 300)
      }
    },

    async checkOut() {
      this.loading = true

      if (!this.fullname) {
        this.fullnameDirty = 'Nome completo é obrigatório'
        this.loading = false
        return
      } else if (this.paymentMethod === 'PIX' && !this.pixKey) {
        this.pixKeyDirty = 'Chave PIX é obrigatória'
        this.loading = false
        return
      } else {
        try {
          const { data } = await this.$axios.post('/user/withdraw', {
            idFund: this.idFund,
            amount: this.widthdrawValue,
            method: this.paymentMethod,
            pixKey: this.pixKey,
            fullname: this.fullname,
            bankCode: this.bankCode,
            bankAgency: this.bankAgency,
            bankAccount: this.bankAccount,
            cpf: this.cpf
          })
          if (data.withdraw) {
            this.closeModal()
            this.fetchFunds()
          }
        } catch (e) {
          this.$toasted.show(
            `${
              fontawesome.icon(faSolid.faExclamationTriangle).html
            } Não foi possível realizar a solicitação`,
            {
              duration: 30000,
              position: 'bottom-center',
              fullWidth: true,
              className: 'toasty'
            }
          )
          this.closeModal()
        } finally {
          this.loading = false
        }
      }
    }
  },

  created() {
    this.fetchFunds()
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
  .card-list {
    align-items: center;
    justify-content: center;
    /deep/.card {
      position: relative;
      margin: 5px 0;
      height: 90px;
      padding: 0 10px;
      &:last-of-type {
        margin-bottom: 150px;
      }
      .fund__status {
        position: absolute;
        top: 10px;
        right: 10px;
        border-radius: 50%;
        padding: 8px;
        &__pendent {
          background-color: $warning;
        }
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
    select {
      color: $foreground;
    }
    option {
      color: $background;
    }
  }
}
</style>
