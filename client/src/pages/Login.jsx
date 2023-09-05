/* eslint-disable react/prop-types */

// eslint-disable-next-line no-unused-vars
import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Link} from "@nextui-org/react";


export default function Login(props) {
  
  return (
    <>
      <Modal 
        // eslint-disable-next-line react/prop-types
        isOpen={props.isOpen} 
        // eslint-disable-next-line react/prop-types
        onOpenChange={props.onOpenChange}
        placement="top-center"
        backdrop="blur"
      >
        <ModalContent>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                />
                <Input
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                />
                <div className="flex py-2 px-1 justify-between">
                  {/* <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                  >
                    Remember me
                  </Checkbox> */}
                  <Link color="primary" href="#" size="sm">
                    Signup Instead?
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={props.onClose} name="closeLogin">
                  Close
                </Button>
                <Button color="primary" >
                  Log in
                </Button>
              </ModalFooter>
            
        
        </ModalContent>
      </Modal>
    </>
  );
}
