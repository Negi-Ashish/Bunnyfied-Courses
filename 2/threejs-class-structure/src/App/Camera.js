import * as THREE from 'three'
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { sizesStore } from './Utils/Store.js';


import App from './App.js'

export default class Camera{
    constructor() {
        this.app = new App()
        this.canvas = this.app.canvas

        this.sizesStore = sizesStore

        this.sizes = this.sizesStore.getState()

        this.setInstance()
        this.setControls()
        this.setResizeLister()
        console.log("Camera is Ready")
    }

    setInstance() {
        this.instance = new THREE.PerspectiveCamera(
            35,
            this.sizes?.width/ this.sizes?.height ,
            0.1,
            200
          );
        this.instance.position.z = 5;
    }

    setControls() {
        this.controls = new OrbitControls(this.instance, this.canvas);
        this.controls.enableDamping = true;

    }

    setResizeLister() {
        this.sizesStore.subscribe((sizes)=>{
            this.instance.aspect = sizes.width / sizes.height
            this.instance.updateProjectionMatrix()
        })
    }


    loop() {
        this.controls.update()
        // console.log("Camera Loop is Called")
    }
}