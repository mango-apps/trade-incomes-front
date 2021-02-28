<template>
  <nav class="nav">
    <div class="nav-item flex flex-column active">
      <uil-list-ul size="25px" />
      Clientes
    </div>
    <div class="nav-item flex flex-column">
      <uil-money-withdrawal size="25px" /> Saques
    </div>
    <div class="nav-item flex flex-column">
      <uil-user-plus size="25px" /> Registrar Cliente
    </div>
  </nav>
</template>

<script>
import {
  UilListUl,
  UilMoneyWithdrawal,
  UilUserPlus
} from '@iconscout/vue-unicons'
export default {
  name: 'AdminNav',
  components: {
    UilListUl,
    UilMoneyWithdrawal,
    UilUserPlus
  }
}
</script>
<style lang="scss" scoped>
.nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  width: 100%;
  height: 65px;

  background: $darker;
  box-shadow: 1px 0 1px rgba(0, 0, 0, 0.12), 2px 0 2px rgba(0, 0, 0, 0.12),
    4px 0 4px rgba(0, 0, 0, 0.12), 0 8px 8px rgba(0, 0, 0, 0.12),
    16px 0 16px rgba(0, 0, 0, 0.12);

  display: flex;
  justify-content: space-around;
  align-items: center;

  .nav-item {
    flex: 1;
    color: $dark-grey;
    font-family: 'Saira', sans-serif;
    font-weight: 600;
    font-size: 13px;

    align-items: center;
    justify-content: center;

    &.active {
      color: $accent;
    }
  }
}
</style>
