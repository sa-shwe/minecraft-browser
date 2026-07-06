// ================================
// Minecraft Browser Edition
// v0.1.1
// ================================

// シーン作成
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB);

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
renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);

// 太陽光
const light = new THREE.DirectionalLight(0xffffff, 1.2);

light.position.set(30, 100, 50);

scene.add(light);

// 環境光
scene.add(new THREE.AmbientLight(0xffffff, 0.45));

// FPS
let last = performance.now();
let frames = 0;

function updateFPS(){

    frames++;

    const now = performance.now();

    if(now-last>=1000){

        document.getElementById("fps").textContent =
            "FPS: "+frames;

        frames=0;
        last=now;
    }

}

// 描画
function animate(){

    requestAnimationFrame(animate);

    updateFPS();

    renderer.render(scene,camera);

}

animate();

// リサイズ
window.addEventListener("resize",()=>{

    camera.aspect =
        window.innerWidth/window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

});
