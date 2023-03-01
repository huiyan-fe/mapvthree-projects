/**
 * @file 添加点线面体等虚拟几何体
 */

import * as mapvthree from 'mapv-three';

export default {

    methods: {
        /**
         * @param {Engine} engine mapvthree引擎
         * @param {Array<Object>} models 模型数据
         */
        async addWall(engine, url, options = {}) {
            let wall = engine.add(new mapvthree.Wall({
                height: options.height || 3000,
                enbaleAnimation: options.enbaleAnimation || true, // 是否开启动画
                minOpacity: 0.1, // 最小透明度
                maxOpacity: 0.8, // 最大透明度
                animationTailType: 3, // 拖尾动画类型
                animationTailRatio: 0.9, // 拖尾动画长度比例
                animationIdle: 100, // 拖尾动画间隔时间
                // emissive: 0xaa00f8,
            }));
            fetch(url).then(rs => rs.json()).then(async rs => {
                let data = mapvthree.geojsonUtils.convertPolygon2LineString(rs);
                let dataSource = await mapvthree.GeoJSONDataSource.fromGeoJSON(data);
                wall.dataSource = dataSource;
            });
        }
    }
}