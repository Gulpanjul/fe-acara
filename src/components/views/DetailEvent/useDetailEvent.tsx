import eventServices from "@/services/event.service";
import ticketServices from "@/services/ticket.service";
import { ICart, ITicket } from "@/types/Ticket";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { defaultCart } from "./DetailEvent.constants";

const useDetailEvent = () => {
  const router = useRouter();
  const getEventBySlug = async () => {
    const { data } = await eventServices.getEventBySlug(`${router.query.slug}`);
    return data.data;
  };

  const { data: dataEvent } = useQuery({
    queryKey: ["EventBySlug"],
    queryFn: getEventBySlug,
    enabled: router.isReady,
  });

  const getTicketsByEventId = async () => {
    const { data } = await ticketServices.getTicketsByEventId(
      `${dataEvent._id}`,
    );
    return data.data;
  };

  const { data: dataTicket } = useQuery({
    queryKey: ["Tickets"],
    queryFn: getTicketsByEventId,
    enabled: !!dataEvent?._id,
  });

  const [cart, setCart] = useState<ICart>(defaultCart);

  const dataTicketInCart = useMemo(() => {
    if (dataTicket) {
      return dataTicket.find((ticket: ITicket) => ticket._id === cart.ticket);
    }
    return null;
  }, [dataTicket, cart]);

  const handleAddToCart = (ticket: string) => {
    setCart({
      events: dataEvent._id as string,
      ticket,
      quantity: 1,
    });
  };

  const handleChangeQuantity = (type: "increment" | "decrement") => {
    if (type === "increment") {
      if (cart.quantity < dataTicketInCart?.quantity) {
        setCart((prev: ICart) => ({
          ...prev,
          quantity: prev.quantity + 1,
        }));
      }
    } else {
      if (cart.quantity <= 1) {
        setCart(defaultCart);
      } else {
        setCart((prev: ICart) => ({
          ...prev,
          quantity: prev.quantity - 1,
        }));
      }
    }
  };

  return {
    dataEvent,
    dataTicket,
    dataTicketInCart,
    handleAddToCart,
    handleChangeQuantity,
    cart,
  };
};

export default useDetailEvent;
