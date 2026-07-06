// =====================================
// Minecraft Browser Edition v0.1.1
// 青空・3Dエンジン・FPS表示
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

camera.position.set(0, 2, 5);

// レンダラー
const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);

// 太陽光
const sun = new THREE.DirectionalLight(0xffffff, 1.2);
sun.position.set(50, 100, 50);
sun.castShadow = true;
scene.add(sun);

// 環境光
const ambient = new THREE.AmbientLight(0xffffff, 0.45);
scene.add(ambient);

// FPS表示
let frameCount = 0;
let lastTime = performance.now();

function updateFPS() {

    frameCount++;

    const now = performance.now();

    if (now - lastTime >= 1000) {

        document.getElementById("fps").textContent =
            "FPS: " + frameCount;

        frameCount = 0;
        lastTime = now;
    }
}

// アニメーション
function animate() {

    requestAnimationFrame(animate);

    updateFPS();

    renderer.render(scene, camera);

}

animate();

// リサイズ対応
window.addEventListener("resize", () => {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

});
