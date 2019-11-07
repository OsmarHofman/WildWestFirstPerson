var canvas;
var objects = [];
var cenario = new Cenario();
var controlesMovimento = new Controles();
var controlesAtivado = false;
var movFrente = false;
var movTras = false;
var movEsquerda = false;
var movDireita = false;
var prevTime = performance.now();
var velocidade = new THREE.Vector3();
//Método para pausar a tela
var pause = new Pause();
pause.pauseMouse();

//Câmera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
var cena = new THREE.Scene();

// AudioListener pra camera
var listener = new THREE.AudioListener();
camera.add( listener );

// Criando um PositionalAudio
var sound = new THREE.PositionalAudio( listener );


//Luz Ambiente
var luz = cenario.buildAmbientLight(0, 0, 2000);
cena.add(luz);

// Direcional
var sunLight = new THREE.DirectionalLight(0xffa500, 1);
sunLight.position.set(0, 10, -375);
sunLight.castShadow = true;
sunLight.shadow.mapSize.width = window.innerWidth;
sunLight.shadow.mapSize.height = window.innerHeight;

// var d = 80;
// sunLight.shadow.camera.left = - d;
// sunLight.shadow.camera.right = d;
// sunLight.shadow.camera.top = d;
// sunLight.shadow.camera.bottom = - d;
// sunLight.shadow.camera.far = 1000;

cena.add(sunLight);

//Controles
var controles = new THREE.PointerLockControls(camera);
cena.add(controles.getObject());
var onKeyDown = controlesMovimento.keyDown();
var onKeyUp = controlesMovimento.keyUp();
document.addEventListener('keydown', onKeyDown, false);
document.addEventListener('keyup', onKeyUp, false);
var raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, - 1, 0), 0, 10);

//chao
var chao = cenario.buildFloor(200, 480);
chao.receiveShadow = true;
chao.position.z = -138;
cena.add(chao);

//Paredes

//Parede frente
var parede1 = cenario.buildWall(200, 150);
parede1.rotation.x = Math.PI / 2;
parede1.position.set(0, 75, -378)
cena.add(parede1);


//Parede esquerda
var parede2 = cenario.buildWall(480, 150);
parede2.rotation.x = Math.PI / 2;
parede2.rotation.z = -Math.PI / 2;
parede2.position.set(-100, 75, -138);
cena.add(parede2);

//Parede direita
var parede3 = cenario.buildWall(480, 150);
parede3.rotation.x = Math.PI / 2;
parede3.rotation.z = Math.PI / 2;
parede3.position.set(100, 75, -138);
cena.add(parede3);

//Parede trás
var parede4 = cenario.buildWall(200, 150);
parede4.rotation.y = 3.142;
parede4.rotation.x = -Math.PI / 2;
parede4.position.set(0, 75, 101);
cena.add(parede4);

//Fachadas da direita
var saloonDireita = cenario.buildSaloon(480, 25);
saloonDireita.rotation.y = - Math.PI / 2;
saloonDireita.position.set(95, 12, -138);
cena.add(saloonDireita);

//Fachadas da esquerda
var saloonDireita = cenario.buildSaloon(480, 25);
saloonDireita.rotation.y = Math.PI / 2;
saloonDireita.position.set(- 95, 12, -138);
cena.add(saloonDireita);

//Ceu
var ceu = cenario.buildSky(200, 480);
ceu.position.z = -138;
ceu.position.y = 150;
cena.add(ceu);

//Sol
var sol = cenario.buildFlatSun(50, 32);
sol.position.z = -375;
cena.add(sol);

// Carregando e adicionando som ao Sol
var audioLoader = new THREE.AudioLoader();
audioLoader.load( 'old-town-road.mp3', function( buffer ) {
	sound.setBuffer( buffer );
    sound.setLoop( true );
    sound.setRefDistance( 5 );
	sound.setVolume( 1 );
	sound.play();
});

sol.add(sound);

//Render
var render = cenario.getRender();
render.setPixelRatio(window.devicePixelRatio);
render.setSize(window.innerWidth, window.innerHeight);
render.shadowMap.enabled = true;
window.addEventListener('resize', onWindowResize, false);

canvasInitialize();
animacao();


function canvasInitialize() {
    canvas = cenario.getCanvas();
    document.body.appendChild(canvas);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    render.setSize(window.innerWidth, window.innerHeight);
}

function animacao() {
    requestAnimationFrame(animacao);
    controlesMovimento.ativaMouse(controlesAtivado);
    render.render(cena, camera);
}
