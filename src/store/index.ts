import axios from "axios";
import baseUrl from "../services/api";
import ICoinTrades from "../types/trades";
import ICoin from "../types/coin";
import ICoinTickers from "../types/ticker";
import ICoinOrderBook from "../types/orderbook";
import CoinList from "../CoinList/coins";
import { defineStore } from "pinia";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { ref } from "vue";

export interface IState {
  language: string;
  selectedCoin: ICoin;
  coinTrades: ICoinTrades[];
  coinTradesFilter: ICoinTrades[];
  coinTicker: ICoinTickers;
  coinOrderBook: ICoinOrderBook;
  dayVariation: number;
  currency: string;
  date: Date[];
  startDate: Date;
  endDate: Date;
  isDateFilterActive: boolean;
}

const endDate = ref(new Date());

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
      coinTradesFilter: [{}] as ICoinTrades[],
      coinTicker: {} as ICoinTickers,
      coinOrderBook: {} as ICoinOrderBook,
      dayVariation: 0 as number,
      currency: "R$",
      date: [
        new Date(
          new Date().setDate(
            Math.floor(
              endDate.value.getDate() - 7
            )
          )
        ),
        new Date(),
      ] as Date[],
      isDateFilterActive: false,
    } as IState),
  actions: {
    async fetchCoinTicker(): Promise<ICoinTickers> {
      try {
        const { code } = this.selectedCoin;

        const data = await axios.get(
          baseUrl + code + "/ticker/"
        );
        console.log(this.coinTicker);

        return (this.coinTicker = data.data);
      } catch (error) {
        toast.error(
          "Something went wrong, check console log"
        );
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
        const newData: ICoinTrades[] = data.data;

        console.log(this.coinTrades);

        this.coinTrades = newData
          .reverse()
          .splice(0, 30);
      } catch (error) {
        toast.error(
          "Something went wrong, check console log"
        );
        console.log(error);
      }
    },
    async fetchCoinOrderBook() {
      try {
        const { code } = this.selectedCoin;

        const data = await axios.get(
          baseUrl + code + "/orderbook/"
        );

        const newData: ICoinOrderBook = data.data;

        newData.asks.splice(13);
        newData.bids.splice(13);

        console.log(this.coinOrderBook);

        this.coinOrderBook = newData;
      } catch (error) {
        toast.error(
          "Something went wrong, check console log"
        );
        console.log(error);
      }
    },
    async fetchCoinTradeFilteredByDate(
      startDate: Date,
      endDate: Date
    ) {
      try {
        const { code } = this.selectedCoin;

        const data = await axios.get(
          baseUrl +
            code +
            "/trades/" +
            Math.floor(
              this.date[0].getTime() / 1000
            ) +
            "/" +
            Math.floor(
              this.date[1].getTime() / 1000
            ) +
            "/"
        );
        const newData: ICoinTrades[] = data.data;

        this.coinTrades = newData.reverse();
      } catch (error) {
        toast.error(
          "Something went wrong, check console log"
        );
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
    filterResults() {
      this.fetchCoinTradeFilteredByDate(
        this.date[0],
        this.date[1]
      );

      this.isDateFilterActive = true;

      toast.success(
        "Filtered between " +
          this.date[0] +
          " and " +
          this.date[1]
      );
    },
    resetFilter() {
      this.fetchCoinTrades();

      this.isDateFilterActive = false;
    },
    changeLanguage() {
      const language =
        this.language === "pt" ? "en" : "pt";
      this.language = language;
      localStorage.clear();
      localStorage.setItem(
        "@khiza:user-locale",
        language
      );
      location.reload();
    },
  },
});
