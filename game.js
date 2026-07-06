// =====================================
// Minecraft Browser Edition v0.1.2
// 青空 + 地面
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

camera.position.set(0, 12, 20);
camera.lookAt(0, 0, 0);

// レンダラー
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);

// ライト
const sun = new THREE.DirectionalLight(0xffffff, 1.3);
sun.position.set(30, 60, 20);
sun.castShadow = true;
scene.add(sun);

scene.add(new THREE.AmbientLight(0xffffff, 0.45));

// ===== 地面 =====

const blockSize = 1;

const grassMaterial = new THREE.MeshLambertMaterial({
    color: 0x5fb14a
});

const dirtMaterial = new THREE.MeshLambertMaterial({
    color: 0x7a5230
});

for(let x=-16;x<16;x++){

    for(let z=-16;z<16;z++){

        // 草
        const grass = new THREE.Mesh(

            new THREE.BoxGeometry(blockSize,blockSize,blockSize),

            grassMaterial

        );

        grass.position.set(x,0,z);

        grass.castShadow=true;
        grass.receiveShadow=true;

        scene.add(grass);

        // 土
        for(let y=-1;y>=-3;y--){

            const dirt=new THREE.Mesh(

                new THREE.BoxGeometry(blockSize,blockSize,blockSize),

                dirtMaterial

            );

            dirt.position.set(x,y,z);

            dirt.receiveShadow=true;

            scene.add(dirt);

        }

    }

}

// FPS

let frames=0;
let last=performance.now();

function updateFPS(){

    frames++;

    const now=performance.now();

    if(now-last>=1000){

        document.getElementById("fps").textContent="FPS: "+frames;

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

    camera.aspect=window.innerWidth/window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth,window.innerHeight);

});
