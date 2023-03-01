/**
 * @file 添加气泡点
*/
import * as THREE from 'bmap-three';
import * as mapvthree from 'mapv-three';
import {GLTFLoader} from 'bmap-three/examples/jsm/loaders/GLTFLoader';

function getWaveData(engine) {
    const areaArr = [
        [116.25545, 40.05384, 0],
        [116.25534, 40.05393, 0],
        [116.25502, 40.05595, 0],
        [116.26377, 40.05612, 0],
        [116.26420, 40.05370, 0],
        [116.26089, 40.05210, 0],
        [116.25545, 40.05384, 0]
    ];
    const resArea = [];
    for (let i = 0; i < areaArr.length; i++) {
        resArea.push(engine.map.projectPointArr(areaArr[i]));
    }
    // engine.map.projectPointArr(config.center);

    return {
        geometry: {
            type: 'LineString',
            coordinates: resArea
        }
    };
}

export const addBubblePoint = async (engine) => {
    const waveBubble = engine.add(new mapvthree.BubblePoint({
        color: 'rgba(90, 160, 117, 1.0)',
        size: 50,
        type: 'wave',
        duration: 2000
    }));
    const waveData = await mapvthree.GeoJSONDataSource.fromGeoJSON([getWaveData(engine)]);
    console.log(waveData)
    waveBubble.dataSource = waveData;
}