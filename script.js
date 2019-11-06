
var camera, cena, render, canvas;
var geometry, material, mesh;
var controles;
var objects = [];
var raycaster;
var ginasio = new Ginasio();
var objetosQuadra = new ObjetosQuadra();
var controlesMovimento = new Controles();
var scenario = new Scenario();

//Método para pausar a tela
var pause = new Pause();
pause.pauseMouse();

init();
animacao();
var controlesAtivado = false;
var movFrente = false;
var movTras = false;
var movEsquerda = false;
var movDireita = false;
var pular = false;
var prevTime = performance.now();
var velocidade = new THREE.Vector3();
function init() {
    //Câmera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    cena = new THREE.Scene();
    //Luz
    var luz = ginasio.getLuz(0, 0, 2000);
    cena.add(luz);

    // Testando sombras - Parcialmente implementada, tentar suavizar sombra, sombra mt chaoda
    var light = new THREE.DirectionalLight(0xffa500, 1);
    light.position.set(0, 10, -375);
    light.castShadow = true;
    light.shadow.mapSize.width = window.innerWidth;
    light.shadow.mapSize.height = window.innerHeight;

    // var d = 80;
    // light.shadow.camera.left = - d;
    // light.shadow.camera.right = d;
    // light.shadow.camera.top = d;
    // light.shadow.camera.bottom = - d;
    // light.shadow.camera.far = 1000;
    cena.add(light);
  
    // Fim teste luz e sombra
    //Controles
    controles = new THREE.PointerLockControls(camera);
    cena.add(controles.getObject());
    var onKeyDown = controlesMovimento.keyDown();
    var onKeyUp = controlesMovimento.keyUp();
    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);
    raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, - 1, 0), 0, 10);
    

   

    
   


    //chao
    var chao = ginasio.getFloor(200, 480);
    chao.receiveShadow = true;
    chao.position.z = -138;
    cena.add(chao);

    //Paredes
    //Parede frente
    var parede1 = ginasio.getWall(200, 150);
    parede1.position.z = -378;
    parede1.rotation.x = Math.PI/2;
    parede1.position.y = 75;
    cena.add(parede1);


    //Parede esquerda
    var parede2 = ginasio.getWall(480, 150);
    parede2.rotation.x = Math.PI/2;
    parede2.rotation.z = -Math.PI/2;
    parede2.position.x = -100;
    parede2.position.y = 75;
    parede2.position.z = -138;
    cena.add(parede2);

    //Parede direita
    var parede3 = ginasio.getWall(480, 150);
    parede3.rotation.x = Math.PI/2;
    parede3.rotation.z = Math.PI/2;
    parede3.position.x = 100;
    parede3.position.y = 75;
    parede3.position.z = -138;
    cena.add(parede3);
    //Parede lado chao com arquibancada
    var parede4 = ginasio.getWall(200, 150);
    parede4.rotation.y = 3.142;
    parede4.rotation.x = -Math.PI/2;
    parede4.position.z = 101;
    parede4.position.y = 75;
    cena.add(parede4);


    //Cobertura
    var cobertura = ginasio.getSky(200,480);
    cobertura.position.z = -138;
    cobertura.position.y = 150;
    cena.add(cobertura);

    //sol
    var sol = scenario.buildFlatSun(50,32);
    sol.position.z = -375;
    cena.add(sol);

    //Render
    render = ginasio.getRender();
    //render.setClearColor(0xffffff);
    render.setPixelRatio(window.devicePixelRatio);
    render.setSize(window.innerWidth, window.innerHeight);
    canvas = ginasio.getCanvas();
    // Enable Shadows
    render.shadowMap.enabled = true;
    document.body.appendChild(canvas);

    window.addEventListener('resize', onWindowResize, false);
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
