import { Canvas } from "react-three-fiber";
import { Suspense, useEffect, useState } from "react";
import "./App.css";
import {
  CubeCamera,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import Ground from "./ground";
import Car from "./car";
import Rings from "./Rings";

//import {Bloom, ChromaticAberration, EffectComposer,} from "@react-three/postprocessing";
//import { BlendFunction } from "postprocessing";

function Carshow() {
  const [audio] = useState(new Audio("thebox.mp3"));

  const handleInteract = () => {
    audio.play();
  };

  useEffect(() => {
    document.addEventListener("click", handleInteract);
    return () => {
      document.removeEventListener("click", handleInteract);
    };
  }, []);
  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />
      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />
      <color args={[0, 0, 0]} attach="background" />

      <CubeCamera frames={Infinity} resolution={256}>
        {(texture) => (
          <>
            <Environment map={texture} />
            <Car />
          </>
        )}
      </CubeCamera>
      <Rings />

      <spotLight
        color={[1, 0.25, 0.7]}
        intensity={1.5}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={2}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <Ground />

      {/*<EffectComposer>
        <Bloom
          blendFunction={BlendFunction.ADD}
          intensity={0.1}
          width={300}
          height={300}
          kernelSize={5}
          luminanceThreshold={0.15}
          luminanceSmoothing={0.025}
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.0005, 0.0012]}
        />
      </EffectComposer>*/}
    </>
  );
}

export default function App() {
  return (
    <Suspense fallback={null}>
      <Canvas shadows>
        <Carshow />
      </Canvas>
    </Suspense>
  );
}
