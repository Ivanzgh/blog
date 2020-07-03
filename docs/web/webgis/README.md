## 根据经纬度坐标测距

```js
    function toRadians(degree) {
        return degree * Math.PI / 180;
    }
    function distance(lon1,lat1,lon2,lat2) {
        const R = 6371;    // 地球半径 6371 km
        let deltaLatitude = toRadians(lat2 - lat1);
        let deltaLongitude = toRadians(lon2 - lon1);
        lat1 = toRadians(lat1);
        lat2 = toRadians(lat2);

        let a = Math.sin(deltaLatitude/2) * Math.sin(deltaLatitude/2) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLongitude/2) * Math.sin(deltaLongitude/2);
        let c = 2 * Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
        return R * c;
    }
    let res = distance(116.293598,40.227442,116.29216,40.200555)   // 3km
```