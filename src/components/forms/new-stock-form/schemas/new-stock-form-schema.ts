import { object, string, infer as zInfer } from "zod";

export const newStockFormSchema = object({
  newStockSymbol: object({
    value: string(),
    label: string(),
  }),
  newStockAlertPrice: string(),
});

export type TNewStockForm = zInfer<typeof newStockFormSchema>;
