import { useEffect, useRef, useState } from "react";
import classes from "./styles/Home.module.css";
import CardsArea from "./components/Cards/CardsArea";
import Input from "./components/Input";
import Instructions from "./components/Instructions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { sendUserRide } from "./lib/api/sendUserRide";
import { validatePinCode } from "./lib/validation";
import { cardActions } from "./store/card-slice";
import SelectedRide from "./components/SelectedRide";
import useBtnScroller from "./Hooks/useBtnScroller";
import { getRidesData } from "./lib/api/getRidesData";
import moment from "moment";

function App() {
  //set state for rides
  const [rides, setRides] = useState([]);
  // Set up Redux state variables
  const dispatch = useDispatch();
  const pinCode = useSelector((state) => state.card.pinCode);
  const access_code = useSelector(
    (state) => state.card.selectedTickectInfo.access_code
  );
  const selectedTickectInfo = useSelector(
    (state) => state.card.selectedTickectInfo
  );
  const selectedRideId = useSelector((state) => state.card.selectedRideId);

  // Create refs to be used by the 'useBtnScroller' hook
  const appContainerRef = useRef(null);
  const buttonRef = useRef(null);
  const cardAreaRef = useRef(null);

  // Call the 'useBtnScroller' hook passing the refs and the 'access_code' variable
  useBtnScroller(appContainerRef, cardAreaRef, buttonRef, access_code);

  //Request rides from API function
  function getRidesDetails() {
    (async () => {
      try {
        const ridesDetails = await getRidesData();
        setRides(ridesDetails);
      } catch (error) {
        toast.error(error);
      }
    })();
  }

  //Call request function every refresh
  useEffect(getRidesDetails, []);

  // Define a function to get the access code for a ride (called by the Submit button)
  const getAccessCode = async () => {
    try {
      // Check if there is any ride stored in local storage
      const localStorageRideInfo =
        process.env.REACT_APP_LOCAL_STORAGE_RIDE_INFO;
      const storedData = JSON.parse(localStorage.getItem(localStorageRideInfo));

      // If there is a ride stored and it's not expired, show the access code and return time in toast
      if (storedData) {
        const { access_code, return_time } = storedData.ticketDetails;
        const isExpired = moment().isAfter(moment(return_time));

        if (isExpired) {
          localStorage.removeItem(localStorageRideInfo);
        } else {
          const message = `Oops! You already have a ride.\n Your access code is: ${access_code} \nThe return time is: ${moment(
            return_time
          ).format("HH:mm")}\n\n Happy riding!`;

          toast(message, {
            duration: 6000,
            icon: "❗",
          });

          return;
        }
      }

      // If there is no stored ride, validate the entered PIN code
      const isPinCodeValid = validatePinCode(pinCode);

      if (!isPinCodeValid) {
        toast.error("PIN is incorrect.");
        return;
      }
      // Send a request to the server to book the ride with the pin code and ride ID
      const ticketDetails = await sendUserRide(pinCode, selectedRideId);

      if (ticketDetails.message) {
        toast.error(ticketDetails.message);
        return;
      }

      // Store the ticket details in localStorage
      localStorage.setItem(
        localStorageRideInfo,
        JSON.stringify({ ticketDetails })
      );

      // Update the selected ticket details in the Redux store
      dispatch(cardActions.setBookedTicketDetails({ ticketDetails }));
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className={classes.appContainer} ref={appContainerRef}>
      <div className={classes.homePageContainer}>
        <div className={classes.title}>
          The Jungle
          <span className={classes.tm}> ™ </span>
          FastRide Service
        </div>
        {!access_code ? (
          [
            <Instructions key="Instructions" />,
            <Input
              key="Input"
              pinCode={pinCode}
              getAccessCode={getAccessCode}
              selectedRideId={selectedRideId}
              ref={buttonRef}
            />,
            <CardsArea
              key="CardsArea"
              rides={rides}
              selectedRideId={selectedRideId}
              ref={cardAreaRef}
            />,
          ]
        ) : (
          <SelectedRide selectedTickectInfo={selectedTickectInfo} />
        )}
      </div>
    </div>
  );
}

export default App;
