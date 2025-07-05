import { infer as zInfer } from "zod";

import {
  stocksDataValuesResponseSchema,
  stocksLookupResponseSchema,
} from "../schemas/stock-responses";
import {
  localStorageStockSchema,
  stockLookupSchema,
  stockQuoteSchema,
  stockValueSchema,
} from "../schemas/stocks";

export type TLocalStorageStock = zInfer<typeof localStorageStockSchema>;
export type TStockLookup = zInfer<typeof stockLookupSchema>;
export type TStockValue = zInfer<typeof stockValueSchema>;
export type TStockQuote = zInfer<typeof stockQuoteSchema>;

//--- Response related types
export type TStockLookupResponse = zInfer<typeof stocksLookupResponseSchema>;
export type TStocksData = zInfer<typeof stocksDataValuesResponseSchema>;
