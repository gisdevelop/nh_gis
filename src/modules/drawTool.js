 export function drawPoint(Cesium,viewer,callback){
    debugger;
    //坐标存储
    var positions = [];

    var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

    //单击鼠标左键画点
    handler.setInputAction(function (movement) {
        var cartesian = viewer.scene.camera.pickEllipsoid(movement.position,viewer.scene.globe.ellipsoid);
        positions.push(cartesian);
        viewer.entities.add({
            position: cartesian,
            point: {
                color:Cesium.Color.RED,
                pixelSize: 5,
                heightReference:Cesium.HeightReference.CLAMP_TO_GROUND
            }
        });
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    //单击鼠标右键结束画点
    handler.setInputAction(function (movement) {
        handler.destroy();
        callback(positions);
    },Cesium.ScreenSpaceEventType.RIGHT_CLICK);
}
//画线
export function drawLineString(Cesium,viewer,callback){
    var PolyLinePrimitive = (function () {
        function _(positions) {
            this.options = {
                polyline: {
                    show: true,
                    positions: [],
                    material: Cesium.Color.RED,
                    width:3
                }
            };
            this.positions = positions;
            this._init();
        }

        _.prototype._init = function () {
            var _self = this;
            var _update = function () {
                return _self.positions;
            };
            //实时更新polyline.positions
            this.options.polyline.positions = new Cesium.CallbackProperty(_update, false);
            viewer.entities.add(this.options);
        };
        return _;
    })();

    var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    var positions = [];
    var poly = undefined;
    //鼠标左键单击画点
    handler.setInputAction(function (movement) {
        var cartesian = viewer.scene.camera.pickEllipsoid(movement.position, viewer.scene.globe.ellipsoid);
        if (positions.length == 0) {
            positions.push(cartesian.clone());
        }
        positions.push(cartesian);
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    //鼠标移动
    handler.setInputAction(function (movement) {
        var cartesian = viewer.scene.camera.pickEllipsoid(movement.endPosition, viewer.scene.globe.ellipsoid);
        if (positions.length >= 2) {
            if (!Cesium.defined(poly)) {
                poly = new PolyLinePrimitive(positions);
            } else {
                    if(cartesian != undefined){
                              positions.pop();
                              cartesian.y += (1 + Math.random());
                              positions.push(cartesian);
                    }
            }
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    //单击鼠标右键结束画线
    handler.setInputAction(function (movement) {
        handler.destroy();
        callback(positions);
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
}
//画面
export function drawPolygon(Cesium,viewer,callback){
        var floatingPoint;
        var activePolygon;
        var activeShapePoints;
        var handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
        handler.setInputAction(function(click) {
            var position = viewer.scene.pickPosition(click.position);
            if(Cesium.defined(location.cartesian)){
                var cartesian = location.cartesian;
                if(activeShapePoints.length === 0){
                    floatingPoint = creatPoint(cartesian);
                    activeShapePoints.push(cartesian);
                    var dynamicPositions = new Cesium.CallbackProperty(function() {
                        return activeShapePoints;
                    },false);
                    activePolygon = createPolygon(dynamicPositions);
                }
                activeShapePoints.push(cartesian);
                //creatPoint(cartesian);
            }
        },Cesium.ScreenSpaceEventType.LEFT_CLICK);
        handler.setInputAction(function(movement) {
            if(Cesium.defined(floatingPoint)){
                if(Cesium.defined(location.endPosition)){
                    floatingPoint.position.setValue(location.endPosition);
                    activeShapePoints.pop();
                    activeShapePoints.push(location.endPosition);
                }
            }
        },Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        handler.setInputAction(function(movement) {
            handler.destroy();
            for(var i=0;i<activeShapePoints.length;i++){
                viewer.entities.remove(activeShapePoints[i]);
            }
            Points = [];
        },Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
        function createPolygon(positionData) {
            var polygon;
            polygon = viewer.entities.add({
                name: 'polygon',
                positions : positionData,
                polygon:{
                    hierarchy : positionData,
                    perPositionHeight: true,
                    material: Cesium.Color.RED.withAlpha(0.7),
                    outline: true,
                    outlineColor: Cesium.Color.YELLOW.withAlpha(1)
                }
            });
            return polygon;
        }
    
}
  //画圆
export function circleDraw(Cesium,viewer,_callBack){
    let _self = this;
    viewer.scene.globe.depthTestAgainstTerrain = true;
    _self.circle= {
      points:[]
      ,rect:null
      ,entity:null
      ,r:1
    };
    var tempPosition;
    let cartographic1;
    let p;
    let tempLon;
    let tempLat;
    var ShapeEventHandler = new Cesium.ScreenSpaceEventHandler(_self.viewer.scene.canvas);
    common.handlerList.push(ShapeEventHandler);
    ShapeEventHandler.setInputAction(function(click){
      tempPosition = _self.getPointFromWindowPoint(click.position);
      //选择的点在球面上
      if(tempPosition){
        function callBackPos() {
          const minlon = Cesium.Math.toDegrees(_self.circle.points[0].longitude);
          const minlat = Cesium.Math.toDegrees(_self.circle.points[0].latitude);
          const maxlon = Cesium.Math.toDegrees(_self.circle.points[1].longitude);
           const maxlat = Cesium.Math.toDegrees(_self.circle.points[1].latitude);
          //const r = _self.getFlatternDistance(minlat, minlon, maxlat, maxlon);
          const r=123;
          if(r){
            return r;
          }
          return 1;
        };
        if(_self.circle.points.length==0) {
          p = click.position;
          cartographic1 = Cesium.Ellipsoid.WGS84.cartesianToCartographic(tempPosition);
          _self.circle.points.push(viewer.scene.globe.ellipsoid.cartesianToCartographic(tempPosition));
          _self.circle.points.push(viewer.scene.globe.ellipsoid.cartesianToCartographic(tempPosition));
          tempLon = Cesium.Math.toDegrees(cartographic1.longitude);
          tempLat = Cesium.Math.toDegrees(cartographic1.latitude);
          _self.circle.entity = viewer.entities.add({
            position: Cesium.Cartesian3.fromDegrees(tempLon,tempLat),
            ellipse : {
              semiMinorAxis : new Cesium.CallbackProperty(callBackPos, false),
              semiMajorAxis : new Cesium.CallbackProperty(callBackPos, false),
              //条形材质
              material :  Cesium.Color.RED.withAlpha(0.3)
            }
          });
        }else{
          ShapeEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
          ShapeEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
          var tempCircle = new Cesium.CircleOutlineGeometry({
            center : Cesium.Cartesian3.fromDegrees(tempLon,tempLat),
            radius : callBackPos(),
            granularity : Math.PI / 2
          });
          var geometry = Cesium.CircleOutlineGeometry.createGeometry(tempCircle);
          var float64ArrayPositionsIn = geometry.attributes.position.values;
          var positionsIn = [].slice.call(float64ArrayPositionsIn);
          _callBack(positionsIn);
        }
      }
    },Cesium.ScreenSpaceEventType.LEFT_CLICK);
    ShapeEventHandler.setInputAction(function(movement){
      if(_self.circle.points.length==0){
        return;
      }
      var moveEndPosition = _self.getPointFromWindowPoint(movement.endPosition);
      //选择的点在球面上
      if(moveEndPosition){
        _self.circle.points.pop();
        _self.circle.points.push(viewer.scene.globe.ellipsoid.cartesianToCartographic(moveEndPosition));
      }
    },Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  }
//画矩形
export function drawRect(callback){
    let _self = this;
    let pointsArr = [];
    _self.shape= {
        points:[],
        rect:null,
        entity:null
    };
    var tempPosition;
    var handle = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    //鼠标左键单击画点
    handle.setInputAction(function(click){
        tempPosition = _self.getPointFromWindowPoint(click.position);
        //选择的点在球面上
        if(tempPosition){
            if(_self.shape.points.length==0) {
                pointsArr.push(tempPosition);
                _self.shape.points.push(viewer.scene.globe.ellipsoid.cartesianToCartographic(tempPosition));
                _self.shape.rect=Cesium.Rectangle.fromCartographicArray(_self.shape.points);
                _self.shape.rect.east+=0.000001;
                _self.shape.rect.north+=0.000001;
                _self.shape.entity=viewer.entities.add({
                    rectangle : {
                        coordinates :_self.shape.rect,
                        material : Cesium.Color.BLACK.withAlpha(0.4),
                        outline : true,
                        outlineWidth: 2,
                        outlineColor : Cesium.Color.RED,
                        height:0
                    }
                });
                _self.bufferEntity = _self.shape.entity;
            }
            else{
                handle.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
                handle.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
                callback(pointsArr);
            }
        }
    },Cesium.ScreenSpaceEventType.LEFT_CLICK);
    //鼠标移动
    handle.setInputAction(function(movement){
        if(_self.shape.points.length==0){
            return;
        }
        var moveEndPosition = _self.getPointFromWindowPoint(movement.endPosition);
        //选择的点在球面上
        if(moveEndPosition){
            pointsArr[1] = moveEndPosition;
            _self.shape.points[1]=viewer.scene.globe.ellipsoid.cartesianToCartographic(moveEndPosition);
            _self.shape.rect= Cesium.Rectangle.fromCartographicArray(_self.shape.points);
            if(_self.shape.rect.west==_self.shape.rect.east)
                _self.shape.rect.east+=0.000001;
            if(_self.shape.rect.south==_self.shape.rect.north)
                _self.shape.rect.north+=0.000001;
            _self.shape.entity.rectangle.coordinates = _self.shape.rect;
        }
    },Cesium.ScreenSpaceEventType.MOUSE_MOVE);
}
//清除所有Entity和ImageryLayers
export  function clearHandle(viewer) {
    //移除所有实体Entity
    viewer.entities.removeAll();
    //移除cesium加载的ImageryLayer
    // for(var i=0; i<this.removeImageryLayers.length; i++){
    //     this.viewer.imageryLayers.remove(this.removeImageryLayers[i]);
    // }
}


//计算两点间距离
// function getFlatternDistance(lat1, lng1, lat2, lng2) {
//         var EARTH_RADIUS = 6378137.0;    //单位M
//         var PI = Math.PI;

//         function getRad(d) {
//             return d * PI / 180.0;
//         }
//         var f = getRad((lat1 + lat2) / 2);
//         var g = getRad((lat1 - lat2) / 2);
//         var l = getRad((lng1 - lng2) / 2);

//         var sg = Math.sin(g);
//         var sl = Math.sin(l);
//         var sf = Math.sin(f);

//         var s, c, w, r, d, h1, h2;
//         var a = EARTH_RADIUS;
//         var fl = 1 / 298.257;

//         sg = sg * sg;
//         sl = sl * sl;
//         sf = sf * sf;

//         s = sg * (1 - sl) + (1 - sf) * sl;
//         c = (1 - sg) * (1 - sl) + sf * sl;

//         w = Math.atan(Math.sqrt(s / c));
//         r = Math.sqrt(s * c) / w;
//         d = 2 * w * a;
//         h1 = (3 * r - 1) / 2 / c;
//         h2 = (3 * r + 1) / 2 / s;

//         return d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg));
// }