/* eslint-disable react/prop-types */

// eslint-disable-next-line no-unused-vars
import React from "react";
import { useState } from "react";
import { LOGIN_USER } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input} from "@nextui-org/react";


export default function Login(props) {
  const [userFormData, setUserFormData] = useState({username:"", password:""});

  const [login, {error,data}] = useMutation(LOGIN_USER);
  if(error){
    console.log(`Error from useMutation Hook `);
    return
  }
  console.log(`Data form mutation hook`, data)

  function handleInputChange(e){
    const { name, value } = e.target;
    setUserFormData({ ...userFormData, [name]: value });
  }

  console.log(`is Logged in:`,Auth.loggedIn())
  
  async function handleSubmit(){
    try{
      const {data} = await login({
        variables: {...userFormData}
      });
      console.log(`getting data after login cred passed`, data)
      Auth.login(data.login.token)
    }catch(err){
      console.log(err)
      alert(err)
    }

    setUserFormData({
      username: "",
      password: ""
    })

  }
  
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
        <ModalContent className="purple-dark bg-primary-900">
              <ModalHeader className="purple-dark text-primary-50 flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody className="purple-dark text-primary-900">
                <Input
                  autoFocus
                  label="username"
                  placeholder="Enter your username"
                  variant="bordered"
                  name="username"
                  className="purple-dark bg-foreground rounded-large"
                  type="text"
                  value={userFormData.username}
                  onChange={handleInputChange}
                />
                <Input
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                  name="password"
                  className="purple-dark bg-foreground rounded-large"
                  value={userFormData.password}
                  onChange={handleInputChange}
                />
                <div className="flex py-2 px-1 justify-between">
                  {/* <Link color="primary"" size="sm">
                    Signup Instead?
                  </Link> */}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" className="text-foreground hover:opacity-80" onPress={props.onClose} name="closeLogin">
                  Close
                </Button>
                <Button className="bg-primary-50 text-primary-900 hover:opacity-80" onPress={handleSubmit}>
                  Log in
                </Button>
              </ModalFooter>
            
        
        </ModalContent>
      </Modal>
    </>
  );
}
