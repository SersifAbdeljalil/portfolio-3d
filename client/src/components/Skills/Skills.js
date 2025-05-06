import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Float } from '@react-three/drei';
import './Skills.css';

// Composant pour représenter une compétence en 3D
function SkillCube({ position, size, color, text, rotationSpeed = 0.005 }) {
  const [hovered, setHovered] = useState(false);
  
  return (
    <Float
      speed={1.5}
      rotationIntensity={0.2}
      floatIntensity={0.3}
      position={position}
    >
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? size * 1.1 : size}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial 
          color={hovered ? "#ffffff" : color} 
          metalness={0.5} 
          roughness={0.2} 
        />
      </mesh>
      
      <Text
        position={[0, 0, 0.6]}
        fontSize={0.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </Float>
  );
}

// Grille de compétences 3D
function SkillsGrid() {
  const frontendSkills = [
    { name: "React", color: "#61DAFB", position: [-1.5, 1, 0], size: 0.5 },
    { name: "JavaScript", color: "#F7DF1E", position: [-0.5, 1, 0], size: 0.5 },
    { name: "HTML5", color: "#E34F26", position: [0.5, 1, 0], size: 0.5 },
    { name: "CSS3", color: "#1572B6", position: [1.5, 1, 0], size: 0.5 },
    { name: "Three.js", color: "#000000", position: [-1.5, 0, 0], size: 0.5 },
    { name: "Redux", color: "#764ABC", position: [-0.5, 0, 0], size: 0.5 },
    { name: "Webpack", color: "#8DD6F9", position: [0.5, 0, 0], size: 0.5 },
    { name: "Sass", color: "#CC6699", position: [1.5, 0, 0], size: 0.5 },
  ];
  
  const backendSkills = [
    { name: "Node.js", color: "#339933", position: [-1.5, -1, 0], size: 0.5 },
    { name: "Express", color: "#000000", position: [-0.5, -1, 0], size: 0.5 },
    { name: "MySQL", color: "#4479A1", position: [0.5, -1, 0], size: 0.5 },
    { name: "API REST", color: "#FF6C37", position: [1.5, -1, 0], size: 0.5 },
  ];
  
  return (
    <>
      {frontendSkills.map((skill, index) => (
        <SkillCube
          key={`frontend-${index}`}
          position={skill.position}
          size={skill.size}
          color={skill.color}
          text={skill.name}
        />
      ))}
      
      {backendSkills.map((skill, index) => (
        <SkillCube
          key={`backend-${index}`}
          position={skill.position}
          size={skill.size}
          color={skill.color}
          text={skill.name}
        />
      ))}
    </>
  );
}

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
                <SkillsGrid />
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