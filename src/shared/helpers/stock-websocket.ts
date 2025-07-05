export const stockWebsocket = new WebSocket(
  `wss://ws.finnhub.io?token=${process.env.NEXT_PUBLIC_FINNHUB_API_KEY}`,
);
