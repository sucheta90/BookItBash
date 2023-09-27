// import React from "react";
import { useState, useEffect } from "react";
import { Card, Button, Input, useDisclosure } from "@nextui-org/react";
import { GoStar, GoStarFill } from "react-icons/go";
import { useMutation } from "@apollo/client";
import { ADD_EVENT } from "../utils/mutations";
import CardModal from "../components/Modals/CardModal";
import axios from "axios";
import { QUERY_ME } from "../utils/queries";
import { concerts } from "../data/concert.js";

export default function Homepage() {
  const [isMobile, setIsMobile] = useState(true);
  const [searchData, setSearchData] = useState([]);
  const [updatedSearchData, setUpdatedSearchData] = useState([]);
  const [activeStates, setActiveStates] = useState([]);
  const [keyword, setKeyWord] = useState(""); // keyword search to fetch data
  const [openedEvent, setOpenedEvent] = useState(null); // for the modal button

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // Add event mutation
  // eslint-disable-next-line no-unused-vars
  const [addEvent, { error, loading, data }] = useMutation(ADD_EVENT, {
    refetchQueries: [QUERY_ME, "me"],
    onCompleted: () => {
      window.location.reload();
    },
  });

  console.log("Demo Data", concerts);

  // hook changes the state of isMobile on browser window resize
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

  // State sets keyword as search parameter
  const handleChange = (e) => {
    const target = e.target;
    // this tracks the concert category
    if (target.name === "keyword") {
      const val = target.value;
      setKeyWord(val);
    }
  };

  // Fetch call to the TicketMaster Api to get events based on user input and displayed on homepage as cards
  // eslint-disable-next-line no-unused-vars
  const handleSubmit = async (e) => {
    console.log(`inside handleSubmit`);
    let query = keyword;

    const queryStr = query.split(" ").join("%20").toLowerCase();

    const search = await axios.get(
      `https://app.ticketmaster.com/discovery/v2/events?apikey=6VG1H9q8TAXG27aR4KLRsAbAgg5pkAY1&keyword=${queryStr}&locale=*&classificationName=music&preferredCountry=us`
    );

    if (!search) {
      console.log(`There was an error could not find info`);
      return;
    }
    setSearchData([...search.data._embedded.events]);
    setActiveStates(Array(search.data._embedded.events.length).fill(false));
    console.log("This is the result:", search.data._embedded.events);
    console.log(searchData);
  };

  // Function toggles Star color fill
  const toggleActive = (index) => {
    const updatedActiveStates = [...activeStates];
    updatedActiveStates[index] = !updatedActiveStates[index];
    setActiveStates(updatedActiveStates);
  };

  const handleSaveEvent = async (result) => {
    console.log(result);
    const event = {
      eventId: result.id,
      genre: {
        genreId: result.classifications[0].genre.id,
        name: result.classifications[0].genre.name,
      },
      image: [
        {
          fallback: result.images[4].fallback,
          height: result.images[4].height,
          link: result.images[4].url,
          ratio: result.images[4].ratio,
          width: result.images[4].width,
        },
      ],
      name: result.name,
      priceRangeMax: result.priceRanges?.[0].max ?? 0,
      priceRangeMin: result.priceRanges?.[0].min ?? 0,
      segment: {
        name: result.classifications[0].segment.name,
        segmentId: result.classifications[0].segment.id,
      },
      subGenre: {
        name: result.classifications[0].subGenre?.name ?? "N/A",
        subGenreId: result.classifications[0].subGenre.id,
      },
      date: result.dates.start.localDate,
      ticketLink: result.url,
      type: result.type,
      venue: [
        {
          address: result._embedded.venues[0].address.line1,
          cityName: result._embedded.venues[0].city.name,
          name: result._embedded.venues[0].name,
          stateCode: result._embedded.venues[0].state?.stateCode ?? "N/A",
          stateName: result._embedded.venues[0].state.name,
          type: result._embedded.venues[0].type,
          venueId: result._embedded.venues[0].id,
        },
      ],
    };
    const updatedData = [...searchData, result];
    setUpdatedSearchData(updatedData);
    // eslint-disable-next-line no-unused-vars
    try {
      await addEvent({
        variables: {
          event: event,
        },
        onCompleted: (data) => {
          console.log("Mutation completed with data:", data);
        },
      });
    } catch (error) {
      console.log(error);

      setUpdatedSearchData(
        updatedSearchData.filter((event) => event.id !== result.id)
      );
    }
  };
  // if (error) {
  //   console.log(error);
  //   return;
  // }
  return (
    <>
      <Card className="purple-dark bg-primary-50 text-primary-900 justify-center w-full">
        <div className="homePageTitle font-bold text-5xl mb-5 mt-10 ml-10">
          <h1>BookItBash</h1>
          {/* try using an onChange function for the mobile view of the h1 */}
          {isMobile && <h2>Fulfill all your booking needs!</h2>}
          <div
            className="flex justify-center min-[425px]:justify-start
         min-[425px]:flex-nowrap min-[425px]:w-[175%] 
         min-[375px]:justify-start min-[375px]:w-[175%] 
         min-[320px]:justify-start min-[320px]:w-[175%]"
          >
            <div className="flex w-[50%] md:flex-nowrap mb-6 md:mb-0 gap-4 mt-12.5">
              <Input
                className="h-[100%]"
                type="text"
                label={isMobile ? "Search by Artist, Venue, City or State" : ""}
                placeholder={isMobile ? "" : "Search"}
                name="keyword"
                value={keyword}
                onChange={handleChange}
              />
              <Button
                className={
                  isMobile
                    ? "text-base w-[80.69px] h-[55px] px-16px rounded-medium bg-primary-900 text-primary-50"
                    : "text-base w-[80.69px] h-[40px] px-16px rounded-medium bg-primary-900 text-primary-50"
                }
                onClick={handleSubmit}
              >
                Find
              </Button>
            </div>
          </div>
        </div>

        {searchData.map((result, index) => (
          <Card
            className="h-[13rem] space-y-5 p-4 bg-primary-900 rounded-xl mb-1 mx-1"
            key={result.id}
            id={result.id}
          >
            <div className="eventDetails">
              <div className="flex flex-row w-full justify-between">
                <img
                  src={result.images[4].url}
                  alt="Event Image"
                  className="w-[50px] h-[50px]"
                />
                <button>
                  {activeStates[index] ? (
                    <GoStarFill
                      onClick={() => {
                        toggleActive(index);
                        // addevent
                      }}
                      className="w-[30px] h-[30px] text-secondary-50"
                    />
                  ) : (
                    <GoStar
                      onClick={() => {
                        toggleActive(index);
                        handleSaveEvent(result);
                      }}
                      className="w-[30px] h-[30px] text-secondary-50"
                    />
                  )}
                </button>
              </div>

              <h1 className="eventTitle text-primary-50 font-bold">
                {result.name}
              </h1>
              <h2 className="text-primary-50">
                {result._embedded.venues[0].name},{" "}
                {result._embedded.venues[0].city.name}
              </h2>
              {/* {console.log((`New Date obj ${new Date(result.dates.start.localDate)}`).split(" "))} */}
              <h2 className="text-primary-50">
                {result.dates.start.localDate}
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
            <CardModal
              onOpenChange={onOpenChange}
              isOpen={isOpen}
              event={openedEvent}
            />
          </Card>
        ))}

        {searchData.length === 0
          ? concerts.map((result, index) => (
              <Card
                className="h-[13rem] space-y-5 p-4 bg-primary-900 rounded-xl mb-1 mx-1"
                key={result.id}
                id={result.id}
              >
                <div className="eventDetails">
                  <div className="flex flex-row w-full justify-between">
                    <img
                      src={result.images[4].url}
                      alt="Event Image"
                      className="w-[50px] h-[50px]"
                    />
                    <button>
                      {activeStates[index] ? (
                        <GoStarFill
                          onClick={() => {
                            toggleActive(index);
                            // addevent
                          }}
                          className="w-[30px] h-[30px] text-secondary-50"
                        />
                      ) : (
                        <GoStar
                          onClick={() => {
                            toggleActive(index);
                            handleSaveEvent(result);
                          }}
                          className="w-[30px] h-[30px] text-secondary-50"
                        />
                      )}
                    </button>
                  </div>

                  <h1 className="eventTitle text-primary-50 font-bold">
                    {result.name}
                  </h1>
                  <h2 className="text-primary-50">
                    {result._embedded.venues[0].name},{" "}
                    {result._embedded.venues[0].city.name}
                  </h2>

                  <h2 className="text-primary-50">
                    {result.dates.start.localDate}
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
                      Click to see more
                    </Button>
                  </div>
                </div>
                <CardModal
                  onOpenChange={onOpenChange}
                  isOpen={isOpen}
                  event={openedEvent}
                />
              </Card>
            ))
          : ""}
      </Card>
    </>
  );
}
