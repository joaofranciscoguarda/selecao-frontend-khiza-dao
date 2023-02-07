<script setup lang="ts">
import { useStore } from "../store";
import {
  watch,
  ref,
  toRefs,
  onMounted,
} from "vue";
import formatToLocale from "../utils/formatter";

const {
  currency,
  dayVariation,
  selectedCoin,
  coinTrades,
  language,
  coinTradesFilter,
  isDateFilterActive,
} = toRefs(useStore());
const { fetchCoinTrades, calcDayVariation } =
  useStore();

watch(
  selectedCoin,
  async (selectedCoin, prevSelectedCoin) => {
    fetchCoinTrades();
  },
  { deep: true }
);
</script>

<template>
  <div class="trade-list">
    <div class="heading">
      <h3>
        {{ $t("trading.trades.heading") }}
      </h3>
    </div>
    <div class="infos-div">
      <div class="subtitles">
        <p>
          {{ $t("trading.trades.price") }}
        </p>
        <p>
          {{ $t("trading.trades.amount") }}
        </p>
        <p>
          {{ $t("trading.trades.time") }}
        </p>
      </div>
      <div
        v-if="coinTrades"
        v-for="item in coinTrades"
        class="info-bids">
        <p :class="item.type">
          {{
            formatToLocale(language, item.price)
          }}
        </p>
        <p>
          {{
            formatToLocale(
              language,
              item.amount,
              6
            )
          }}
        </p>
        <p>
          {{
            new Date(
              item.date * 1000
            ).toLocaleString(language, {
              timeZone: "UTC",
            })
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.trade-list {
  width: 45%;

  display: flex;
  flex-direction: column;
  background-color: white;
  color: black;
  border-radius: 12px;

  padding: 12px 0px;
  margin-top: 25px;

  justify-content: baseline;
  align-items: center;
}
.heading {
  width: 100%;
  text-align: center;
}
.subtitles {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.infos-div {
  width: 80%;
}
p {
  width: 33%;
  text-align: center;
}
.info-asks,
.info-bids {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}

.buy {
  color: green;
}

.sell {
  color: red;
}
</style>
