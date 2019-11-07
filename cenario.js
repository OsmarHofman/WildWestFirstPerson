class Cenario {

    constructor() {
        //Render 
        this.render = new THREE.WebGLRenderer({
            antialias: true
        });
        this.render.setSize(window.innerWidth, window.innerHeight);
        this.render.setClearColor(0x101010);

        //Shadow 
        this.render.shadowMap.enabled = true;
        this.render.shadowMap.type = THREE.BasicShadowMap;

        //Canvas 
        this.canvas = this.render.domElement;
    }

    buildAmbientLight(x, y, z) {
        this.luz = new THREE.AmbientLight(0xeeeeee, 0.7);
        this.luz.position.set(x, y, z);
        return this.luz;
    }

    buildFloor(largura, altura) {
        var geometria = new THREE.PlaneGeometry(largura, altura, 100, 100);
        geometria.rotateX(- Math.PI / 2);
        var material = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load('Wasteland.jpg')
        });
        var chao = new THREE.Mesh(geometria, material);
        chao.receiveShadow = true;
        return chao;
    }

    buildFlatSun(r, segments) {
        var sunGeometry = new THREE.CircleGeometry(r, segments, 0, Math.PI);
        var sunMaterial = new THREE.MeshBasicMaterial({
            color: 0xff9d00
        });
        var sol = new THREE.Mesh(sunGeometry, sunMaterial);
        sol.castShadow = false;
        sol.receiveShadow = false;
        return sol;
    }

    buildWall(largura, altura) {
        var geometria = new THREE.PlaneGeometry(largura, altura, 100, 100);
        geometria.rotateX(- Math.PI / 2);
        var material = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load('sky.jpg')
        });

        var parede = new THREE.Mesh(geometria, material);
        parede.receiveShadow = true;
        return parede;
    }

    buildSky(largura, altura) {
        var geometria = new THREE.PlaneGeometry(largura, altura, 100, 100);
        geometria.rotateX(- Math.PI / 2);
        var material = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load('circular-sky.jpg')
        });
        var ceu = new THREE.Mesh(geometria, material);
        ceu.receiveShadow = true;
        return ceu;
    }

    buildSaloon(largura, altura) {
        var geometria = new THREE.PlaneGeometry(largura, altura, 100, 100);
        var texture = new THREE.TextureLoader().load('saloon-facade.jpg', function (texture) {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.offset.set(0, 0);
            texture.repeat.set(8, 1)
        });
        var material = new THREE.MeshPhongMaterial({
            map: texture
        });
        var saloon = new THREE.Mesh(geometria, material);
        saloon.receiveShadow = true;
        return saloon;
    }

    getRender() {
        return this.render;
    }

    getCanvas() {
        return this.canvas;
    }
}