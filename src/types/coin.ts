interface Coin {
  name: string;
  code: string;
  category: "utility token" | "cryptocurrencies";
  famous: boolean;
}

export default Coin;