import React from 'react';
import { Button } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './testReducer';

export default function Sandbox() {
  const data = useSelector(state => state.test.data);
  const dispatch = useDispatch();

  return (
    <>
      <h1>Testing 123</h1>
      <h3>Data: {data}</h3>
      <Button
        content="Increment"
        color="teal"
        onClick={() => dispatch(increment(10))}
      />
      <Button
        content="Decrement"
        color="red"
        onClick={() => dispatch(decrement(2))}
      />
    </>
  );
}
