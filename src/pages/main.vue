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
import languages from "../types/languages";

const store = toRefs(useStore());

function changeLanguage() {
  const language =
    store.language.value === "pt" ? "en" : "pt";
  console.log(store.language.value);
  store.language.value = language;
  localStorage.clear();
  localStorage.setItem(
    "@khiza:user-locale",
    language
  );
  location.reload();
}

const date = ref();

onMounted(() => {
  const startDate = new Date();
  const endDate = new Date(
    new Date().setDate(startDate.getDate())
  );
  date.value = [startDate, endDate];
});

watch(
  date,
  (date, prevDate) => {
    console.log(date.value);
  },
  { deep: true }
);
</script>

<template>
  <VApp :theme="'dark'" class="app">
    <main class="main">
      <header>
        <selectCoin class="select-coin" />
        <Datepicker
          v-model="date"
          range
          fixed-end
          :clearable="false" />
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
      <div class="info-cards"></div>
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
  padding: 1% 5%;
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
  justify-content: space-between;
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
}
</style>
