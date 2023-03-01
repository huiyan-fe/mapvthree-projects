import * as THREE from 'bmap-three';
import * as mapvthree from 'mapv-three';
import {addBuilding} from './addBuilding';
import {addWall} from './addWall';
import {addBubblePoint} from './addBubblePoint';
import {customMapBlack} from '../assets/data/customTopMap';

/* globals BMapGL */
const initMapEngine = (ref, config) => {
    const {center, zoom, heading, pitch} = config;

    // ----------- init bmap ------------
    const map = new BMapGL.Map(ref, {
        restrictCenter: false,
        maxZoom: 25
    });
    map.centerAndZoom(new BMapGL.Point(center[0], center[1]), zoom);
    map.setMapStyleV2({styleJson: customMapBlack});

    map.enableInertialDragging();
    map.enableScrollWheelZoom();
    map.enableContinuousZoom();
    map.enableKeyboard();

    // map.addEventListener('click', function (e) {
    //     console.log(e.latlng.lng + ', ' + e.latlng.lat);
    // });

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
    engine.rendering.useMrt = true; // ?

    // 设置空白天空（三维引擎的光照）
    let sky = engine.add(new mapvthree.EmptySky());
    sky.time = 36000 * 15.5;
    sky.skyLightIntensity = 1.0;

    return {map, engine};
};

export const initScene = async (ref, config) => {
    const {map, engine} = initMapEngine(ref, config);
    const position = engine.map.projectPointArr(config.center);
    addBuilding(position, engine);
    addWall(position, engine);
    addBubblePoint(engine);
};
