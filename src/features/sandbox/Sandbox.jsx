import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './testReducer';
import { openModal } from '../../app/common/modals/modalReducer';
import TestPlacesInput from './TestPlacesInput';
import TestMap from './TestMap';

export default function Sandbox() {
  const data = useSelector(state => state.test.data);
  const dispatch = useDispatch();

  const [location, setLocation] = useState({
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  });

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
      <Button
        content="Open Modal"
        color="teal"
        onClick={() =>
          dispatch(openModal({ modalType: 'TestModal', modalProps: { data } }))
        }
      />
      <div style={{ marginTop: 15 }}>
        <TestPlacesInput setLocation={setLocation} />
        <TestMap location={location} />
      </div>
    </>
  );
}
