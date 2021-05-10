<template>
  <div class="container">
    <h1 class="title">Solicitações de Saque</h1>
    <div class="flex space-between flex-row vertical-center">
      <p>
        Filtrando por:
        <span
          style="margin-left: 5px"
          :class="[
            'status',
            { pendent: searchStatus === 0 || !searchStatus },
            { confirmed: searchStatus === 1 }
          ]"
        >
          <span v-if="searchStatus === 0 || !searchStatus" class="is-dark">
            Pendente
          </span>
          <span v-else-if="searchStatus === 1" class="is-dark">Depositado</span>
        </span>
      </p>
      <div class="filter" @click="openFilter">
        <uil-filter size="30px" />
        <p class="is-green">Filtrar</p>
      </div>
    </div>
    <div v-if="withdraws.length" class="card-list flex flex-column">
      <Card v-for="(withdrawal, index) in withdraws" :key="withdrawal._id">
        <div
          class="flex flex-column"
          style="flex: 1;"
          @click="openDetails(withdrawal)"
        >
          <div class="flex space-between flex-row top header">
            <h4>
              Solicitação de saque n°
              {{ index + 1 > 99 ? `${index}` : `0${index + 1}` }}
            </h4>
            <p>{{ withdrawal.createdAt | dateFilter }}</p>
          </div>
          <div class="flex space-between flex-row vertical-center">
            <div
              :class="[
                'status',
                { pendent: withdrawal.status === 0 },
                { confirmed: withdrawal.status === 1 }
              ]"
            >
              <span v-if="withdrawal.status === 0">Pendente</span>
              <span v-if="withdrawal.status === 1">Despositado</span>
            </div>
            <div class="payment flex end" style="flex: 1;">
              <p class="is-pink bold" style="margin-right: 10px;">
                *{{ withdrawal.method }}
              </p>
              <p class="is-green">
                {{
                  withdrawal.Withdraw.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })
                }}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
    <div v-else>
      <h3 class="lighter txt-center">Não solicitações para listagem.</h3>
    </div>
    <modal v-if="!isDetails">
      <template v-slot:header>
        <h1 class="title fs-medium">Filtrar Solicitações de Saque</h1>
      </template>
      <template v-slot:body>
        <h3 class="lighter">Status do Saque:</h3>
        <div class="flex flex-row vertical-center">
          <label for="pendentStatus" class="label">Pendente: </label>
          <input
            type="radio"
            id="pendentStatus"
            value="0"
            v-model.number.lazy="searchStatus"
          />
        </div>
        <div class="flex flex-row vertical-center">
          <label for="confirmedStatus" class="label">Depositado: </label>
          <input
            type="radio"
            id="confirmedStatus"
            value="1"
            v-model.number.lazy="searchStatus"
          />
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
          <button class="button button__primary" @click="fetchWithdrawals">
            Salvar
          </button>
        </div>
      </template>
    </modal>
    <modal v-else>
      <template v-slot:header>
        <h1 class="title fs-medium">Solicitação de Saque</h1>
      </template>
      <template v-slot:body>
        <div class="form-details">
          <p>Nome Completo:</p>
          <h3 class="is-medium">{{ detailsToShow.fullname }}</h3>
          <p>CPF:</p>
          <h3>{{ detailsToShow.cpf }}</h3>
          <div v-if="detailsToShow.method === 'PIX'">
            <p>Chave PIX:</p>
            <h3>{{ detailsToShow.pixKey }}</h3>
          </div>
          <div v-if="detailsToShow.method === 'TED'">
            <p>Banco:</p>
            <h3>{{ detailsToShow.bankCode }}</h3>
            <p>Agência:</p>
            <h3>{{ detailsToShow.bankAgency }}</h3>
            <p>Conta:</p>
            <h3>{{ detailsToShow.bankAccount }}</h3>
          </div>
          <h3>
            Quantia:
            <span class="is-green">{{
              detailsToShow.Withdraw.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })
            }}</span>
          </h3>
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
          <button class="button button__primary" @click="deposit">
            Depositar
          </button>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
import Card from '@/components/Card.vue'
import Modal from '@/components/Modal.vue'

import { format } from 'date-fns'
import { UilFilter } from '@iconscout/vue-unicons'

import fontawesome from '@fortawesome/fontawesome'
import faSolid from '@fortawesome/fontawesome-free-solid'

import { mapMutations } from 'vuex'

export default {
  components: { Modal, Card, UilFilter },
  data: () => ({
    withdraws: [],
    searchStatus: null,
    isDetails: false,
    detailsToShow: {}
  }),
  filters: {
    dateFilter(timestamp) {
      const date = new Date(timestamp)
      return format(date, 'dd/MM/yyyy')
    }
  },
  methods: {
    ...mapMutations(['setAddFundsModal']),
    closeModal() {
      this.searchStatus = null
      this.setAddFundsModal(false)
    },
    async fetchWithdrawals() {
      try {
        const { data } = await this.$axios.get(
          `/manager/withdrawals/${this.searchStatus || 0}`
        )
        if (data.withdraws) {
          this.withdraws = data.withdraws
        }
      } catch (_e) {
        this.$toasted.show(
          `${
            fontawesome.icon(faSolid.faExclamationTriangle).html
          } Não foi possível realizar a consulta das solicitações`,
          {
            duration: 10000,
            position: 'top-center',
            fullWidth: true,
            className: 'toasty'
          }
        )
      } finally {
        this.setAddFundsModal(false)
      }
    },
    async deposit() {
      try {
        const { data } = await this.$axios.post('/manager/withdrawals', {
          id: this.detailsToShow._id
        })
        console.log(data)
      } catch (_e) {
        this.$toasted.show(
          `${
            fontawesome.icon(faSolid.faExclamationTriangle).html
          } Não foi possível fazer a confirmação do depósito`,
          {
            duration: 10000,
            position: 'top-center',
            fullWidth: true,
            className: 'toasty'
          }
        )
      } finally {
        this.fetchWithdrawals()
        this.closeModal()
      }
    },
    openFilter() {
      this.isDetails = false
      this.setAddFundsModal(true)
    },
    openDetails(withdraw) {
      this.isDetails = true
      this.detailsToShow = withdraw
      this.setAddFundsModal(true)
    }
  },
  created() {
    this.fetchWithdrawals()
  }
}
</script>

<style lang="scss" scoped>
.container {
  .status {
    height: 20px;
    border-radius: 25px;
    text-align: center;
    padding: 5px 15px;
    font-weight: bold;
    font-family: 'Quicksand', sans-serif;
    span {
      color: $background;
    }
    &.pendent {
      background: $warning;
    }
    &.confirmed {
      background: $accent;
    }
  }
  .payment {
    p {
      font-size: 22px;
    }
  }

  .card-list {
    align-items: center;
    .header {
      h4,
      p {
        margin: 15px 0;
      }
    }
  }

  .filter {
    .ui-svg-inline {
      color: $accent;
    }

    display: flex;
    align-items: center;
    flex-direction: column;

    p {
      margin: 0;
    }
    &:hover {
      cursor: pointer;
    }
  }

  input[type='radio'] {
    width: 25px;
    height: 25px;
    margin-left: 15px;
    &:hover {
      background-color: red;
    }
  }
  label.label {
    margin-top: 0;
  }
  .form-details {
    p,
    h3 {
      margin: 0;
    }
    h3 {
      margin-bottom: 15px;
    }
  }
}
</style>
