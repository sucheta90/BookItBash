import { Card } from "@nextui-org/react";
import { FaUser } from "react-icons/fa";
import Auth from "../utils/auth";
 

export default function Profile(){
    
    return (
        <Card className="purple-dark bg-primary-50 text-primary-900 justify-center w-full">
            <Card className="h-[10rem] p-4 bg-primary-900 rounded-xl my-1 mx-1 flex-row">
                <div className="mr-1">
                 <FaUser className="bg-foreground text-primary-500 w-[80px] h-[80px] rounded-full"/>   
                </div>
                <div className="purple-dark text-primary-50">
                    <h1 className="font-bold text-xl mb-10">Username: {Auth.loggedIn()? "Username": ""}</h1>
                    <h1 className="font-bold text-xl my-10">Email: {Auth.loggedIn()? "email": ""}</h1>
                    <h1 className="font-bold text-xl my-10">Password:</h1>
                </div>
            </Card>
        </Card>
    )
}