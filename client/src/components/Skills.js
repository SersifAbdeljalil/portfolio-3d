import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

// Composant pour un cube de compétence 3D
function SkillCube({ position, color, text }) {
  return (
    <Float
      speed={1.5}
      rotationIntensity={0.2}
      floatIntensity={0.5}
      position={position}
    >
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.2} />
      </mesh>
      
      {/* Texte de compétence */}
      <mesh position={[0, 0, 0.51]}>
        <planeGeometry args={[0.8, 0.3]} />
        <meshBasicMaterial transparent opacity={0.9} color="#000000" />
      </mesh>
    </Float>
  );
}

// Composant Skills
function Skills() {
  const frontendSkills = [
    { name: "React.js", level: 90 },
    { name: "JavaScript", level: 85 },
    { name: "HTML5/CSS3", level: 90 },
    { name: "Three.js", level: 80 },
    { name: "WebGL", level: 70 },
  ];
  
  const backendSkills = [
    { name: "Node.js", level: 85 },
    { name: "Express", level: 80 },
    { name: "MySQL", level: 75 },
    { name: "API REST", level: 85 },
  ];
  
  const toolsSkills = [
    { name: "Git/GitHub", level: 85 },
    { name: "Webpack", level: 75 },
    { name: "VS Code", level: 90 },
    { name: "Postman", level: 80 },
  ];
  
  return (
    <section className="skills section">
      <div className="container">
        <h2 className="section-title">Mes Compétences</h2>
        
        <div className="skills-content">
          <div className="skills-3d">
            <div className="three-container">
              <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <OrbitControls 
                  enableZoom={false} 
                  enablePan={false}
                  autoRotate
                  autoRotateSpeed={0.5}
                />
                
                {/* Cubes de compétences */}
                <SkillCube position={[-1.5, 1, 0]} color="#6c63ff" text="React" />
                <SkillCube position={[-0.5, 1, 0]} color="#f7d765" text="JavaScript" />
                <SkillCube position={[0.5, 1, 0]} color="#e34c26" text="HTML5" />
                <SkillCube position={[1.5, 1, 0]} color="#1572b6" text="CSS3" />
                <SkillCube position={[-1.5, 0, 0]} color="#000000" text="Three.js" />
                <SkillCube position={[-0.5, 0, 0]} color="#764abc" text="Redux" />
                <SkillCube position={[0.5, 0, 0]} color="#8ed6fb" text="Webpack" />
                <SkillCube position={[1.5, 0, 0]} color="#cc6699" text="Sass" />
                <SkillCube position={[-1.5, -1, 0]} color="#339933" text="Node.js" />
                <SkillCube position={[-0.5, -1, 0]} color="#000000" text="Express" />
                <SkillCube position={[0.5, -1, 0]} color="#4479a1" text="MySQL" />
                <SkillCube position={[1.5, -1, 0]} color="#ff6c37" text="API REST" />
              </Canvas>
            </div>
          </div>
          
          <div className="skills-lists">
            <div className="skills-category">
              <h3>Frontend</h3>
              <div className="skills-bars">
                {frontendSkills.map((skill, index) => (
                  <div className="skill-item" key={`front-${index}`}>
                    <span className="skill-name">{skill.name}</span>
                    <div className="skill-bar">
                      <div className="skill-level" style={{ width: `${skill.level}%` }}></div>
                    </div>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="skills-category">
              <h3>Backend</h3>
              <div className="skills-bars">
                {backendSkills.map((skill, index) => (
                  <div className="skill-item" key={`back-${index}`}>
                    <span className="skill-name">{skill.name}</span>
                    <div className="skill-bar">
                      <div className="skill-level" style={{ width: `${skill.level}%` }}></div>
                    </div>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="skills-category">
              <h3>Outils</h3>
              <div className="skills-bars">
                {toolsSkills.map((skill, index) => (
                  <div className="skill-item" key={`tool-${index}`}>
                    <span className="skill-name">{skill.name}</span>
                    <div className="skill-bar">
                      <div className="skill-level" style={{ width: `${skill.level}%` }}></div>
                    </div>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;