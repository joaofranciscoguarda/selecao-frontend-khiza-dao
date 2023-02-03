import axios from "axios";
import baseUrl from "../services/api";
import ICoinTrades from "../types/trades";
import ICoin from "../types/coin";
import ICoinTickers from "../types/ticker";
import ICoinOrderBook from "../types/orderbook";
import CoinList from "../CoinList/coins";
import { defineStore } from "pinia";

export interface IState {
  language: string;
  selectedCoin: ICoin;
  coinTrades: ICoinTrades[];
  coinTicker: ICoinTickers;
  coinOrderBook: ICoinOrderBook;
  dayVariation: number;
  currency: string;
}


export const useStore = defineStore("coin", {
  state: () =>
    ({
      language: localStorage.getItem(
        "@khiza:user-locale"
      ),
      selectedCoin: CoinList.find(
        (item) => item.code === "BTC"
      ) as ICoin,
      coinTrades: [{}] as ICoinTrades[],
      coinTicker: {} as ICoinTickers,
      coinOrderBook: {} as ICoinOrderBook,
      dayVariation: 0 as number,
      currency: "R$",
    } as IState),
  getters: {
    getLanguage(state) {
      return state.language;
    },
    getSelectedCoin: (state) =>
      state.selectedCoin,
    getCoinTrades: (state) => state.coinTrades,
    getCoinTicker: (state) => state.coinTicker,
    getCoinOrderBook: (state) =>
      state.coinOrderBook,
    getDayVariation: (state) =>
      state.dayVariation,
  },
  actions: {
    async fetchCoinTicker(): Promise<ICoinTickers> {
      try {
        const { code } = this.selectedCoin;

        const data = await axios.get(
          baseUrl + code + "/ticker/"
        );

        console.log(data.data);

        return (this.coinTicker = data.data);
      } catch (error) {
        alert(error);
        console.log(error);
        return {} as ICoinTickers;
      }
    },
    async fetchCoinTrades() {
      try {
        const { code } = this.selectedCoin;

        const data = await axios.get(
          baseUrl + code + "/trades/"
        );

        console.log(data.data);

        this.coinTrades = data.data;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async fetchCoinOrderBook() {
      try {
        const { code } = this.selectedCoin;

        const data = await axios.get(
          baseUrl + code + "/orderbook/"
        );

        console.log(data.data);

        this.coinOrderBook = data.data;
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    calcDayVariation() {
      this.dayVariation =
        (parseInt(this.coinTicker.ticker.last) /
          parseInt(this.coinTicker.ticker.open) -
          1) *
        100;
    },
  },
});
