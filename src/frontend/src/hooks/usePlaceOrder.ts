import { useMutation } from "@tanstack/react-query";
import { useActor } from "./useActor";

interface PlaceOrderParams {
  customerName: string;
  phoneNumber: string;
  address: string;
  orderItems: string;
  totalPrice: string;
}

export function usePlaceOrder() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async (params: PlaceOrderParams) => {
      if (!actor) throw new Error("Actor not available");
      await actor.placeOrder(
        params.customerName,
        params.phoneNumber,
        params.address,
        params.orderItems,
        params.totalPrice,
      );
    },
  });
}
