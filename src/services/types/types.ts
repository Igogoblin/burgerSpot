export type ICreateOrderResponse = {
  success: boolean;
  name: string;
  order: {
    number: number;
  };
};

export type IOrderState = {
  number: number | null;
  isLoading: boolean;
  error: string | null;
};
