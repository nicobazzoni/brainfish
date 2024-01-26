import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import { CameraControls, OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';

const Model = ({ url }) => {
    const gltf = useLoader(GLTFLoader, url);
    const ref = useRef();
    const mixer = useRef(new THREE.AnimationMixer(null));

    useEffect(() => {
        if (gltf.animations.length) {
            mixer.current = new THREE.AnimationMixer(gltf.scene);
            gltf.animations.forEach((clip) => {
                const action = mixer.current.clipAction(clip);
                action.play();
            });
        }

        return () => mixer.current?.stopAllAction();
    }, [gltf]);

    useFrame((state, delta) => mixer.current?.update(delta));

    return <primitive object={gltf.scene} ref={ref} />;
};

const GLBViewer = ({ url }) => {
    return (
      <Canvas  camera={{ position: [0, 2, 5], fov: 100 }}>
       <OrbitControls autoRotate autoRotateSpeed={1.0} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.3} />
        <Suspense fallback={null}>
          <Model url={url} />
        </Suspense>
        <OrbitControls target={[0, 1, 0]} />
      </Canvas>
    );
  };

export default GLBViewer;
