/* eslint-disable react/prop-types */
// import {Link} from "react-router-dom";
import {useState} from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input} from "@nextui-org/react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";


export default function Signup(props) {
  // set initial form state
  const [userFormData, setUserFormData] = useState({username: "", email: "", password: ""});
  
  const [addUser] = useMutation(ADD_USER);
  
  const handleInputChange = (e)=>{
    const {name, value} = e.target;
    setUserFormData({...userFormData, [name]: value})
  }
  
  const handleSubmit = async() =>{
    // e.preventDefault();
    try{
      const { data } = await addUser({
        variables: { ...userFormData },
      });
     

      Auth.login(data.addUser.token);
    }catch(err){
      console.error(err)
    }

    setUserFormData({
      username: "",
      email: "",
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
              
              <ModalHeader className="purple-dark text-primary-50 flex flex-col gap-1">Sign Up</ModalHeader>
              <ModalBody className="purple-dark text-primary-900">
                <Input
                  autoFocus
                  label="Username"
                  placeholder="Enter a username"
                  variant="bordered"
                  name="username"
                  className="purple-dark bg-foreground rounded-large"
                  value={userFormData.username}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  autoFocus
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                  name="email"
                  className="purple-dark bg-foreground rounded-large"
                  value={userFormData.email}
                  onChange={handleInputChange}
                  required
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
                  required
                />
                <div className="flex py-2 px-1 justify-between">
                  {/* <Link className="text-primary" size="sm" name='login' onClick={props.handleShowForm}>
                   Already a user?
                  </Link> */}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" className="text-foreground hover:opacity-80"  onPress={props.onClose} name="closeSignup">
                  Close
                </Button>
                <Button className="bg-primary-50 text-primary-900 hover:opacity-80"  onPress={handleSubmit}>
                  Sign up
                </Button>
              </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
