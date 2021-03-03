<template>
  <div class="nav">
    <router-link
      to="/admin/clients"
      :class="[
        'nav-item flex flex-column',
        { active: tabActive === 'clients' }
      ]"
    >
      <uil-list-ul size="30px" />
      Clientes
    </router-link>
    <router-link to="/admin/clients" class="nav-item flex flex-column">
      <uil-money-withdrawal size="30px" /> Saques
    </router-link>
    <router-link to="/admin/clients" class="nav-item flex flex-column">
      <uil-user-plus size="30px" /> Cliente
    </router-link>
    <router-link to="/admin/clients" class="nav-item flex flex-column">
      <uil-setting size="30px" /> Configs
    </router-link>

    <div v-if="$route.name === 'Client Details'" class="add-funds">
      <uil-panel-add size="20px" />
    </div>
  </div>
</template>

<script>
import {
  UilListUl,
  UilMoneyWithdrawal,
  UilUserPlus,
  UilSetting,
  UilPanelAdd
} from '@iconscout/vue-unicons'
export default {
  name: 'AdminNav',
  components: {
    UilListUl,
    UilMoneyWithdrawal,
    UilUserPlus,
    UilSetting,
    UilPanelAdd
  },
  props: {
    tabActive: {
      type: String,
      required: true
    }
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
    font-weight: 500;
    font-size: 13px;

    align-items: center;
    justify-content: center;

    text-decoration: none;

    &.active {
      color: $accent;
    }
  }

  .add-funds {
    background: $accent;
    width: 50px;
    height: 50px;
    position: fixed;
    z-index: 2;
    bottom: 35px;
    left: 0;
    right: 0;
    margin: 0 auto;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: rgba($color: #000000, $alpha: 0.24) 0 3px 6px;
    color: $background;
    border: 5px solid $background;
    animation: grow 0.3s ease;
  }
}

@keyframes grow {
  0% {
    width: 0;
    height: 0;
    transform: translateY(-50px);
  }
  25% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-25px);
  }
  100% {
    height: 50px;
    width: 50px;
    transform: translateY(0px);
  }
}
</style>
