
define(['log'], function (log) {
	'use strict';

	var bgSpace = function () {

		var bgspace = this;

		bgspace.container;
		bgspace.camera;
		bgspace.stats;
		bgspace.scene;
		bgspace.renderer;
		bgspace.dirLight;
		bgspace.meshMoon;
		bgspace.RADIUS = 6371;
		bgspace.MARGIN = 5;
		bgspace.SCREEN_HEIGHT = window.innerHeight - bgspace.MARGIN;
		bgspace.SCREEN_WIDTH  = window.innerWidth;

		bgspace.init = function () {
			
			log('@ bgSpace init ...');

			bgspace.container = document.createElement('div');
			bgspace.container.setAttribute('id', 'bgSpace');
			document.body.appendChild(bgspace.container);

			bgspace.camera = new THREE.PerspectiveCamera(25, bgspace.SCREEN_WIDTH / bgspace.SCREEN_HEIGHT, 50, 1e7);
			bgspace.camera.position.z = 200;

			bgspace.scene = new THREE.Scene();
			// scene.fog = new THREE.FogExp2(0x000000, 0.00000025);

			bgspace.dirLight = new THREE.DirectionalLight(0xffffff);
			bgspace.dirLight.position.set(-0.4, 0, 1).normalize();
			bgspace.scene.add(bgspace.dirLight);

			// ambientLight = new THREE.AmbientLight( 0x000000 );
			// scene.add( ambientLight );
		
			bgspace.renderer = new THREE.WebGLRenderer();
			bgspace.renderer.setSize(bgspace.SCREEN_WIDTH, bgspace.SCREEN_HEIGHT);

			bgspace.container.appendChild(bgspace.renderer.domElement);

			bgspace.drawStars();
			bgspace.drawMoon();

			bgspace.stats = new Stats();
			bgspace.stats.domElement.style.position = 'absolute';
			bgspace.stats.domElement.style.top = '0px';
			bgspace.stats.domElement.style.zIndex = 100;
			bgspace.container.appendChild(bgspace.stats.domElement);

		};

		bgspace.drawMoon = function () {

			var moonScale = 0.2, 
			geometry = new THREE.SphereGeometry(100, 100, 50),
			moonTexture = THREE.ImageUtils.loadTexture("images/textures/moon_1024.png"),
			materialMoon = new THREE.MeshPhongMaterial({color: 0xffffff, map: moonTexture});
			
			bgspace.meshMoon = new THREE.Mesh(geometry, materialMoon);
			bgspace.meshMoon.position.set(0, 0, 0);
			bgspace.meshMoon.scale.set(moonScale, moonScale, moonScale);
			bgspace.scene.add(bgspace.meshMoon);

		};

		bgspace.drawStars = function () {

			var i, s, 
				r = this.RADIUS, 
				starsGeometry = [new THREE.Geometry(), new THREE.Geometry()];

			for (i = 0; i < 300; i++) {
				var vertex = new THREE.Vector3();
				vertex.x = Math.random() * 2 - 1;
				vertex.y = Math.random() * 2 - 1;
				vertex.z = Math.random() * 2 - 1;
				vertex.multiplyScalar(r);

				starsGeometry[0].vertices.push(vertex);
			}

			for (i = 0; i < 1500; i++) {

				var vertex = new THREE.Vector3();
				vertex.x = Math.random() * 2 - 1;
				vertex.y = Math.random() * 2 - 1;
				vertex.z = Math.random() * 2 - 1;
				vertex.multiplyScalar(r);

				starsGeometry[1].vertices.push(vertex);

			}

			var stars,
				starsMaterials = [
					new THREE.PointCloudMaterial({color: 0x555555, size: 2, sizeAttenuation: false}),
					new THREE.PointCloudMaterial({color: 0x555555, size: 1, sizeAttenuation: false}),
					new THREE.PointCloudMaterial({color: 0x333333, size: 2.07, sizeAttenuation: false}),
					new THREE.PointCloudMaterial({color: 0x3a3a3a, size: 1.05, sizeAttenuation: false}),
					new THREE.PointCloudMaterial({color: 0x1a1a1a, size: 2.09, sizeAttenuation: false}),
					new THREE.PointCloudMaterial({color: 0x1a1a1a, size: 1, sizeAttenuation: false})
				];

			for (i = 10; i < 50; i++) {

				stars = new THREE.PointCloud(starsGeometry[i % 2], starsMaterials[i % 6]);

				stars.rotation.x = Math.random() * 6;
				stars.rotation.y = Math.random() * 6;
				stars.rotation.z = Math.random() * 6;

				s = i * 10;
				stars.scale.set(s, s, s);

				stars.matrixAutoUpdate = false;
				stars.updateMatrix();

				bgspace.scene.add(stars);

			}

		};

		bgspace.render = function () {

			log('@ bgSpace rendering!');

			bgspace.meshMoon.rotation.y += 0.001;

			bgspace.renderer.render(bgspace.scene, bgspace.camera);

		};

		bgspace.animate = function () {

			window.requestAnimationFrame(bgspace.animate);
			bgspace.render();
			bgspace.stats.update();

		};

	};

	return bgSpace;
});

























