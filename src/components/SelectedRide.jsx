import React from "react";
import IconBaner from "./IconBaner";
import classes from '../styles/SelectedRide.module.css'
import tick from '../assets/tick.png'
import useFormatDate from "../Hooks/useFormatDate";

const selectedTicketIcon = {
    src: tick,
    alt: 'tick',
    content: 'Thank you for using The Jungle™ FastRider ticket system - your access code is now ready!'
}
const SelectedRide = ({ selectedTickectInfo: { ride: { zone: { name: zoneName, color: styleColor }, name }, return_time, access_code } }) => {
    const formatDate = useFormatDate(return_time);
    return (

        <div className={classes.container}>
            <IconBaner src={selectedTicketIcon.src} alt={selectedTicketIcon.alt} content={selectedTicketIcon.content} />
            <div className={classes.ticketInfoWrapper} >
                <div className={classes.lineColor} style={{ backgroundColor: styleColor }} />
                <div className={classes.rideInfoWrapper}>
                    <div className={classes.zoneWrapper}>
                        <div className={classes.rideName}>{name}</div>
                        <div className={classes.zone}>{zoneName}</div>
                    </div>
                    <div className={classes.returnTimeWrapper}>
                        <div className={classes.returnAt}>Return At</div>
                        <div className={classes.emphasisText}>
                            {formatDate}
                        </div>
                    </div>
                    <div className={classes.accesCodeWrapper}>
                        <div>Use Access Code</div>
                        <div className={classes.emphasisText}>{access_code}</div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default SelectedRide;
