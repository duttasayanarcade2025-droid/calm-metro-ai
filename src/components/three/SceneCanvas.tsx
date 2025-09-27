// import { Canvas, type Props as CanvasProps } from "@react-three/fiber";
// import { Suspense, type PropsWithChildren } from "react";
// import { Environment, PerformanceMonitor } from "@react-three/drei";

// type SceneCanvasProps = PropsWithChildren<{
//   dpr?: [number, number];
// }> & Omit<CanvasProps, "children">;

// const SceneCanvas = ({ children, dpr = [1, 1.5], ...rest }: SceneCanvasProps) => {
//   return (
//     <Canvas
//       dpr={dpr}
//       gl={{ antialias: true }}
//       camera={{ position: [0, 0, 12], fov: 50 }}
//       {...rest}
//     >
//       <PerformanceMonitor>
//         <Suspense fallback={null}>
//           <ambientLight intensity={0.4} />
//           <Environment preset="city" />
//           {children}
//         </Suspense>
//       </PerformanceMonitor>
//     </Canvas>
//   );
// };

// export default SceneCanvas;



// type SceneCanvasProps = PropsWithChildren<{
//   className?: string;
// }>;

// const SceneCanvas = ({ className, children }: SceneCanvasProps) => {
//   return (
//     <Canvas
//       className={className}
//       camera={{ position: [0, 0, 8], fov: 50 }}
//       gl={{ antialias: true }}
//       dpr={[1, 1.5]}
//     >
//       <Suspense fallback={null}>{children}</Suspense>
//     </Canvas>
//   );
// };

// export default SceneCanvas;


import { Canvas, type Props as CanvasProps } from "@react-three/fiber";
import { Suspense, type PropsWithChildren } from "react";
import { Environment, PerformanceMonitor } from "@react-three/drei";

// Define the new, combined props
type SceneCanvasProps = PropsWithChildren<{
  /** Toggles the Drei PerformanceMonitor. Defaults to true. */
  withPerformance?: boolean;
  /** Toggles the Drei Environment. Defaults to true. */
  withEnvironment?: boolean;
  /** The lighting/background preset for the Environment. Defaults to 'city'. */
  environmentPreset?: React.ComponentProps<typeof Environment>['preset'];
  /** Toggles the ambient light. Defaults to true. */
  withAmbientLight?: boolean;
  /** The intensity of the ambient light. Defaults to 0.4. */
  ambientLightIntensity?: number;
}> & Omit<CanvasProps, "children">;

const SceneCanvas = ({
  children,
  dpr = [1, 1.5],
  withPerformance = true,
  withEnvironment = true,
  environmentPreset = "city",
  withAmbientLight = true,
  ambientLightIntensity = 0.4,
  ...rest // This will include `className`, `style`, etc.
}: SceneCanvasProps) => {

  // Define the core scene content
  const sceneContent = (
    <Suspense fallback={null}>
      {withAmbientLight && <ambientLight intensity={ambientLightIntensity} />}
      {withEnvironment && <Environment preset={environmentPreset} />}
      {children}
    </Suspense>
  );

  return (
    <Canvas
      dpr={dpr}
      gl={{ antialias: true }}
      camera={{ position: [0, 0, 12], fov: 50 }}
      {...rest} // Pass down all other props like className
    >
      {/* Conditionally wrap the content with the PerformanceMonitor */}
      {withPerformance ? (
        <PerformanceMonitor>{sceneContent}</PerformanceMonitor>
      ) : (
        sceneContent
      )}
    </Canvas>
  );
};

export default SceneCanvas;