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
  coinOrderBook,
  language,
} = toRefs(useStore());
const { fetchCoinOrderBook, calcDayVariation } =
  useStore();

onMounted(() => {
  fetchCoinOrderBook();
});

watch(
  selectedCoin,
  async (selectedCoin, prevSelectedCoin) => {
    fetchCoinOrderBook();
  },
  { deep: true }
);

</script>

<template>
  <div class="order-book">
    <div class="heading">
      <h3>
        {{ $t("trading.orderBook.heading") }}
      </h3>
    </div>
    <div class="order-book-info">
      <div class="infos-div">
        <p class="heading">
          {{ $t("trading.orderBook.selling") }}
        </p>
        <div class="subtitles">
          <p>
            {{
              $t("trading.orderBook.price", {
                currency: currency,
              })
            }}
          </p>
          <p>
            {{ $t("trading.orderBook.amount") }}
          </p>
        </div>
        <div
          v-if="coinOrderBook"
          v-for="item in coinOrderBook.asks"
          class="info-asks">
          <p>
            {{
              formatToLocale(language, item[0])
            }}
          </p>
          <p>
            {{
              formatToLocale(language, item[1], 6)
            }}
          </p>
        </div>
      </div>
      <div class="infos-div">
        <p class="heading">
          {{ $t("trading.orderBook.buying") }}
        </p>
        <div class="subtitles">
          <p>
            {{
              $t("trading.orderBook.price", {
                currency: currency,
              })
            }}
          </p>
          <p>
            {{ $t("trading.orderBook.amount") }}
          </p>
        </div>
        <div
          v-if="coinOrderBook"
          v-for="item in coinOrderBook.bids"
          class="info-bids">
          <p>
            {{
              formatToLocale(language, item[0])
            }}
          </p>
          <p>
            {{
              formatToLocale(language, item[1], 6)
            }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.order-book {
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

.order-book-info {
  display: flex;
  width: 100%;
  justify-content: space-evenly;
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
  width: 50%;
}
p {
  width: 90px;
  text-align: center;
}
.info-asks,
.info-bids {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}

.info-asks {
  color: green;
}

.info-bids {
  color: red;
}
</style>
