//import * as THREE from 'three';

const d3_viewer_4 = document.querySelector("#idD3_viewer_4");
var rangeInp_4 = document.querySelector("#idRange_4");

const scene_4 = new THREE.Scene();
scene_4.background = new THREE.Color("rgb(16, 17, 22)");
var camera_4 = new THREE.PerspectiveCamera( 75, d3_viewer_4.clientWidth / d3_viewer_4.clientHeight, 0.1, 1000 );

const renderer_4 = new THREE.WebGLRenderer();
renderer_4.setSize(d3_viewer_4.clientWidth, d3_viewer_4.clientHeight);

d3_viewer_4.appendChild(renderer_4.domElement);
//document.body.appendChild( renderer_4.domElement );

var lb_4 = document.querySelector("#idLabel_4");

const divisor_4 = 50;

var r1_4 = parseFloat(rangeInp_4.value) / divisor_4;

lb_4.textContent = "Raio: r = " + r1_4.toString() + ";";

const lineBasicMaterial_4 = new THREE.LineBasicMaterial({color: 0xffffff});

var dodec_geometry_1 = new THREE.DodecahedronGeometry(r1_4, 0); 
var dodec_edges_1 = new THREE.EdgesGeometry(dodec_geometry_1); 
//const dodec_mesh_1 = new THREE.Mesh(dodec_geometry_1, new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true}));
var dodec_lines_1 = new THREE.LineSegments(dodec_edges_1, lineBasicMaterial_4); 

//const axesHelper = new THREE.AxesHelper( 5 );
//dodec_mesh_1.add( axesHelper );

scene_4.add(dodec_lines_1);

var camera_radius_4 = 2;
var cameraRotationAngle_4 = 0;//Em radianos;
var cameraRotationVelocity_4 = 0.005;//Em radianos;

var camera_xPosition_4 = 0;
var camera_yPosition_4 = 0;
var camera_zPosition_4 = camera_radius_4;

camera_4.position.set(camera_xPosition_4, camera_yPosition_4, camera_zPosition_4);
//camera_4.position.set(0, 0, camera_radius_4);
camera_4.lookAt(0, 0, 0);

const rotateVelocity_4 = 0.005;

rangeInp_4.addEventListener("input", range_onChange_4);

function range_onChange_4(){
    r1_4 = parseFloat(rangeInp_4.value) / divisor_4;
    lb_4.textContent = "Raio: r = " + r1_4.toString() + ";";
}

function rotateCamera_Circle_4(camera, radius1, cameraRotationVelocity1, cameraRotationAngle1){
    //x: A rotação deverá ser sobre o eixo x;
    //y: Será ignorado;
    //z: É o raio do círculo;

    cameraRotationAngle1 += cameraRotationVelocity1;

    camera.position.x = radius1 * Math.sin(cameraRotationAngle1);
    camera.position.z = radius1 * Math.cos(cameraRotationAngle1);

    camera.lookAt(0, 0, 0);

    return cameraRotationAngle1;
}

function rezizeCamera_Render_4(){
    camera_xPosition_4 = camera_4.position.x;
    camera_yPosition_4 = camera_4.position.y;
    camera_zPosition_4 = camera_4.position.z;

    camera_4 = new THREE.PerspectiveCamera(75, d3_viewer_4.clientWidth / d3_viewer_4.clientHeight, 0.1, 1000 );
    camera_4.position.x = camera_xPosition_4;
    camera_4.position.y = camera_yPosition_4;
    camera_4.position.z = camera_zPosition_4;
    camera_4.lookAt(0, 0, 0);

    renderer_4.setSize(d3_viewer_4.clientWidth, d3_viewer_4.clientHeight);
}

function animate_4() {
	requestAnimationFrame(animate_4);

    scene_4.remove(dodec_lines_1);

    //dodec_mesh_1.rotation.y -= 0.005;

    //dodec_mesh_1.rotation.x = 0.15;

    cameraRotationAngle_4 = rotateCamera_Circle_4(camera_4, camera_radius_4, cameraRotationVelocity_4, cameraRotationAngle_4);

    //dodec_mesh_1.geometry.dispose();
    //dodec_mesh_1.geometry = new THREE.DodecahedronGeometry(r1_4);

    //dodec_geometry_1.dispose();
    //dodec_edges_1.dispose();
    //dodec_lines_1.dispose();

    dodec_geometry_1 = new THREE.DodecahedronGeometry(r1_4);
    dodec_edges_1 = new THREE.EdgesGeometry(dodec_geometry_1);
    dodec_lines_1 = new THREE.LineSegments(dodec_edges_1, lineBasicMaterial_4);

    rezizeCamera_Render_4();

    scene_4.add(dodec_lines_1);

	renderer_4.render(scene_4, camera_4);
}

animate_4();