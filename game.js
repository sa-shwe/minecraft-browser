// =====================================
// Minecraft Browser Edition v0.1.2
// 動作確認版
// =====================================

// シーン
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

// カメラ
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 10, 15);
camera.lookAt(0, 0, 0);

// レンダラー
const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild(renderer.domElement);

// 太陽光
const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(10, 20, 10);
scene.add(light);

// 環境光
scene.add(new THREE.AmbientLight(0xffffff, 0.6));

// =========================
// 地面（まずはPlane）
// =========================

const groundGeometry = new THREE.PlaneGeometry(50, 50);

const groundMaterial = new THREE.MeshLambertMaterial({
    color: 0x55aa55
});

const ground = new THREE.Mesh(
    groundGeometry,
    groundMaterial
);

ground.rotation.x = -Math.PI / 2;

scene.add(ground);

// =========================
// 赤い立方体（目印）
// =========================

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshLambertMaterial({
        color: 0xff0000
    })
);

cube.position.y = 0.5;

scene.add(cube);

// FPS

let frame = 0;
let last = performance.now();

function updateFPS(){

    frame++;

    const now = performance.now();

    if(now-last>1000){

        document.getElementById("fps").textContent =
            "FPS: " + frame;

        frame = 0;
        last = now;

    }

}

function animate(){

    requestAnimationFrame(animate);

    cube.rotation.y += 0.01;

    updateFPS();

    renderer.render(scene,camera);

}

animate();

window.addEventListener("resize",()=>{

    camera.aspect =
        window.innerWidth/window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

});
