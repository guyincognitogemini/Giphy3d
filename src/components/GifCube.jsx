import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useVideoTexture, Edges } from '@react-three/drei';

function Cube({ gifUrl, isRotating, rotationSpeed }) {
  const meshRef = useRef();
  const texture = useVideoTexture(gifUrl);

  useFrame((state, delta) => {
    if (isRotating && meshRef.current) {
      meshRef.current.rotation.x += delta * rotationSpeed;
      meshRef.current.rotation.y += delta * rotationSpeed;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[3, 3, 3]} />
      <meshStandardMaterial map={texture} />
      <Edges>
        <meshBasicMaterial color="#FFFFFF" />
      </Edges>
    </mesh>
  );
}

function GifCube({ gif, rotationSpeed }) {
  const [isRotating, setIsRotating] = useState(true);
  if (!gif || !gif.images.original.mp4) return null;

  return (
    <Canvas onClick={() => setIsRotating(!isRotating)} style={{ cursor: 'pointer' }}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      <Cube gifUrl={gif.images.original.mp4} isRotating={isRotating} rotationSpeed={rotationSpeed} />
    </Canvas>
  );
}

export default GifCube;
