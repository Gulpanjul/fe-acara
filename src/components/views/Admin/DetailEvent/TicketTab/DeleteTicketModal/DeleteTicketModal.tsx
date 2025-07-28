import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@nextui-org/react";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import useDeleteTicketModal from "./useDeleteTicketModal";
import { ITicket } from "@/types/Ticket";
import { set } from "react-hook-form";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refetchTicket: () => void;
  selectedDataTicket: ITicket | null;
  setselectedDataTicket: Dispatch<SetStateAction<ITicket | null>>;
}

const DeleteTicketModal = (props: PropTypes) => {
  const {
    isOpen,
    onClose,
    onOpenChange,
    refetchTicket,
    selectedDataTicket,
    setselectedDataTicket,
  } = props;

  const {
    mutateDeleteTicket,
    isPendingMutateDeleteTicket,
    isSuccessMutateDeleteTicket,
  } = useDeleteTicketModal();

  useEffect(() => {
    if (isSuccessMutateDeleteTicket) {
      onClose();
      refetchTicket();
      setselectedDataTicket(null);
    }
  }, [isSuccessMutateDeleteTicket]);

  return (
    <Modal
      onOpenChange={onOpenChange}
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
    >
      <ModalContent className="m-4">
        <ModalHeader>Delete Ticket</ModalHeader>
        <ModalBody>
          <p className="text-medium">
            Are you sure you want to delete this ticket?
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            variant="flat"
            onPress={() => {
              onClose();
              setselectedDataTicket(null);
            }}
            disabled={isPendingMutateDeleteTicket}
          >
            Cancel
          </Button>
          <Button
            color="danger"
            type="submit"
            disabled={isPendingMutateDeleteTicket}
            onPress={() => mutateDeleteTicket(`${selectedDataTicket?._id}`)}
          >
            {isPendingMutateDeleteTicket ? (
              <Spinner size="sm" color="white" />
            ) : (
              "Delete Ticket"
            )}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteTicketModal;
