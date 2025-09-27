import { Suspense, useRef } from "react";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { Group } from "three";

type TrainModelProps = {
  path?: string;
  scale?: number;
};

export const TrainModel = ({ path = "/models/kmrl-train.glb", scale = 1 }: TrainModelProps) => {
  const group = useRef<Group>(null);
  const { scene } = useGLTF(path, true);
  return (
    <group ref={group} dispose={null}>
      {/* eslint-disable-next-line react/no-unknown-property */}
      <primitive object={scene} scale={scale} />
      <OrbitControls enablePan={false} />
    </group>
  );
};

useGLTF.preload("/models/kmrl-train.glb");

export const TrainModelSuspense = (props: TrainModelProps) => (
  <Suspense fallback={null}>
    <TrainModel {...props} />
  </Suspense>
);

export default TrainModel;


