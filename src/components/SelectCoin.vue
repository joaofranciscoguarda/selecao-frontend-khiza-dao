<script setup lang="ts">
import ICoin from "../types/coin";
import CoinList from "../CoinList/coins";
import {
  defineComponent,
  ref,
  watch,
  toRefs,
} from "vue";
import { useStore } from "../store/index";

const store = toRefs(useStore());

const coins = ref<ICoin[]>(CoinList);
const select = ref(store.selectedCoin);

const items = CoinList.sort((a, b) => {
  //sort alphabeticly
  if (a.name > b.name) return -1;
  else return 1;
}).sort((a, b) => {
  //sort by famous and if its cryptocurrency
  if (a.famous && !b.famous) return -1;
  else if (
    a.category === "cryptocurrencies" &&
    b.category !== "cryptocurrencies"
  )
    return -1;
  else return 1;
});

function changeCoin(event: any) {
  store.selectedCoin = event.target.value;
}
</script>

<template>
  <div class="select-coin">
    <v-select
      v-model="select"
      :hint="`${select.code}, ${select.name}`"
      :items="items"
      :append-inner-icon="'fa-brands fa-bitcoin'"
      item-title="name"
      item-value="code"
      label="Select"
      persistent-hint
      return-object
      single-line
      @change="changeCoin"></v-select>
  </div>
</template>

<style scoped>
.select-coin {
  width: 350px;
  height: 90px;
  border-radius: 12px;
  color: black;
  background-color: white;
}
</style>
