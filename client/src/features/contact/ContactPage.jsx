import { Button, ButtonGroup, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
// import {
//   decrement,
//   DECREMENT_COUNTER,
//   increment,
//   INCREMENT_COUNTER,
// } from "./counterReducer";
import { decrement, increment } from "./counterSlice";

export default function ContactPage() {
  const dispatch = useDispatch();
  // const { data, title } = useSelector((state) => state);
  // const data = useSelector((state) => state.data);
  // const title = useSelector((state) => state.title);

  const { data, title } = useSelector((state) => state.counter);

  return (
    <>
      <Typography variant="h2">{title}</Typography>
      <Typography variant="h5">The data is: {data}</Typography>
      <ButtonGroup>
        <Button
          // onClick={() => dispatch({ type: DECREMENT_COUNTER })}
          // onClick={() => dispatch(decrement())}
          onClick={() => dispatch(decrement(1))}
          variant="contained"
          color="error"
        >
          Decrement
        </Button>
        <Button
          // onClick={() => dispatch({ type: INCREMENT_COUNTER })}
          // onClick={() => dispatch(increment())}
          onClick={() => dispatch(increment(1))}
          variant="contained"
          color="primary"
        >
          Increment
        </Button>
        <Button
          onClick={() => dispatch(increment(5))}
          variant="contained"
          color="primary"
        >
          Increment by 5
        </Button>
      </ButtonGroup>
    </>
  );
}
