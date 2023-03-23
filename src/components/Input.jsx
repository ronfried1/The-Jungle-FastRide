import React from "react";
import classes from "../styles/Input.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cardActions } from "../store/card-slice";

const Input = React.forwardRef(({ pinCode, getAccessCode, selectedRideId }, ref) => {
  const dispatch = useDispatch();
  const handleBlur = (event) => {
    const {
      target: { value },
    } = event;
    dispatch(cardActions.setPinCode({ pinCode: value }));
  }

  return (
    <div className={classes.inputWrapper}>
      <input
        type="text"
        className={classes.pinInput}
        placeholder="#PIN"
        onChange={handleBlur}
        defaultValue={pinCode}
      />
      <button className={classes.sendBtn} onClick={getAccessCode} ref={ref} disabled={!pinCode || !selectedRideId}
      >Submit</button>
    </div>
  );
});
Input.displayName = 'Input';

export default Input