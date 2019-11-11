
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
        this.render.shadowMap.type = THREE.PCFSoftShadowMap;

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
        geometria.rotateX(-Math.PI / 2);
        var material = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load('Wasteland.jpg')
        });
        var chao = new Physijs.PlaneMesh(geometria, material, 0);
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
        geometria.rotateX(-Math.PI / 2);
        var material = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load('sky.jpg')
        });

        var parede = new THREE.Mesh(geometria, material);
        parede.receiveShadow = true;
        return parede;
    }

    buildSky(largura, altura) {
        var geometria = new THREE.PlaneGeometry(largura, altura, 100, 100);
        geometria.rotateX(Math.PI / 2);
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


    buildHay(x, y, z) {
        var hay = new Physijs.BoxMesh(
            new THREE.CubeGeometry(10, 10, 10),
            new THREE.MeshPhongMaterial({
                map: new THREE.TextureLoader().load('hay.jpg')
            })
        );
        hay.position.set(x, y, z);
        hay.receiveShadow = true;
        hay.castShadow = true;
        return hay;
    }

    getHorseKeeper(x, z) {
        var poleGeo = new THREE.CylinderBufferGeometry(0.5, 0.5, 10, 64);
        var poleMat = new THREE.MeshPhongMaterial({
            color: 0x964B00
        });
        var poste1 = new THREE.Mesh(poleGeo, poleMat);
        poste1.position.y = 5;
        poste1.position.z = -5;
        poste1.receiveShadow = true;
        poste1.castShadow = true;

        var poste2 = new THREE.Mesh(poleGeo, poleMat);
        poste2.position.y = 5;
        poste2.position.z = 8;
        poste2.receiveShadow = true;
        poste2.castShadow = true;

        var posteCima = new THREE.Mesh(new THREE.CylinderBufferGeometry(0.5, 0.5, 13, 64), poleMat);
        posteCima.rotation.x = 1.57;
        posteCima.position.y = 9.5;
        posteCima.position.z = 1.5;
        posteCima.receiveShadow = true;
        posteCima.castShadow = true;

        var group = new THREE.Group();
        group.add(poste1);
        group.add(poste2);
        group.add(posteCima);
        group.position.x = x;
        group.position.z = z;
        group.receiveShadow = true;
        group.castShadow = true;

        return group;
    }

    getWaterSupply(x, z) {
        var geometry = new THREE.CylinderGeometry(5, 5, 20, 32, 1, false, 5, Math.PI);
        var material = new THREE.MeshPhongMaterial({
            color: 0x964B00
        });
        material.side = THREE.DoubleSide;
        var cylinder = new THREE.Mesh(geometry, material);

        var group = new THREE.Group();
        group.add(cylinder);
        cylinder.position.x = x;
        cylinder.position.y = 5;
        cylinder.position.z = z;
        cylinder.rotation.x = Math.PI / 2;
        cylinder.castShadow = true;
        cylinder.receiveShadow = true;
        return cylinder;
    }




    getWater(x, z) {
        var waterGeometry = new THREE.PlaneBufferGeometry(8, 20);
        var water = new THREE.Water(waterGeometry, {
            color: '#ffffff',
            scale: 4,
            flowDirection: new THREE.Vector2(1, 1),
            textureWidth: 1024,
            textureHeight: 1024
        });
        water.position.x = x;
        water.position.y = 2;
        water.position.z = z;
        water.rotation.x = Math.PI * - 0.5;
        return water;
    }


    getHorse() {
        var loader = new TDSLoader();
        loader.setResourcePath('models/3ds/portalgun/textures/');
        loader.load('standinghorse.3DS', function (object) {
            object.traverse(function (child) {
                if (child.isMesh) {
                    child.material.normalMap = normal;
                }
            });
            return object
        });
    }



    getRender() {
        return this.render;
    }

    getCanvas() {
        return this.canvas;
    }
}