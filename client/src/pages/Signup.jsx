/* eslint-disable react/prop-types */
import {Link} from "react-router-dom"
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input} from "@nextui-org/react";


export default function Signup(props) {
  

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
              
              <ModalHeader className="flex flex-col gap-1">Sign Up</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Username"
                  placeholder="Enter a username"
                  variant="bordered"
                />
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
                  <Link className="text-primary" size="sm">
                   Already a user?
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={props.onClose} name="closeSignup">
                  Close
                </Button>
                <Button color="primary" >
                  Sign up
                </Button>
              </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
