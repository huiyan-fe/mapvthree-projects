/**
 * @file 添加模型
 */
// import * as mapvthree from 'mapv-three';
import {GLTFLoader} from 'bmap-three/examples/jsm/loaders/GLTFLoader';

export default {
    data() {
        return {

        }
    },
    methods: {
        /**
         * @param {Engine} engine mapvthree引擎
         * @param {Array<Object>} models 模型数据
         *  格式如下：[{
         *      position: [116.319, 39.123, 0],
         *      path: '//bj.bcebos.com/v1/mapopen/api-demos/model/building5.glb',
         *      rotation: [Math.PI / 2, 1.08 * Math.PI / 2]
         *  }]
         */
        async addGLTFModels(engine, models) {
            const loader = new GLTFLoader();
            for (const item of models) {
                loader.load(item.path, gltf => {
                    const model = gltf.scene.children[0];
                    model.position.set(item.position[0], item.position[1], 6);
                    if (item.rotation) {
                        model.rotation.x = item.rotation[0];
                        model.rotation.y = item.rotation[1];
                    }
                    engine.add(model);
                });
            }
        }
    }
}