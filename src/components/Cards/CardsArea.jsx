import React from "react";
import classes from "../../styles/CardArea.module.css";
import Card from "./Card";
import { useDispatch } from "react-redux";
import { cardActions } from "../../store/card-slice";
import Loader from "../Loader";

const CardArea = React.forwardRef(({ rides, selectedRideId }, ref) => {
  const dispatch = useDispatch();
  const handleRideCardClick = (ridId) => {
    //add logic to add this id to the selectedid in the store
    dispatch(cardActions.setSelectedRideId({ id: ridId }));
  };
  return (
    <div className={classes.ridesCardsWrapper} ref={ref}>
      {!rides.length && <Loader />}
      {rides.map((ride) => (
        <Card
          card={ride}
          key={ride.id}
          onClick={() => handleRideCardClick(ride.id)}
          isSelected={selectedRideId === ride.id}
        />
      ))}
    </div>
  );
});
CardArea.displayName = 'CardArea';

export default CardArea;
