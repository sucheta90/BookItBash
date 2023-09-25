// eslint-disable-next-line no-unused-vars
import { Card, Button, useDisclosure } from "@nextui-org/react";
import { FaUser } from "react-icons/fa";
import Auth from "../utils/auth";
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import {REMOVE_EVENT} from "../utils/mutations";
import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { GoStar, GoStarFill } from "react-icons/go";
import ProfileCardModal from "../components/Modals/ProfileCardModal";
// import { Navigate, useParams } from "react-router-dom";


export default function Profile() {
    // eslint-disable-next-line no-unused-vars
    const [isMobile, setIsMobile] = useState(true);
    const [activeStates, setActiveStates] = useState([]);
    const [openedEvent, setOpenedEvent] = useState(null); // for the modal button

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    // const { username: userParam } = useParams();
    const { loading, data } = useQuery( QUERY_ME);
    const [removeEvent] = useMutation(REMOVE_EVENT,{
      refetchQueries:[
        QUERY_ME, 
        'me'
      ]
      
    });

    const handleRemoveEvent = async (_id)=>{
      try{
        // eslint-disable-next-line no-unused-vars
        const { data } = await removeEvent({
          variables: {_id}
        });
      }catch(err){
        console.log(err);
      }
    }
    useEffect(() => {
        const change = () => {
          if (window.innerWidth <= 375) {
            setIsMobile(false);
          } else {
            setIsMobile(true);
          }
        };
        window.addEventListener("resize", change);
        return () => window.removeEventListener("resize", change);
      }, []);
      const toggleActive = (index) => {
        const updatedActiveStates = [...activeStates];
        updatedActiveStates[index] = !updatedActiveStates[index];
        setActiveStates(updatedActiveStates);
      };
    const user = data?.me || {};
    // navigate to personal profile page if username is yours
    // if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    //     return <Navigate to="/me" replace={true} />;
    // }
    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user?.username) {
        return (
            <div className="min-h-screen min-w-full purple-dark bg-primary-50 flex justify-center items-center">
              <h4 className="purple-dark text-primary-900 font-bold text-[30px]">
                You need to be logged in to see this. Use the navigation links above to
                sign up or log in!
            </h4>
            </div>
            
        );
    }
console.log(user.events);
    return (
        // if authenticated then show the profile of that user
        // need to loop over all of the saved via a loop on the array of events on the user
        <div className="purple-dark bg-primary-50 w-full min-h-screen">
        <Card className="purple-dark bg-primary-50 text-primary-900 justify-center w-full">
            <Card className="h-[11rem] p-4 bg-primary-900 rounded-xl my-1 mx-1 flex-row flex-wrap min-[375px]:h-[13rem] min-[320px]:h-[15rem]">
                <div className="mr-1">
                    <FaUser className="bg-foreground text-primary-500 w-[80px] h-[80px] rounded-full " />
                </div>
                <div className="purple-dark text-primary-50">
                    <h1 className={isMobile ? "font-bold text-xl mb-10" : "font-bold text-[18px] mb-10 block"}>Username: {Auth.loggedIn() ? user.username : ""}</h1>
                    <h1 className={isMobile ? "font-bold text-xl mb-10" : "font-bold text-[18px] mb-10 block"}>Email: {Auth.loggedIn() ? user.email : ""}</h1>
                    {/* <h1 className="font-bold text-xl my-10">Password:</h1> */}
                </div>
            </Card>
            {user.events.length > 0 ? user.events.map((result, index) => (
          <Card
            className="h-[12rem] space-y-5 p-4 bg-primary-900 rounded-xl mb-1 mx-1"
            key={result._id}
            id={result._id}
          >
            <div className="eventDetails">
              <div className="flex flex-row w-full justify-between">
                <img
                  src={result.image[0].link}
                  alt="Event Image"
                  className="w-[50px] h-[50px]"
                />
                <button>
                <GoStarFill
                      onClick={() => {
                        toggleActive(index);
                        handleRemoveEvent(result._id)
                      }}
                      className="w-[30px] h-[30px] text-secondary-50"
                    />
                  {/* {activeStates[index] ? (
                    <GoStar
                      onClick={() => {
                        toggleActive(index);
                        // handleSaveEvent(result);
                      }}
                      className="w-[30px] h-[30px] text-secondary-50"
                    />
                  ) : (
                    <GoStarFill
                      onClick={() => {
                        toggleActive(index);
                        handleRemoveEvent(result._id)
                      }}
                      className="w-[30px] h-[30px] text-secondary-50"
                    />
                  )} */}
                </button>
              </div>

              <h1 className="eventTitle text-primary-50 font-bold">
                {result.name}
              </h1>
              <h2 className="text-primary-50">
                {result.venue[0].name},{" "}
                {result.venue[0].cityName}
              </h2>
              {/* {console.log((`New Date obj ${new Date(result.dates.start.localDate)}`).split(" "))} */}
              <h2 className="text-primary-50">
                {result.date}
              </h2>
              <div className="buyTicketButton">
                <Button
                  radius="full"
                  className="bg-gradient-to-tr 
              from-primary-900 to-primary-500 
              text-primary-50 shadow-lg w-full"
                  onPress={() => {
                    onOpen();
                    setOpenedEvent(result);
                  }}
                >
                  {/* <Link to={result.url} className="purple-dark text-primary-50"> */}
                  Click to see more
                  {/* </Link> */}
                </Button>
              </div>
            </div>
            <ProfileCardModal
              onOpenChange={onOpenChange}
              isOpen={isOpen}
              event={openedEvent}
            />
          </Card>
        )) : ""}
        </Card>
        </div>
    )
}

// alert({message: "No events found"})