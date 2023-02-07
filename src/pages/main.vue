<script setup lang="ts">
import {
  ref,
  toRefs,
  onMounted,
  watch,
} from "vue";
import { useStore } from "../store/index";
import selectCoin from "../components/SelectCoin.vue";
import ShowTicker from "../components/ShowTicker.vue";
import ShowTrades from "../components/ShowTrades.vue";
import ShowOrderBook from "../components/ShowOrderBook.vue";

const store = toRefs(useStore());
const {
  filterResults,
  resetFilter,
  changeLanguage,
  fetchCoinOrderBook,
  fetchCoinTicker,
  fetchCoinTrades,
} = useStore();

onMounted(() => {
fetchCoinTicker();
fetchCoinTrades();
fetchCoinOrderBook();
});

setInterval(function () {
  if (!store.isDateFilterActive.value) {
    fetchCoinTrades();
  }
  fetchCoinTicker();
  fetchCoinOrderBook();
}, 5000);
</script>

<template>
  <VApp :theme="'dark'" class="app">
    <main class="main">
      <header>
        <selectCoin class="select-coin" />
        <div>
          <Datepicker
            v-model="store.date.value"
            range
            :clearable="false" />
          <button
            v-if="!store.isDateFilterActive.value"
            @click="filterResults">
            Filtrar
          </button>
          <button
            v-if="store.isDateFilterActive.value"
            @click="resetFilter">
            Remove filter
          </button>
        </div>
        <div
          v-on:click="changeLanguage"
          class="imgs-div">
          <img
            class="flags-icon"
            src="../../src/assets/imgs/flags-usa-brazil-divided-diagonally_698953-10043.jpg" />
          <img
            class="logo"
            src="../../src/assets/imgs/LOGO_KHIZA_06.png" />
        </div>
      </header>
      <p class="latest-deals">
        {{
          $t("trading.tickers.heading", {
            cryptocurency:
              store.selectedCoin.value.name,
          })
        }}
      </p>
      <ShowTicker></ShowTicker>
      <div class="info-cards">
        <ShowOrderBook></ShowOrderBook>
        <ShowTrades></ShowTrades>
      </div>
      <footer class="footer">
        2022 Khiza DAO
      </footer>
    </main>
  </VApp>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600&display=swap");
.app {
  background-color: #0d1620;
  font-family: "Open Sans", sans-serif;
}

.main {
  display: flex;
  flex-direction: column;
  min-width: 100vw;
  min-height: 100vh;
  justify-content: baseline;
  position: relative;
  padding: 1% 5% 5% 5%;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.select-coin {
  justify-self: flex-start;
}
.imgs-div {
  display: flex;
  align-items: center;
}
.flags-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.flags-icon:hover {
  cursor: pointer;
}
.logo {
  width: 300px;
  height: 35px;
  filter: brightness(0%) invert(1);
  clip-path: inset(86px 33px 85px 37px);
  display: block;
  object-fit: cover;
}

.latest-deals {
  font-size: 24px;
  font-weight: bold;
  margin-top: 25px;
}

.info-cards {
  display: flex;
  widows: 100%;
  height: 100%;
  justify-content: space-evenly;
  align-items: baseline;
}

.footer {
  width: 100%;
  background-color: transparent;
  color: #495057;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>
