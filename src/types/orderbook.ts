interface ICoinOrderBook {
  asks: [number[]];
  bids: [number[]];
  timestamp: number;
}

export default ICoinOrderBook;
