/**
 * @file 添加无厚度的墙
*/
import * as THREE from 'bmap-three';
import * as mapvthree from 'mapv-three';
import {GLTFLoader} from 'bmap-three/examples/jsm/loaders/GLTFLoader';

function getSquareArea(center, radius) {
    const areaArr = [];
    areaArr.push([center[0] - radius, center[1] - radius]);
    areaArr.push([center[0] - radius, center[1] + radius]);
    areaArr.push([center[0] + radius, center[1] + radius]);
    areaArr.push([center[0] + radius, center[1] - radius]);
    areaArr.push([center[0] - radius, center[1] - radius]);

    return {
        geometry: {
            type: 'LineString',
            coordinates: areaArr
        }
    };
}

export const addWall = async (position, engine) => {
    let wall = engine.add(new mapvthree.Wall({
        height: 20, // 墙高度
        color: 0x5ac4f6,
        // opacity: 0.2,
        enableAnimation: true, // 是否开启动画
        minOpacity: 0.1, // 最小透明度
        maxOpacity: 0.8, // 最大透明度
        animationTailType: 3, // 拖尾动画类型
        animationTailRatio: 0.6, // 拖尾动画长度比例
        animationIdle: 100 // 拖尾动画间隔时间
    }));
    const wallData = await mapvthree.GeoJSONDataSource.fromGeoJSON([getSquareArea(position, 100)]);
    wall.dataSource = wallData;
};
