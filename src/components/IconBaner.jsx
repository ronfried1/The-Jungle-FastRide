import React from "react";
import classes from "../styles/IconBaner.module.css";

const IconBaner = (props) => {
  const { src, alt, content } = props;

  return (
    <div className={classes.container}>
      <img src={src} alt={alt} className={classes.img} />
      <div className={classes.content}>{content}</div>
    </div>
  );
};

export default IconBaner;
