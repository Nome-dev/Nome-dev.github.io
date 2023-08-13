//import * as THREE from 'three';

const d3_viewer_2 = document.querySelector("#idD3_viewer_2");
var rangeInp_2 = document.querySelector("#idRange_2");

const scene_2 = new THREE.Scene();
scene_2.background = new THREE.Color("rgb(16, 17, 22)");
var camera_2 = new THREE.PerspectiveCamera( 75, d3_viewer_2.clientWidth / d3_viewer_2.clientHeight, 0.1, 1000 );

const renderer_2 = new THREE.WebGLRenderer();
renderer_2.setSize(d3_viewer_2.clientWidth, d3_viewer_2.clientHeight);

d3_viewer_2.appendChild(renderer_2.domElement);
//document.body.appendChild( renderer_2.domElement );

var lb_2 = document.querySelector("#idLabel_2");

const divisor_2 = 50;

var r1_2 = (parseFloat(rangeInp_2.value) / divisor_2) * Math.sqrt(2);
var r2_2 = parseFloat(rangeInp_2.value) / divisor_2;

lb_2.textContent = "Raio: r = " + r2_2.toString() + ";";

const lineBasicMaterial_1 = new THREE.LineBasicMaterial({color: 0xffffff});

var hexa_geometry_1 = new THREE.BoxGeometry(r1_2, r1_2, r1_2); 
var hexa_edges_1 = new THREE.EdgesGeometry(hexa_geometry_1); 
//const hexa_mesh_1 = new THREE.Mesh(hexa_geometry_1, new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true}));
var hexa_lines_1 = new THREE.LineSegments(hexa_geometry_1, new THREE.LineBasicMaterial( { color: 0xffffff } ) ); 

//const axesHelper = new THREE.AxesHelper( 5 );
//hexa_mesh_1.add( axesHelper );

scene_2.add(hexa_lines_1);

var camera_radius_2 = 2;
var cameraRotationAngle_2 = 0;//Em radianos;
var cameraRotationVelocity_2 = 0.005;//Em radianos;

var camera_xPosition_2 = 0;
var camera_yPosition_2 = 0;
var camera_zPosition_2 = camera_radius_2;

camera_2.position.set(camera_xPosition_2, camera_yPosition_2, camera_zPosition_2);
camera_2.lookAt(0, 0, 0);

const rotateVelocity_2 = 0.005;

rangeInp_2.addEventListener("input", range_onChange_2);

function range_onChange_2(){
    r1_2 = (parseFloat(rangeInp_2.value) / divisor_2) * Math.sqrt(2);
    r2_2 = parseFloat(rangeInp_2.value) / divisor_2;
    lb_2.textContent = "Raio: r = " + r2_2.toString() + ";";
}

function rotateCamera_Circle_2(camera, radius1, cameraRotationVelocity1, cameraRotationAngle1){
    //x: A rotação deverá ser sobre o eixo x;
    //y: Será ignorado;
    //z: É o raio do círculo;

    cameraRotationAngle1 += cameraRotationVelocity1;

    camera.position.x = radius1 * Math.sin(cameraRotationAngle1);
    camera.position.z = radius1 * Math.cos(cameraRotationAngle1);

    camera.lookAt(0, 0, 0);

    return cameraRotationAngle1;
}

function rezizeCamera_Render_2(){
    camera_xPosition_2 = camera_2.position.x;
    camera_yPosition_2 = camera_2.position.y;
    camera_zPosition_2 = camera_2.position.z;

    camera_2 = new THREE.PerspectiveCamera(75, d3_viewer_2.clientWidth / d3_viewer_2.clientHeight, 0.1, 1000 );
    camera_2.position.x = camera_xPosition_2;
    camera_2.position.y = camera_yPosition_2;
    camera_2.position.z = camera_zPosition_2;
    camera_2.lookAt(0, 0, 0);

    renderer_2.setSize(d3_viewer_2.clientWidth, d3_viewer_2.clientHeight);
}

function animate_2() {
	requestAnimationFrame(animate_2);

    scene_2.remove(hexa_lines_1);

    //hexa_mesh_1.rotation.y -= 0.005;

    //hexa_mesh_1.rotation.x += -0.005;

    cameraRotationAngle_2 = rotateCamera_Circle_2(camera_2, camera_radius_2, cameraRotationVelocity_2, cameraRotationAngle_2);

    //console.log(hexa_mesh_1.rotation.x);

    //hexa_mesh_1.position.applyEuler(new THREE.Euler(hexa_mesh_1.rotation.x, hexa_mesh_1.rotation.y + rotateVelocity_2, hexa_mesh_1.rotation.z), "XYZ");

    //hexa_mesh_1.geometry.dispose();
    //hexa_mesh_1.geometry = new THREE.BoxGeometry(r1_2, r1_2, r1_2);

    hexa_geometry_1 = new THREE.BoxGeometry(r1_2, r1_2, r1_2);
    hexa_edges_1 = new THREE.EdgesGeometry(hexa_geometry_1);
    hexa_lines_1 = new THREE.LineSegments(hexa_edges_1, lineBasicMaterial_1);

    rezizeCamera_Render_2();

    scene_2.add(hexa_lines_1);

	renderer_2.render(scene_2, camera_2);
}

animate_2();