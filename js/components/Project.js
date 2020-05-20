import * as THREE from '/three.js-master/build/three.module.js'
import { TWEEN } from '/three.js-master/examples/jsm/libs/tween.module.min.js';
// import { ResourceTracker } from 'tracker';


class Project extends THREE.Group {
    constructor(text1, text2, label, color, madewith, description) {
        super();
        this.state = {};

        let ind = color.lastIndexOf("%")
        let l = color.slice(ind - 2, ind);

        // darken color so it's not too bright 
        let solidColor;
        if (label == '04')
            solidColor = color.replace(l, 10);
        else 
            solidColor = color.replace(l, 40);


        var loader3 = new THREE.FontLoader();
        loader3.load('assets/fonts/Krona One_Regular.json', (font) => {
            var textGeo1 = new THREE.TextGeometry(text1, {
                font: font,
                size: 1.5,
                height: 1,
                curveSegments: 5
            });
            var geo1 = new THREE.EdgesGeometry(textGeo1);
            // // add material
            var mat1 = new THREE.LineBasicMaterial({ color: color });
            let textMesh1 = new THREE.LineSegments(geo1, mat1);

            let solidMesh1 = new THREE.Mesh(textGeo1, new THREE.MeshBasicMaterial({color: solidColor}));
            solidMesh1.visible = false;
            solidMesh1.position.set(-9, 0, 0);
            textMesh1.position.set(-9, 0, 0);

            if (text2 != '') {
                var textGeo2 = new THREE.TextGeometry(text2, {
                    font: font,
                    size: 1.5,
                    height: 1,
                    curveSegments: 5
                });
                var geo2 = new THREE.EdgesGeometry(textGeo2);
                // // add material
                var mat2 = new THREE.LineBasicMaterial({ color: color });
                let textMesh2 = new THREE.LineSegments(geo2, mat2);
                let solidMesh2 = new THREE.Mesh(textGeo2, new THREE.MeshBasicMaterial({color: solidColor}));
                solidMesh2.visible = false;
                
                let secondPosition = solidMesh1.position.clone();
                secondPosition.y = secondPosition.y - 2;
                solidMesh2.position.set(secondPosition.x, secondPosition.y, secondPosition.z);
                textMesh2.position.set(secondPosition.x, secondPosition.y, secondPosition.z);
                // console.log(secondPosition);
                this.add(textMesh2);
                this.add(solidMesh2);
                this.state.mesh2 = solidMesh2;
            }

            var bbox = new THREE.Box3().setFromObject(textMesh1);
        
            var LABEL = new THREE.TextGeometry(label, {
                font: font,
                size: .5,
                height: .25,
                curveSegments: 5
            });
            var l_geo = new THREE.EdgesGeometry(LABEL);
            // // add material
            var l_mat = new THREE.LineBasicMaterial({ color: 'white' });
            let l_mesh = new THREE.LineSegments(l_geo, l_mat);
            // l_mesh.position.set(3.5, 1, 0);
            let new_x;
            if (Math.round(bbox.max.x) >= bbox.max.x) new_x = Math.round(bbox.max.x);
            else new_x = Math.round(bbox.max.x) + 0.5;
            l_mesh.position.set(new_x, Math.floor(bbox.max.y), 0);

        
            this.add(l_mesh);
            this.add(textMesh1);
            this.add(solidMesh1);

            this.state.mesh1 = solidMesh1;
            this.color = color;
            // this.oldPosition = position;
         
        });
        this.label = label;
        if (parseInt(label) > 3) this.visible = false;
        this.madewith = madewith;
        this.description = description;
        
    }  

    updateOldPosition() {
        this.oldPosition = this.position.clone();
    }

    scrollUp() {
        const up = new TWEEN.Tween( this.position ).to( {  y: this.oldPosition.y }, 1000 ).start();
        up.onComplete(() => {
            if (parseInt(this.label) <= 3) 
                document.getElementsByClassName(this.label)[0].style.pointerEvents = '';
            else {
                this.visible = false;
                document.getElementsByClassName(this.label)[0].style.pointerEvents = 'none';
            }  
        })
    }

    scrollDown() {
        const down = new TWEEN.Tween( this.position ).to( {  y:this.position.y + 13.5}, 1000 ).start()
        // document.getElementsByClassName(this.label)[0].style.pointerEvents = '';


        // down.onComplete(() => {
            if (parseInt(this.label) <= 3)
                document.getElementsByClassName(this.label)[0].style.pointerEvents = 'none';
            else {
                this.visible = true;
                // console.log(document.getElementsByClassName(this.label)[0].style)
                // for some reason this doesn't turn off the pointer event automatically..
                document.getElementsByClassName(this.label)[0].style.pointerEvents = '';
                for (let child of document.getElementsByClassName(this.label)) {
                    let new_class = child.className.replace('disabled', '')
                    console.log(child);
                    child.className = new_class;
                }
            }
        // })
    }

    update(whichDirection) {
        // Bob back and forth
        // this.rotation.z = 0.05 * Math.sin(timeStamp / 300);

        // Advance tween animations, if any exist
        // whichDirection = true to scroll down
        // whichDirection = false to scroll up
        TWEEN.update();
        // uncomment this to move it automatically
        if (whichDirection)
            this.scrollDown();
        else
            this.scrollUp();
    }
}

export default Project;
