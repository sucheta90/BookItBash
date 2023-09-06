/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

export default function CardModal({onOpen, onOpenChange, isOpen, event }) {
//   const {isOpen, onOpen, onOpenChange} = useDisclosure();
const [scrollBehavior, setScrollBehavior] = React.useState("inside");
  return (
    <>
      {/* <Button onPress={onOpen}>Open Modal</Button> */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} backdrop="blur" className="purple-dark bg-foreground" scrollBehavior={scrollBehavior} >
        <ModalContent className="purple-dark bg-primary-50">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{event.name}</ModalHeader>
              <ModalBody>
                <p> 
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                  dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. 
                  Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. 
                  Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur 
                  proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" className="text-primary-50" onPress={onClose}>
                  Close
                </Button>
                <Button className="bg-primary-500 text-primary-50" onPress={onClose}>
                  Buy Ticket
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
