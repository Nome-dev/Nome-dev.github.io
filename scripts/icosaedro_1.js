//import * as THREE from 'three';

const d3_viewer_5 = document.querySelector("#idD3_viewer_5");
var rangeInp_5 = document.querySelector("#idRange_5");

const scene_5 = new THREE.Scene();
scene_5.background = new THREE.Color("rgb(16, 17, 22)");
var camera_5 = new THREE.PerspectiveCamera( 75, d3_viewer_5.clientWidth / d3_viewer_5.clientHeight, 0.1, 1000 );

const renderer_5 = new THREE.WebGLRenderer();
renderer_5.setSize(d3_viewer_5.clientWidth, d3_viewer_5.clientHeight);

d3_viewer_5.appendChild(renderer_5.domElement);
//document.body.appendChild( renderer_5.domElement );

var lb_5 = document.querySelector("#idLabel_5");

const divisor_5 = 50;

var r1_5 = parseFloat(rangeInp_5.value) / divisor_5;

lb_5.textContent = "Raio: r = " + r1_5.toString() + ";";

const icos_geometry_1 = new THREE.IcosahedronGeometry(r1_5, 0); 
//const icos_edges_1 = new THREE.EdgesGeometry(icos_geometry_1); 
const icos_lines_1 = new THREE.Mesh(icos_geometry_1, new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true}));
//const icos_lines_1 = new THREE.LineSegments(icos_geometry_1, new THREE.LineBasicMaterial( { color: 0xffffff } ) ); 
scene_5.add(icos_lines_1);

var camera_radius_5 = 2;
var cameraRotationAngle_5 = 0;//Em radianos;
var cameraRotationVelocity_5 = 0.005;//Em radianos;

var camera_xPosition_5 = 0;
var camera_yPosition_5 = 0;
var camera_zPosition_5 = camera_radius_5;

camera_5.position.set(camera_xPosition_5, camera_yPosition_5, camera_zPosition_5);
camera_5.lookAt(0, 0, 0)

/* camera_5.position.set(0, -0.3, 2);
camera_5.lookAt(0, -0.3, 0); */

/* const points_1 = [];
points_1.push(new THREE.Vector3(-5, 0, 0));
points_1.push(new THREE.Vector3(5, 0, 0));
points_1.push(new THREE.Vector3(0, 5, 0));
const geometry = THREE.BufferGeometry().setFromPoints(points_1);
//const edges = new THREE.EdgesGeometry(geometry);
const line = new THREE.Line(geometry, new THREE.LineBasicMaterial({color: 0xffffff})); */

/*camera_5 = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
camera_5.position.set( 0, 0, 100 );
camera_5.lookAt( 0, 0, 0 ); */

rangeInp_5.addEventListener("input", range_onChange_5);

function range_onChange_5(){
    r1_5 = parseFloat(rangeInp_5.value) / divisor_5;
    lb_5.textContent = "Raio: r = " + r1_5.toString() + ";";
}

function rotateCamera_Circle_5(camera, radius1, cameraRotationVelocity1, cameraRotationAngle1){
    //x: A rotação deverá ser sobre o eixo x;
    //y: Será ignorado;
    //z: É o raio do círculo;

    cameraRotationAngle1 += cameraRotationVelocity1;

    camera.position.x = radius1 * Math.sin(cameraRotationAngle1);
    camera.position.z = radius1 * Math.cos(cameraRotationAngle1);

    camera.lookAt(0, 0, 0);

    return cameraRotationAngle1;
}

function rezizeCamera_Render_5(){
    camera_xPosition_5 = camera_5.position.x;
    camera_yPosition_5 = camera_5.position.y;
    camera_zPosition_5 = camera_5.position.z;

    camera_5 = new THREE.PerspectiveCamera(75, d3_viewer_5.clientWidth / d3_viewer_5.clientHeight, 0.1, 1000 );
    camera_5.position.x = camera_xPosition_5;
    camera_5.position.y = camera_yPosition_5;
    camera_5.position.z = camera_zPosition_5;
    camera_5.lookAt(0, 0, 0);

    renderer_5.setSize(d3_viewer_5.clientWidth, d3_viewer_5.clientHeight);
}

function animate_5() {
	requestAnimationFrame(animate_5);

	//cube.rotation.x += 0.01;
	//cube.rotation.y += 0.01;
    //cube.rotation.x = 0.5;

    //icos_lines_1.rotation.x = 0.12;
    //icos_lines_1.rotation.y -= 0.005;
    //line.rotation.y = 0;

    cameraRotationAngle_5 = rotateCamera_Circle_5(camera_5, camera_radius_5, cameraRotationVelocity_5, cameraRotationAngle_5);

    icos_lines_1.rotation.z = 0.5;

    icos_lines_1.geometry.dispose();
    icos_lines_1.geometry = new THREE.IcosahedronGeometry(r1_5);

    //icos_geometry_1 = new THREE.IcosahedronGeometry(r1_5, 0); 
    //icos_edges_1 = new THREE.EdgesGeometry(icos_geometry_1); 
    //icos_lines_1 = new THREE.LineSegments(icos_edges_1, new THREE.LineBasicMaterial( { color: 0xffffff } ) ); 
    //scene_5.add(icos_lines_1);

    rezizeCamera_Render_5();

	renderer_5.render(scene_5, camera_5);
}

animate_5();