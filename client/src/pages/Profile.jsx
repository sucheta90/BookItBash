// eslint-disable-next-line no-unused-vars
import { Card, Button } from "@nextui-org/react";
import { FaUser } from "react-icons/fa";
import Auth from "../utils/auth";
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import { Navigate, useParams } from "react-router-dom";


export default function Profile() {
    const { username: userParam } = useParams();
    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
        variables: { username: userParam },
    });

    const user = data?.me || data?.user || {};
    // navigate to personal profile page if username is yours
    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
        return <Navigate to="/me" replace={true} />;
    }
    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user?.username) {
        return (
            <h4>
                You need to be logged in to see this. Use the navigation links above to
                sign up or log in!
            </h4>
        );
    }

    return (
        // if authenticated then show the profile of that user
        // need to loop over all of the saved via a loop on the array of events on the user
        <Card className="purple-dark bg-primary-50 text-primary-900 justify-center w-full">
            <Card className="h-[10rem] p-4 bg-primary-900 rounded-xl my-1 mx-1 flex-row">
                <div className="mr-1">
                    <FaUser className="bg-foreground text-primary-500 w-[80px] h-[80px] rounded-full" />
                </div>
                <div className="purple-dark text-primary-50">
                    <h1 className="font-bold text-xl mb-10">Username: {Auth.loggedIn() ? "Username" : ""}</h1>
                    <h1 className="font-bold text-xl my-10">Email: {Auth.loggedIn() ? "email" : ""}</h1>
                    <h1 className="font-bold text-xl my-10">Password:</h1>
                </div>
            </Card>
        </Card>
    )
}
