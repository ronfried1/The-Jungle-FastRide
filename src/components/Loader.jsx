import React from "react";
import classes from "../styles/Loader.module.css";

const Loader = () => {
    return (
        <div className={classes.container}>
            <div className={classes.loader}>
                <div className={classes.loader_circle}></div>
            </div>
        </div>
    );
};

export default Loader;
