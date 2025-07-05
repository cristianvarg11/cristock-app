import { object, number, array, nativeEnum } from "zod";

import {
  EStockResponseType,
  stockLookupSchema,
  stockValueSchema,
} from "./stocks";

export const stocksLookupResponseSchema = object({
  count: number(),
  result: array(stockLookupSchema),
});

export const stocksDataValuesResponseSchema = object({
  type: nativeEnum(EStockResponseType),
  data: array(stockValueSchema),
});
