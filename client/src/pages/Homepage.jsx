// import React from "react";
import { useState, useEffect } from "react";
import { Card, Button, Input } from "@nextui-org/react";
import { GoStar, GoStarFill } from "react-icons/go";
import axios from "axios";
export default function Homepage() {
  const [isActive, setIsActive] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

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

  // Actual searched value
  const [keyword, setKeyWord] = useState("");

  const handleChange = (e) => {
    const target = e.target;
    // this tracks the concert category
    if (target.name === "keyword") {
      const val = target.value;
      setKeyWord(val);
    }
  };

  // Handles form submission logic
  // eslint-disable-next-line no-unused-vars
  const handleSubmit = async (e) => {
    console.log(`inside handleSubmit`);
    let query = keyword;

    const queryStr = query.split(" ").join("%20");

    const search = await axios.get(
      `https://app.ticketmaster.com/discovery/v2/events?apikey=6VG1H9q8TAXG27aR4KLRsAbAgg5pkAY1&keyword=${queryStr}&locale=*&classificationName=music&preferredCountry=us`
    );

    if (!search) {
      console.log(`There was an error could not find info`);
      return;
    }

    console.log("This is the result:", search.data._embedded.events);
  };
  return (
    <Card className="purple-dark bg-primary-50 text-primary-900 justify-center w-full">
      <div className="homePageTitle font-bold text-5xl mb-5 mt-10 ml-10">
        <h1>BookItBash</h1>
        {/* try using an onChange function for the mobile view of the h1 */}
        {isMobile && <h2>Fulfill all your booking needs!</h2>}
        <div className="flex justify-center min-[425px]:justify-start
         min-[425px]:flex-nowrap min-[425px]:w-[175%] 
         min-[375px]:justify-start min-[375px]:w-[175%] 
         min-[320px]:justify-start min-[320px]:w-[175%]">
          <div className="flex w-[50%] md:flex-nowrap mb-6 md:mb-0 gap-4 mt-12.5">
            <Input
              className="h-[55px]"
              type="text"
              label="Search by Artist, Venue, City or State"
              name="keyword"
              value={keyword}
              onChange={handleChange}
            />
            <Button
              className="text-base w-[80.69px] h-[55px] px-16px rounded-medium bg-primary-900 text-primary-50"
              onClick={handleSubmit}
            >
              Find
            </Button>
          </div>
        </div>
      </div>

      <Card className="h-[10rem] space-y-5 p-4 bg-primary-900 rounded-xl mb-1 mx-1">
        <div className="eventDetails">
          <div className="flex flex-row w-full justify-between">
            <img src="" alt="Event Image" />
            <button>
              {isActive ? (
                <GoStarFill
                  onClick={() => {
                    setIsActive(!isActive);
                  }}
                  className="w-[30px] h-[30px] text-secondary-50"
                />
              ) : (
                <GoStar
                  onClick={() => {
                    setIsActive(!isActive);
                  }}
                  className="w-[30px] h-[30px] text-secondary-50"
                />
              )}
            </button>
          </div>

          <h1 className="eventTitle text-primary-50 font-bold">Test</h1>
          <h2 className="text-primary-50">Description</h2>
          <div className="buyTicketButton">
            <Button
              radius="full"
              className="bg-gradient-to-tr 
              from-primary-900 to-primary-500 
              text-primary-50 shadow-lg w-full"
            >
              Click to see more
            </Button>
          </div>
        </div>
      </Card>
      <Card className="h-[10rem] space-y-5 p-4 bg-primary-900 rounded-xl mb-1 mx-1">
        <div className="eventDetails">
          <img src="" alt="Event Image" />
          <h1 className="eventTitle text-primary-50 font-bold">Test</h1>
          <h2 className="text-primary-50">Description</h2>
        </div>
      </Card>
    </Card>
  );
}
