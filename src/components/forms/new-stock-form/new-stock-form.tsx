"use client";

import { InputForm } from "@/components/ui/input-to-forms";
import { Form } from "@/components/ui/form";
import { Card } from "@/components/ui/card";

import { useNewStockFormHandler } from "./handlers/new-stock-form-handler";
import { handleOnlyNumbers } from "../utils/handle-input-behavior";
import { AsyncSelectInput } from "@/components/ui/aycn-select-to-forms";
import { Button } from "@/components/ui/button";

export const NewStockForm = () => {
  const { newStockFormInstance, getStocksToSelect, onSaveNewStock } =
    useNewStockFormHandler();

  return (
    <Card className="w-full p-5">
      <h1 className="text-2xl font-bold mb-6 text-center">Add your new stock 🤑</h1>

      <Form {...newStockFormInstance}>
        <AsyncSelectInput
          name="newStockSymbol"
          label="Select a stock"
          placeholder="Search stocks..."
          loadOptions={getStocksToSelect}
          required
        />

        <InputForm
          control={newStockFormInstance.control}
          label="Alert price for new stock"
          placeholder="Enter alert price"
          onKeyPress={handleOnlyNumbers}
          name="newStockAlertPrice"
          type="number"
        />

        <Button
          onClick={onSaveNewStock}
          disabled={!newStockFormInstance.formState.isValid}
        >
          Save new stock
        </Button>
      </Form>
    </Card>
  );
};
