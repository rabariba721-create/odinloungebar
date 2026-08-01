async function initHookahScene(container) {
  if (!container) return null;

  let THREE;
  try {
    THREE = await import("https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js");
  } catch {
    container.classList.add("hero__media--fallback");
    container.innerHTML = '<img src="assets/hookah-model.svg" alt="" class="hookah-fallback-model" />';
    return null;
  }

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x080706, 0.052);

  const camera = new THREE.PerspectiveCamera(32, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.set(0.25, 1.28, 7.4);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.replaceChildren(renderer.domElement);

  const group = new THREE.Group();
  group.position.set(2.05, -0.38, 0);
  scene.add(group);

  const metalGold = new THREE.MeshStandardMaterial({ color: 0xc8a45d, metalness: 0.96, roughness: 0.18 });
  const agedGold = new THREE.MeshStandardMaterial({ color: 0x8b6732, metalness: 0.9, roughness: 0.28 });
  const darkMetal = new THREE.MeshStandardMaterial({ color: 0x0b0a08, metalness: 0.7, roughness: 0.26 });
  const rubber = new THREE.MeshStandardMaterial({ color: 0x11100e, metalness: 0.22, roughness: 0.58 });
  const coal = new THREE.MeshStandardMaterial({ color: 0x19110d, emissive: 0x7a260a, emissiveIntensity: 0.95, roughness: 0.5 });
  const stone = new THREE.MeshStandardMaterial({ color: 0x151411, metalness: 0.06, roughness: 0.86 });
  const wood = new THREE.MeshStandardMaterial({ color: 0x29180f, metalness: 0.05, roughness: 0.7 });
  const glass = new THREE.MeshPhysicalMaterial({
    color: 0x3a2a18,
    metalness: 0.02,
    roughness: 0.05,
    transmission: 0.52,
    thickness: 0.85,
    transparent: true,
    opacity: 0.62,
    clearcoat: 1,
    clearcoatRoughness: 0.05
  });
  const water = new THREE.MeshPhysicalMaterial({
    color: 0x9b7a45,
    roughness: 0.02,
    transmission: 0.18,
    transparent: true,
    opacity: 0.32
  });

  const addMesh = (geometry, material, position, scale = [1, 1, 1], parent = group) => {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(...position);
    mesh.scale.set(...scale);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  };

  const floor = new THREE.Mesh(new THREE.PlaneGeometry(18, 12, 32, 18), stone);
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0, -2.16, 0);
  floor.receiveShadow = true;
  scene.add(floor);

  for (let index = 0; index < 9; index += 1) {
    const plank = new THREE.Mesh(new THREE.BoxGeometry(0.035, 5.8, 0.06), wood);
    plank.position.set(-4.7 + index * 0.72, 0.38, -3.35);
    plank.rotation.z = 0.012 * Math.sin(index * 1.7);
    plank.receiveShadow = true;
    scene.add(plank);
  }

  addMesh(new THREE.CylinderGeometry(0.98, 0.62, 1.18, 96), glass, [0, -1.38, 0]);
  addMesh(new THREE.CylinderGeometry(0.76, 0.48, 0.4, 96), water, [0, -1.58, 0]);
  addMesh(new THREE.SphereGeometry(0.94, 96, 38, 0, Math.PI * 2, 0, Math.PI * 0.58), glass, [0, -0.9, 0], [1, 0.74, 1]);
  addMesh(new THREE.TorusGeometry(0.78, 0.035, 18, 120), metalGold, [0, -0.56, 0]);
  addMesh(new THREE.TorusGeometry(0.62, 0.026, 18, 120), agedGold, [0, -1.97, 0]);
  addMesh(new THREE.CylinderGeometry(0.82, 0.82, 0.08, 96), metalGold, [0, -2.05, 0]);
  addMesh(new THREE.CylinderGeometry(0.56, 0.72, 0.12, 96), darkMetal, [0, -2.12, 0]);

  addMesh(new THREE.CylinderGeometry(0.08, 0.12, 3.08, 48), metalGold, [0, 0.22, 0]);
  addMesh(new THREE.CylinderGeometry(0.2, 0.13, 0.38, 48), agedGold, [0, -0.48, 0]);
  addMesh(new THREE.SphereGeometry(0.2, 48, 24), agedGold, [0, 0.1, 0], [1, 0.8, 1]);
  addMesh(new THREE.CylinderGeometry(0.16, 0.2, 0.48, 48), agedGold, [0, 0.58, 0]);
  addMesh(new THREE.TorusGeometry(0.52, 0.026, 18, 120), agedGold, [0, 0.92, 0]);
  addMesh(new THREE.CylinderGeometry(0.62, 0.46, 0.12, 96), metalGold, [0, 1.5, 0]);
  addMesh(new THREE.TorusGeometry(0.58, 0.025, 18, 120), agedGold, [0, 1.57, 0]);

  addMesh(new THREE.CylinderGeometry(0.38, 0.47, 0.24, 96), metalGold, [0, 1.78, 0]);
  addMesh(new THREE.CylinderGeometry(0.5, 0.34, 0.48, 96), darkMetal, [0, 2.12, 0]);
  addMesh(new THREE.CylinderGeometry(0.44, 0.52, 0.16, 96), agedGold, [0, 2.44, 0]);
  addMesh(new THREE.TorusGeometry(0.46, 0.032, 18, 120), metalGold, [0, 2.53, 0]);

  const bowlPattern = new THREE.Group();
  group.add(bowlPattern);
  for (let index = 0; index < 12; index += 1) {
    const spoke = addMesh(new THREE.BoxGeometry(0.018, 0.26, 0.018), metalGold, [0, 2.12, 0.49], [1, 1, 1], bowlPattern);
    spoke.rotation.y = (Math.PI * 2 * index) / 12;
  }

  const hoseCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.42, 0.25, 0),
    new THREE.Vector3(1.35, 0.1, 0.25),
    new THREE.Vector3(1.85, -0.88, 0.46),
    new THREE.Vector3(2.58, -0.62, 0.12),
    new THREE.Vector3(2.9, 0.08, -0.22)
  ]);
  const hose = new THREE.Mesh(new THREE.TubeGeometry(hoseCurve, 120, 0.066, 20, false), rubber);
  hose.castShadow = true;
  group.add(hose);
  const handle = addMesh(new THREE.CylinderGeometry(0.06, 0.1, 0.88, 28), metalGold, [3.0, 0.3, -0.3]);
  handle.rotation.z = -0.62;
  handle.rotation.y = 0.16;

  for (let index = 0; index < 5; index += 1) {
    const ember = addMesh(new THREE.BoxGeometry(0.22, 0.12, 0.2), coal, [-0.42 + index * 0.21, 2.58, 0.02]);
    ember.rotation.set(0.22, index * 0.7, 0.2);
  }

  const smokeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.04, depthWrite: false });
  const smoke = Array.from({ length: 34 }, (_, index) => {
    const puff = new THREE.Mesh(new THREE.SphereGeometry(0.19 + index * 0.011, 22, 22), smokeMaterial.clone());
    puff.position.set(Math.sin(index) * 0.2, 2.72 + index * 0.12, Math.cos(index * 1.7) * 0.18);
    group.add(puff);
    return puff;
  });

  const particleGeometry = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(150 * 3);
  for (let index = 0; index < 150; index += 1) {
    particlePositions[index * 3] = (Math.random() - 0.5) * 9;
    particlePositions[index * 3 + 1] = Math.random() * 5 - 1.7;
    particlePositions[index * 3 + 2] = (Math.random() - 0.5) * 4.2;
  }
  particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
  const particles = new THREE.Points(
    particleGeometry,
    new THREE.PointsMaterial({ color: 0xd7b86a, size: 0.018, transparent: true, opacity: 0.44 })
  );
  scene.add(particles);

  scene.add(new THREE.AmbientLight(0xe8d3a0, 0.2));

  const key = new THREE.PointLight(0xe8c77f, 5.8, 15);
  key.position.set(2.6, 3.6, 4.4);
  key.castShadow = true;
  scene.add(key);

  const rim = new THREE.PointLight(0x8a5330, 3.4, 13);
  rim.position.set(-4.2, 2.0, -2.8);
  scene.add(rim);

  const top = new THREE.SpotLight(0xf0d79d, 2.3, 14, 0.36, 0.55, 1);
  top.position.set(0.7, 5.8, 2.5);
  top.target = group;
  top.castShadow = true;
  scene.add(top);

  const clock = new THREE.Clock();
  let rafId = 0;

  const resize = () => {
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  };

  const animate = () => {
    const elapsed = clock.getElapsedTime();
    group.rotation.y = elapsed * 0.18;
    group.rotation.x = Math.sin(elapsed * 0.5) * 0.025;
    particles.rotation.y = elapsed * 0.025;
    smoke.forEach((puff, index) => {
      puff.position.y = 2.72 + index * 0.12 + Math.sin(elapsed * 0.8 + index) * 0.07;
      puff.position.x = Math.sin(elapsed * 0.45 + index) * (0.12 + index * 0.013);
      puff.position.z = Math.cos(elapsed * 0.32 + index) * (0.12 + index * 0.008);
      puff.material.opacity = 0.024 + Math.sin(elapsed + index) * 0.01;
      puff.scale.setScalar(1 + Math.sin(elapsed * 0.7 + index) * 0.13);
    });
    renderer.render(scene, camera);
    rafId = requestAnimationFrame(animate);
  };

  window.addEventListener("resize", resize, { passive: true });
  resize();
  animate();

  return () => {
    cancelAnimationFrame(rafId);
    window.removeEventListener("resize", resize);
    renderer.dispose();
    container.replaceChildren();
  };
}

window.initHookahScene = initHookahScene;
