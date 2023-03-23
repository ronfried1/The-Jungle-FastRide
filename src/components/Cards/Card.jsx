import React from "react";
import classes from "../../styles/Card.module.css";
import ticket from '../../assets/ticket.png'
import clock from '../../assets/clock.png'
import useFormatDate from "../../Hooks/useFormatDate";


const Card = ({ isSelected, card, onClick }) => {
  const {
    zone: { name: zoneName, color: styleColor },
    name,
    return_time,
    remaining_tickets,
  } = card;
  const formatDate = useFormatDate(return_time)
  return (
    <div
      role="button"
      tabIndex={0}
      className={`${classes.rideInfo}`}
      style={isSelected ? { backgroundColor: styleColor } : {}}
      onClick={onClick}
    >
      <div
        className={classes.lineColor}
        style={{ backgroundColor: styleColor }}
      />
      <div className={classes.content}>
        <div className={classes.zone}>{zoneName}</div>
        <div className={classes.rideName}>{name}</div>
        <div className={classes.bottomInfoLine}>
          <div className={classes.returnTimeWrapper}>
            <img
              src={clock}
              alt="return time"
              className={classes.img}
            />
            <div>{formatDate}</div>
          </div>
          <div className={classes.availableTicketsWrapper}>
            <img
              src={ticket}
              alt="remaining tickects"
              className={classes.img}
            />
            <div>{remaining_tickets}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

