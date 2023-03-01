<template>
    <div id="container"></div>
</template>

<script>
import * as mapvthree from 'mapv-three';
import addModels from '../mixins/addModels';
import addGeometry from '../mixins/addGeometry';

/* globals BMAP_SATELLITE_MAP */
/* globals BMapGL */
export default {
    name: 'MapScene',
    mixins: [addModels, addGeometry],
    props: {
        msg: String
    },
    data() {
        return {
            config: {
                center: [116.30470, 39.96407, 0],
                pitch: 10,
                zoom: 12,
                heading: 0
            }
        }
    },
    create() {

    },
    mounted() {
        this.initScene(this.config);
    },
    methods: {
        initMapEngine(config) {
            const {center, zoom, heading, pitch} = config;

            // ----------- init map --------------
            const map = new BMapGL.Map('container', {
                restrictCenter: false,
                maxZoom: 25
            });
            map.centerAndZoom(new BMapGL.Point(center[0], center[1]), zoom);
            map.setMapType(BMAP_SATELLITE_MAP);
            map.enableInertialDragging();
            map.enableScrollWheelZoom();
            map.enableContinuousZoom();
            map.enableKeyboard();
            
            map.addEventListener('click', function(e) {
                console.log(e.latlng.lng + ', ' + e.latlng.lat);
            });

            // ----------- init mapvthree -------------
            const engine = new mapvthree.Engine(map, {
                rendering: {
                    enableAnimationLoop: true
                }
            });
            engine.map.setCenter(center);
            engine.map.setZoom(zoom);
            engine.map.setHeading(heading);
            engine.map.setPitch(pitch);

            engine.rendering.fog.enabled = true;
            engine.rendering.useMrt = true;

            // 设置空白天空（提供光源）
            let sky = engine.add(new mapvthree.EmptySky());
            sky.time = 36000 * 15.5;

            return {map, engine};
        },

        addBuilding(engine) {
            const models = [{
                position: [116.319, 39.123, 0],
                path: '//bj.bcebos.com/v1/mapopen/api-demos/model/building5.glb',
                rotation: [Math.PI / 2, 1.08 * Math.PI / 2]
            }, {
                position: [116.313, 39.213, 0],
                path: '//bj.bcebos.com/v1/mapopen/api-demos/model/building4.glb',
                rotation: [Math.PI / 2, 1.08 * Math.PI / 2]
            }];
            this.addGLTFModels(engine, models);
        },

        addBJWall(engine) {
            const dataUrl = 'https://mapv-three.bj.bcebos.com/gallery/data/geojson/polygon.geojson';
            this.addWall(engine, dataUrl);
        },

        async initScene (config) {
            const {engine} = this.initMapEngine(config);
            // const position = engine.map.projectPointArr(config.center);
            // console.log(position);

            this.addBuilding(engine);
            this.addBJWall(engine);
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
  