import * as THREE from 'bmap-three';
import * as mapvthree from 'mapv-three';
import {GLTFLoader} from 'bmap-three/examples/jsm/loaders/GLTFLoader';

export const addBuilding = async (position, engine) => {
    addGlfModels(engine);
};

const addGlfModels = engine => {
    const models = [{
        position: [12941316, 4845849, 0],
        path: '//bj.bcebos.com/v1/mapopen/api-demos/model/building5.glb',
    }, {
        position: [12941305, 4845935, 0],
        path: '//bj.bcebos.com/v1/mapopen/api-demos/model/building4.glb',
    }];
    const loader = new GLTFLoader();
    for (const item of models) {
        loader.load(item.path, gltf => {
            const model = gltf.scene.children[0];
            model.position.set(item.position[0], item.position[1], 6);
            model.rotation.x = Math.PI / 2;
            model.rotation.y = 1.08 * Math.PI / 2;
            engine.add(model);
        });
    }
};