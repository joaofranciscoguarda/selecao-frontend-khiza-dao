interface ICoinTrades {
  amount: number;
  date: number;
  price: number;
  tid: number;
  type: "buy" | "sell";
}

export default ICoinTrades;
