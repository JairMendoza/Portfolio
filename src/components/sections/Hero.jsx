import React, { useEffect, useRef, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { ChevronDown } from "lucide-react";

const AnimatedGeometry = () => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef} scale={1.2}>
        <icosahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial
          color="#dc2626"
          envMapIntensity={0.5}
          clearcoat={0.8}
          clearcoatRoughness={0}
          metalness={0.5}
          roughness={0.2}
          distort={0.4}
          speed={2}
          wireframe={true}
        />
      </mesh>
    </Float>
  );
};

export default function Hero() {
  const { t } = useTranslation();
  const textRef = useRef(null);
  const btnsRef = useRef(null);

  useEffect(() => {
    // Dynamic import to avoid errors if using specific gsap modules
    import("gsap").then(({ gsap }) => {
      const chars = textRef.current.querySelectorAll(".char");

      const tl = gsap.timeline();

      tl.fromTo(
        chars,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 1,
          ease: "back.out(1.7)",
          delay: 0.2,
        },
      ).fromTo(
        btnsRef.current.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power2.out" },
        "-=0.5",
      );
    });
  }, []);

  const title = t("hero.name");
  const role = t("hero.role");

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-40">
        <Suspense fallback={null}>
          <Canvas camera={{ position: [0, 0, 5], fov: 35 }}>
            <ambientLight intensity={30.5} />
            <directionalLight position={[10, 10, 10]} intensity={100} />
            <AnimatedGeometry />
          </Canvas>
        </Suspense>
      </div>

      <div className="container relative z-10 mx-auto px-6 flex flex-col items-center text-center">
        <h1
          ref={textRef}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-4 flex flex-wrap justify-center overflow-hidden"
          aria-label={title}
        >
          {title.split("").map((char, i) => (
            <span
              key={i}
              className={`char inline-block ${char === " " ? "w-4 md:w-8" : ""}`}
            >
              {char}
            </span>
          ))}
        </h1>

        <h2 className="text-xl md:text-3xl text-secondary-foreground font-light mb-10 tracking-wide text-gradient">
          {role}
        </h2>

        <div ref={btnsRef} className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/projects"
            className="px-8 py-3 bg-primary hover:bg-primary-hover text-primary-foreground font-semibold rounded-md shadow-[0_0_20px_var(--color-primary-glow)] hover:shadow-[0_0_30px_var(--color-primary-glow)] transition-all"
          >
            {t("hero.viewProjects")}
          </Link>
          <Link
            to="/contact"
            className="px-8 py-3 bg-surface hover:bg-surface-hover border border-border text-foreground font-semibold rounded-md transition-all"
          >
            {t("hero.contact")}
          </Link>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown className="w-8 h-8 text-secondary-foreground opacity-50" />
      </div>
    </section>
  );
}
