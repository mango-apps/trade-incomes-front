<template>
  <div class="container">
    <h1 class="title">Solicitações de Saque</h1>
    <div class="card-list">
      <Card v-for="(withdrawal, index) in withdraws" :key="withdrawal._id">
        <div class="flex flex-column" style="flex: 1;">
          <div class="flex space-between flex-row top">
            <h4>
              Solicitação de saque n°
              {{ index + 1 > 99 ? `${index}` : `0${index + 1}` }}
            </h4>
            <p>{{ withdrawal.createdAt | dateFilter }}</p>
          </div>
          <div class="flex space-between flex-row vertical-center">
            <div :class="['status', { pendent: withdrawal.status === 0 }]">
              {{ withdrawal.status === 0 && 'Pendente' }}
            </div>
            <div class="payment flex space-around" style="flex: 0.80;">
              <p class="is-pink">*{{ withdrawal.method }}</p>
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
  </div>
</template>

<script>
import Card from '@/components/Card.vue'
import { format } from 'date-fns'
export default {
  components: { Card },
  data: () => ({
    withdraws: []
  }),
  filters: {
    dateFilter(timestamp) {
      const date = new Date(timestamp)
      return format(date, 'dd/MM/yyyy')
    }
  },
  async created() {
    try {
      const { data } = await this.$axios.get('/user/withdraw')
      this.withdraws = data.withdraws
    } catch (e) {
      console.error(e)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  .status {
    width: 75px;
    height: 20px;
    border-radius: 25px;
    text-align: center;
    padding: 5px 15px;
    color: $background;
    font-weight: bold;
    font-family: 'Quicksand', sans-serif;
    &.pendent {
      background: $warning;
    }
  }
  .payment {
    p {
      font-size: 22px;
    }
  }
}
</style>
