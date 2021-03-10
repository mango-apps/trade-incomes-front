<template>
  <div class="container">
    <h1 class="title">Meus investimentos</h1>
    <div class="card-list flex flex-column">
      <Card v-for="fund in funds" :key="fund._id">
        <div class="fund-details" @click="openFund(fund)">
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
  </div>
</template>

<script>
import Card from '@/components/Card.vue'
export default {
  components: { Card },
  data: () => ({
    funds: []
  }),
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
</style>
