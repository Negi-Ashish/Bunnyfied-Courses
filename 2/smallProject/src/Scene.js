import {
  OrbitControls,
  useGLTF,
  useTexture,
  MeshPortalMaterial,
  RoundedBox,
  Text,
  CameraControls,
} from "@react-three/drei";
import * as THREE from "three";
import { useState, useRef, useEffect } from "react";
import { easing } from "maath";
import { useFrame } from "@react-three/fiber";

const Scene = () => {
  const [active, setActive] = useState(false);
  const meshPortalMaterialRef = useRef();
  const cameraControlsRef = useRef();

  useFrame((_, delta) => {
    easing.damp(
      meshPortalMaterialRef.current,
      "blend",
      active ? 1 : 0,
      0.2,
      delta
    );
  });

  useEffect(() => {
    if (active) {
      cameraControlsRef.current.setLookAt(0, 0, 3, 0, 0, 0, true);
    } else {
      cameraControlsRef.current.setLookAt(0, 0, 5, 0, 0, 0, true);
    }
  }, [active]);

  const model = useGLTF("./model/1.glb");
  const texture = useTexture("./texture/1.png");

  const doubleClickHandler = () => {
    setActive(!active);
  };

  return (
    <>
      <CameraControls ref={cameraControlsRef} />

      <Text font="./font/bold.ttf" position={[0, 1.5, 0.1]} fontSize={0.6}>
        Eggs
        <meshBasicMaterial toneMapped={false} />
      </Text>

      <RoundedBox
        args={[3, 4, 0.1]}
        radius={0.1}
        onDoubleClick={doubleClickHandler}
      >
        <MeshPortalMaterial ref={meshPortalMaterialRef}>
          <primitive object={model.scene} scale={0.6} position-y={0.6} />

          <mesh>
            <sphereGeometry args={[5, 64, 64]} />
            <meshBasicMaterial map={texture} side={THREE.BackSide} />
          </mesh>
        </MeshPortalMaterial>
      </RoundedBox>
    </>
  );
};

export default Scene;
