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
  const [target, setTarget] = useState(null);
  const { loading } = useSelector(state => state.async);

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
        name="increment"
        loading={loading && target === 'increment'}
        content="Increment"
        color="teal"
        onClick={e => {
          dispatch(increment(10));
          setTarget(e.target.name);
        }}
      />
      <Button
        name="decrement"
        loading={loading && target === 'decrement'}
        content="Decrement"
        color="red"
        onClick={e => {
          dispatch(decrement(2));
          setTarget(e.target.name);
        }}
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
