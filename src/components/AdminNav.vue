<template>
  <div :class="['nav', { 'has-add-button': $route.name === 'Client Details' }]">
    <router-link
      to="/admin/clients"
      :class="[
        'nav-item flex flex-column',
        {
          active:
            $route.name === 'Client List' || $route.name === 'Client Details'
        }
      ]"
    >
      <uil-list-ul size="30px" />
      Clientes
    </router-link>
    <router-link to="/admin/clients" class="nav-item flex flex-column">
      <uil-money-withdrawal size="30px" /> Saques
    </router-link>
    <router-link
      to="/admin/register"
      :class="[
        'nav-item flex flex-column',
        {
          active: $route.name === 'Client Register'
        }
      ]"
    >
      <uil-user-plus size="30px" /> Cliente
    </router-link>
    <router-link to="/admin/clients" class="nav-item flex flex-column">
      <uil-setting size="30px" /> Configs
    </router-link>

    <transition name="jump">
      <div
        v-if="$route.name === 'Client Details'"
        class="add-funds"
        @click="setAddFundsModal(true)"
      >
        <uil-panel-add size="20px" />
      </div>
    </transition>
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
import { mapMutations } from 'vuex'
export default {
  name: 'AdminNav',
  components: {
    UilListUl,
    UilMoneyWithdrawal,
    UilUserPlus,
    UilSetting,
    UilPanelAdd
  },
  methods: {
    ...mapMutations(['setAddFundsModal'])
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

  &.has-add-button {
    .nav-item {
      transition: all 0.3s ease;
      &:nth-of-type(2) {
        padding-right: 25px;
      }
      &:nth-of-type(3) {
        padding-left: 25px;
      }
    }
  }

  .nav-item {
    transition: all 0.3s ease;
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
  }
  @keyframes jump {
    0% {
      opacity: 0;
      transform: translateY(-25px) scale(0.7, 1.3);
    }

    50% {
      transform: translateY(-5px) scale(1.1, 0.9);
    }
    100% {
      height: 50px;
      width: 50px;
      transform: translateY(0px) scale(1, 1);
    }
  }

  .jump-enter-active {
    animation: jump 0.3s ease-in-out;
  }

  .jump-leave-active {
    animation: jump 0.3s ease-in-out reverse;
  }
}
</style>
