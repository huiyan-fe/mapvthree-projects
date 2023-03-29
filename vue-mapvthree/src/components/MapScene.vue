<template>
    <div id="container"></div>
</template>

<script>
import {GLTFLoader} from 'bmap-three/examples/jsm/loaders/GLTFLoader';
import {Engine, FlyManager, UltraDynamicSky} from 'mapv-three';
import * as THREE from 'bmap-three';

export default {
    name: 'MapScene',
    mixins: [],
    props: {
        msg: String
    },
    data() {
        return {
            config: {
                center: [116.3899980, 39.9099206, 0],
                pitch: 60,
                zoom: 18
            },
            mixerArr: [],
            prevTime: Date.now()
        }
    },
    create() {

    },
    mounted() {
        this.initScene(this.config);
    },
    methods: {
        initMapEngine(config) {
            const {center, zoom, pitch} = config;

            const engine = new Engine(document.getElementById('container'), {
                rendering: {
                    enableAnimationLoop: true
                }
            });
            engine.map.setCenter(center);
            engine.map.setPitch(pitch);
            engine.map.setZoom(zoom);

            engine.rendering.useMrt = true;
            engine.rendering.bloom.enabled = true;
            engine.rendering.shadow.enabled = true;

            // 设置（提供光源）
            let sky = engine.add(new UltraDynamicSky());
            sky.time = 3600 * 13.5;

            const modelInfo = [
                {
                    position: [116.38999802501954, 39.90992061915485, 0],
                    heading: 10,
                    pitch: 90
                },
                {
                    position: [116.39108091514326, 39.912365496915655, 0],
                    heading: 180,
                    pitch: 80
                }
            ];

            const flyManager = engine.add(new FlyManager());
            const gltfLoader = new GLTFLoader();
            let me = this;
            gltfLoader.load('assets/Parrot.glb', async function (gltf) {
                const model = gltf.scene.children[0];
                for (let i = 0; i < modelInfo.length; i++) {
                    const {position, heading, pitch} = modelInfo[i];
                    const instance = model.clone();
                    const pos = engine.map.projectPointArr(position);
                    instance.rotation.x = Math.PI * 0.5;
                    instance.position.set(...pos);

                    const mixer = new THREE.AnimationMixer(instance);
                    mixer.clipAction(gltf.animations[0]).setDuration(1).play();
                    me.mixerArr.push(mixer);

                    engine.add(instance);
                    engine.event.markEventProxy(instance);
                    engine.event.bind(instance, 'click', e => {
                        console.log(e);
                        flyManager.flyTo({
                            zoom: 20,
                            center: position,
                            pitch,
                            heading
                        }, {
                            duration: 1000
                        });
                    });
                }
            });

            engine.rendering.addBeforeRenderListener(() => {
                if (me.mixerArr) {
                    const time = Date.now();
                    for (let i = 0; i < me.mixerArr.length; i++) {
                        me.mixerArr[i].update((time - me.prevTime) * 0.001);
                    }
                    me.prevTime = time;
                }
            });

            return engine;
        },

        async initScene(config) {
            this.initMapEngine(config);
        }
    }
}
</script>

<style scoped>
#container {
    width: 100%;
    height: 700px;
}
</style>
  