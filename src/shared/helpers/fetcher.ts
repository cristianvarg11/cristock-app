import axios from "axios";

export const fetcher = async <ReturnType>(url: string) => {
  const req = await axios.get<ReturnType>(url);

  return req.data;
};
