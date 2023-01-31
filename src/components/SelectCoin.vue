<script setup lang="ts">
import Coin from "../types/coin";
import CoinList from "../CoinList/coins";
import { defineComponent, ref } from "vue";

const coins = ref<Coin[]>(CoinList);
const select = ref(
  CoinList.find(
    (item) => item.code === "BTC"
  ) as Coin
);
const items = ref(
  CoinList.sort((a, b) => {
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
  })
);

console.log(items);

function changeCoin(event: any) {
  select.value = event.target.value;
  console.log(event);
}
</script>

<template>
  {{ select }}
  <div class="select-coin">
    <v-select
      v-model="select"
      :hint="`${select.code}, ${select.name}`"
      :items="items"
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
  width: 150px;
  height: 75px;
  border-radius: 12px;
  color: black;
  background-color: white;
}
</style>
