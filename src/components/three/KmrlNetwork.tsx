import { useMemo } from "react";
import { Line } from "@react-three/drei";
import { useTelemetry } from "@/hooks/useTelemetry";
import { GroupProps } from "@react-three/fiber";

type Station = { name: string; position: [number, number, number] };

const stations: Station[] = [
  { name: "Aluva", position: [-8, 0, 0] },
  { name: "Edapally", position: [-4, -0.5, 0] },
  { name: "Kalamassery", position: [-6, 0.5, 0] },
  { name: "Palarivattom", position: [-2, -0.25, 0] },
  { name: "M.G Road", position: [2, -0.2, 0] },
  { name: "Ernakulam South", position: [4, 0, 0] },
  { name: "Vyttila", position: [6, 0.2, 0] },
  { name: "SN Junction", position: [8, 0.4, 0] },
];

const KmrlNetwork = (props: GroupProps) => {
  const linePoints = useMemo(() => stations.map((s) => s.position), []);

  const telemetry = useTelemetry();

  return (
    <group {...props}>
      {/* Use default width (avoid lineWidth to prevent platform errors) */}
      <Line points={linePoints} color="#54e3ff" />
      {stations.map((station) => (
        <mesh key={station.name} position={station.position}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial emissive="#54e3ff" emissiveIntensity={2} color="#0ea5b7" />
        </mesh>
      ))}
      {telemetry.map((t) => (
        <mesh key={t.id} position={[t.x, t.y, t.z]}>
          <sphereGeometry args={[0.1, 12, 12]} />
          <meshStandardMaterial emissive="#22d3ee" emissiveIntensity={4} color="#22d3ee" />
        </mesh>
      ))}
    </group>
  );
};

export default KmrlNetwork;


