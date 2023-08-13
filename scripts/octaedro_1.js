//import * as THREE from 'three';

const d3_viewer_3 = document.querySelector("#idD3_viewer_3");
var rangeInp_3 = document.querySelector("#idRange_3");

const scene_3 = new THREE.Scene();
scene_3.background = new THREE.Color("rgb(16, 17, 22)");
var camera_3 = new THREE.PerspectiveCamera( 75, d3_viewer_3.clientWidth / d3_viewer_3.clientHeight, 0.1, 1000 );

const renderer_3 = new THREE.WebGLRenderer();
renderer_3.setSize(d3_viewer_3.clientWidth, d3_viewer_3.clientHeight);

d3_viewer_3.appendChild(renderer_3.domElement);
//document.body.appendChild( renderer_3.domElement );

var lb_3 = document.querySelector("#idLabel_3");

const divisor_3 = 50;

var r1_3 = parseFloat(rangeInp_3.value) / divisor_3;

lb_3.textContent = "Raio: r = " + r1_3.toString() + ";";

const octa_geometry_1 = new THREE.OctahedronGeometry(r1_3, 0); 
//const icos_edges_1 = new THREE.EdgesGeometry(octa_geometry_1); 
const octa_lines_1 = new THREE.Mesh(octa_geometry_1, new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true}));
//const octa_lines_1 = new THREE.LineSegments(octa_geometry_1, new THREE.LineBasicMaterial( { color: 0xffffff } ) ); 

//const axesHelper = new THREE.AxesHelper( 5 );
//octa_lines_1.add( axesHelper );

scene_3.add(octa_lines_1);

var camera_radius_3 = 2;
var cameraRotationAngle_3 = 0;//Em radianos;
var cameraRotationVelocity_3 = 0.005;//Em radianos;

var camera_xPosition_3 = 0;
var camera_yPosition_3 = 0;
var camera_zPosition_3 = camera_radius_3;

camera_3.position.set(camera_xPosition_3, camera_yPosition_3, camera_zPosition_3);
camera_3.lookAt(0, 0, 0);

const rotateVelocity_3 = 0.005;

rangeInp_3.addEventListener("input", range_onChange_3);

function range_onChange_3(){
    r1_3 = parseFloat(rangeInp_3.value) / divisor_3;
    lb_3.textContent = "Raio: r = " + r1_3.toString() + ";";
}

function rotateCamera_Circle_3(camera, radius1, cameraRotationVelocity1, cameraRotationAngle1){
    //x: A rotação deverá ser sobre o eixo x;
    //y: Será ignorado;
    //z: É o raio do círculo;

    cameraRotationAngle1 += cameraRotationVelocity1;

    camera.position.x = radius1 * Math.sin(cameraRotationAngle1);
    camera.position.z = radius1 * Math.cos(cameraRotationAngle1);

    camera.lookAt(0, 0, 0);

    return cameraRotationAngle1;
}

function rezizeCamera_Render_3(){
    camera_xPosition_3 = camera_3.position.x;
    camera_yPosition_3 = camera_3.position.y;
    camera_zPosition_3 = camera_3.position.z;

    camera_3 = new THREE.PerspectiveCamera(75, d3_viewer_3.clientWidth / d3_viewer_3.clientHeight, 0.1, 1000 );
    camera_3.position.x = camera_xPosition_3;
    camera_3.position.y = camera_yPosition_3;
    camera_3.position.z = camera_zPosition_3;
    camera_3.lookAt(0, 0, 0);

    renderer_3.setSize(d3_viewer_3.clientWidth, d3_viewer_3.clientHeight);
}

function animate_3() {
	requestAnimationFrame(animate_3);

    octa_lines_1.rotation.y -= 0.005;

    octa_lines_1.rotation.x = 0.15;

    //cameraRotationAngle_3 = rotateCamera_Circle_3(camera_3, camera_radius_3, cameraRotationVelocity_3, cameraRotationAngle_3);

    octa_lines_1.geometry.dispose();
    octa_lines_1.geometry = new THREE.OctahedronGeometry(r1_3);

    rezizeCamera_Render_3();

	renderer_3.render(scene_3, camera_3);
}

animate_3();