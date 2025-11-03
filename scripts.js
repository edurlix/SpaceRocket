// 1. Scene Setup & Camera
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0B192C);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
);
camera.position.z = 300;

// 2. Renderer (with anti-aliasing, Tone Mapping, and shadows)
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.25;

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild(renderer.domElement);

// 3. Controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.minDistance = 0.001;
controls.enablePan = true;

// 4. Lighting (Combines HDRI for reflections and Directional for shadows)
const ambientLight = new THREE.AmbientLight(0xEEEEEE, 0.8);
scene.add(ambientLight);

const shadowLight = new THREE.DirectionalLight(0xFFFFFF, 4);
shadowLight.position.set(5, 10, 5);
shadowLight.castShadow = true;
shadowLight.shadow.mapSize.width = 2048;
shadowLight.shadow.mapSize.height = 2048;
scene.add(shadowLight);

// 5. GLTF Loader
const loader = new THREE.GLTFLoader();

loader.load('tutorial1.glb',
    function(gltf){
        gltf.scene.scale.set(10,10,10);
        gltf.scene.position.set(0,0,0);

        // set the imported model to cast shadows
        gltf.scene.traverse(function(node){
            if(node.isMesh){
                node.castShadow = true;
            }
        });
        scene.add(gltf.scene)
    },
)

// 6. Animation Loop
function animate(){
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();