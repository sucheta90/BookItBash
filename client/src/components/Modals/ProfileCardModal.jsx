/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

export default function ProfileCardModal({onOpen, onOpenChange, isOpen, event }) {
//   const {isOpen, onOpen, onOpenChange} = useDisclosure();
const [scrollBehavior, setScrollBehavior] = useState("inside");
  return (
    <>
      {/* <Button onPress={onOpen}>Open Modal</Button> */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} backdrop="blur" className="purple-dark bg-foreground" scrollBehavior={scrollBehavior} >
        <ModalContent className="purple-dark bg-primary-50">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 purple-dark text-primary-900">{event.name}</ModalHeader>
              <ModalBody className="purple-dark text-primary-900">
                <img src={event.image[0].link} alt="event image" className="w-[200px] h-[200px]" />
                <h2>Event Details:</h2>
                <p>Venue: {event.venue[0].name}</p>
                <p>{event.venue[0].address}</p>
                <p>{event.venue[0].cityName}, {event.venue[0].stateName}</p>
                <h2>Event Description:</h2>
                <p> 
                  {event.venue[0].name} is hosting a {event.segment.name.toLowerCase()} {event.type}. Types of music you will be able to listen
                  to at our event include {event.genre.name.toLowerCase()} music.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" className="text-primary-50" onPress={onClose}>
                  Close
                </Button>
                <Button className="bg-primary-500 text-primary-50" onPress={onClose}>
                 <a href={event.ticketLink} target= "_blank" rel="noreferrer" >Buy Ticket</a> 
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
