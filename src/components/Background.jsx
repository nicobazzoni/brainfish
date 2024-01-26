import { useThree } from '@react-three/fiber' 
import { useLoader } from '@react-three//fiber'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { useEffect } from 'react';
import * as THREE from 'three';
const HDREnvironment = ({ path }) => {
    const { gl, scene } = useThree();
    const hdrTexture = useLoader(RGBELoader, path);
  
    useEffect(() => {
      const pmremGenerator = new THREE.PMREMGenerator(gl);
      pmremGenerator.compileEquirectangularShader();
      const envMap = pmremGenerator.fromEquirectangular(hdrTexture).texture;
  
      scene.environment = envMap;
      scene.background = envMap;
  
      hdrTexture.dispose();
      pmremGenerator.dispose();
  
      return () => {
        scene.environment = null;
        scene.background = null;
      };
    }, [hdrTexture, gl, scene]);
  
    return null;
  };

  export default HDREnvironment 