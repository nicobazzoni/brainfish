import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';

const FlyingObject = ({ position, velocity }) => {
  const ref = useRef();

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    ref.current.position.z = position[2] + Math.sin(elapsedTime) * velocity;
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial color="black" />
    </mesh>
  );
};

const FlyingObjects = ({ count = 100 }) => {
  // Generate initial positions and velocitie
  const [objects] = useState(() => {
    return new Array(count).fill().map(() => ({
      position: [Math.random() * 20 - 5, Math.random() * 20 - 5, Math.random() * 20 - 5],
      velocity: Math.random() * 0.6 + 0.1
    }));
  });

  return (
    <>
      {objects.map((obj, idx) => (
        <FlyingObject key={idx} position={obj.position} velocity={obj.velocity} />
      ))}
    </>
  );
};

export default FlyingObjects;
