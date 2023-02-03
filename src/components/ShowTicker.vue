<script setup lang="ts">
import { useStore } from "../store";
import { watch, ref, toRefs } from "vue";
import formatToLocale from "../utils/formatter";

const {
  currency,
  dayVariation,
  selectedCoin,
  coinTicker,
  language,
} = toRefs(useStore());
const { fetchCoinTicker, calcDayVariation } =
  useStore();

fetchCoinTicker();

watch(
  selectedCoin,
  async (selectedCoin, prevSelectedCoin) => {
    console.log(selectedCoin);
    fetchCoinTicker();
  },
  { deep: true }
);

watch(
  coinTicker,
  async (coinTicker, preCoinTicker) => {
    calcDayVariation();
  },
  { deep: true }
);
</script>

<template>
  <div class="day-info-bar">
    <div class="specific-info">
      <p>{{ $t("trading.tickers.value") }}</p>
      <div
        v-if="coinTicker.ticker"
        class="numbers">
        {{ currency }}
        {{
          formatToLocale(
            language.valueOf(),
            parseInt(coinTicker.ticker.last)
          )
        }}
        <p
          v-bind:style="[
            dayVariation > 0
              ? { color: 'green' }
              : { color: 'red' },
          ]"
          v-if="dayVariation"
          class="percentage">
          {{ dayVariation.toFixed(2) }}%
        </p>
      </div>
    </div>
    <div class="specific-info">
      <p>{{ $t("trading.tickers.opening") }}</p>
      <div
        v-if="coinTicker.ticker"
        class="numbers">
        {{ currency }}
        {{
          formatToLocale(
            language.valueOf(),
            parseInt(coinTicker.ticker.open)
          )
        }}
      </div>
    </div>
    <div class="specific-info">
      <p>{{ $t("trading.tickers.max") }}</p>
      <div
        v-if="coinTicker.ticker"
        class="numbers">
        {{ currency }}
        {{
          formatToLocale(
            language.valueOf(),
            parseInt(coinTicker.ticker.high)
          )
        }}
      </div>
    </div>
    <div class="specific-info">
      <p>{{ $t("trading.tickers.min") }}</p>
      <div
        v-if="coinTicker.ticker"
        class="numbers">
        {{ currency }}
        {{
          formatToLocale(
            language.valueOf(),
            parseInt(coinTicker.ticker.low)
          )
        }}
      </div>
    </div>
    <div class="specific-info">
      <p>{{ $t("trading.tickers.volume") }}</p>
      <div
        v-if="coinTicker.ticker"
        class="numbers">
        {{
          formatToLocale(
            language.valueOf(),
            parseInt(coinTicker.ticker.vol)
          )
        }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.day-info-bar {
  display: flex;
  flex-direction: row;
  background-color: white;
  color: black;
  border-radius: 12px;

  padding: 12px 0px;
  margin-top: 25px;

  justify-content: space-evenly;
}
.specific-info p {
  font-size: 10px;
}

.numbers {
  font-size: 18px;
  font-weight: bold;
}

.numbers {
  font-size: 18px;
  font-weight: bold;
  display: flex;
  align-items: center;
  margin-left: 0px;
}

.percentage {
  margin-left: 10px;
}
</style>
