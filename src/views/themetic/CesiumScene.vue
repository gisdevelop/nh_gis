<template>
  <div id="cesium">
    <el-container style="height: 100%">
      <el-header
        height="27px"
        style="padding: 0px; background-color: rgb(184 201 219)"
      >
        <el-dropdown split-button type="primary" @command="handleCommand_draw">
          画图
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">画点</el-dropdown-item>
            <el-dropdown-item command="b" divided>画线</el-dropdown-item>
            <el-dropdown-item command="c" divided>画面</el-dropdown-item>
            <el-dropdown-item command="d" divided>画圆</el-dropdown-item>
            <el-dropdown-item command="e" divided>画矩形</el-dropdown-item>
            <el-dropdown-item command="f" divided>清除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown
          split-button
          type="primary"
          @command="handleCommand_spatial"
        >
          空间分析
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">开挖分析</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown
          split-button
          type="primary"
          @command="handleCommand_dataInit"
        >
          模型加载
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="bimLoad">加载BIM</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main style="padding: 0px">
        <div id="cesiumContainer" style="width: 100%; height: 100%"></div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import * as drawTool from "../../modules/drawTool";

export default {
  name: "Map",
  data() {
    return {};
  },
  mounted() {
    //var Cesium = this.Cesium;
    this.Cesium.Ion.defaultAccessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwNGUyNWRkMS0xMmU1LTRmMWUtYmYwYy01ZTY4OTRhNDFhY2MiLCJpZCI6NDc5MTYsImlhdCI6MTYxNzE3NDk5NH0.y_0F7JKnGNSk0wLFiMycHXKTjODwzn0x12K1OKNamMg";
    //var cesiumContainer = document.getElementById("cesiumContainer");
    var viewer = new this.Cesium.Viewer("cesiumContainer", {
      imageryProvider: new this.Cesium.WebMapTileServiceImageryProvider({
        url:
          "http://t0.tianditu.com/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=ebf64362215c081f8317203220f133eb",
        layer: "tdtBasicLayer",
        style: "default",
        format: "tiles",
        tileMatrixSetID: "GoogleMapsCompatible",
        show: true,
        maximumLevel: 18,
      }),
      terrainProvider: new this.Cesium.createWorldTerrain({
        requestVertexNormals: true,
        requestWaterMask: true,
      }),
      // 隐藏界面控件
      geocoder: false,
      homeButton: false,
      sceneModePicker: false,
      baseLayerPicker: false,
      navigationHelpButton: false,
      animation: false,
      timeline: false,
      fullscreenButton: false,
      vrButton: false,
    });
    this.glbalVar.gbViewer = viewer;
    viewer.scene.globe.enableLighting = true;
  },
  methods: {
    handleCommand_draw(command) {
      if (command == "a") {
        drawTool.drawPoint(
          this.Cesium,
          this.glbalVar.gbViewer,
          function (positions) {
            var wgs84_positions = [];
            for (var i = 0; i < positions.length; i++) {
              var wgs84_point = _this.Cartesian3_to_WGS84({
                x: positions[i].x,
                y: positions[i].y,
                z: positions[i].z,
              });
              wgs84_positions.push(wgs84_point);
            }
            console.log(wgs84_positions);
          }
        );
      }
      if (command == "b") {
        drawTool.drawLineString(
          this.Cesium,
          this.glbalVar.gbViewer,
          function (positions) {
            var wgs84_positions = [];
            for (var i = 0; i < positions.length; i++) {
              var wgs84_point = _this.Cartesian3_to_WGS84({
                x: positions[i].x,
                y: positions[i].y,
                z: positions[i].z,
              });
              wgs84_positions.push(wgs84_point);
            }
            console.log(wgs84_positions);
          }
        );
      }
      if (command == "c") {
        drawTool.drawPolygon(
          this.Cesium,
          this.glbalVar.gbViewer,
          function (positions) {
            var wgs84_positions = [];
            for (var i = 0; i < positions.length; i++) {
              var wgs84_point = _this.Cartesian3_to_WGS84({
                x: positions[i].x,
                y: positions[i].y,
                z: positions[i].z,
              });
              wgs84_positions.push(wgs84_point);
            }
            console.log(wgs84_positions);
          }
        );
      }
      if (command == "d") {
        drawTool.drawRect(
          this.Cesium,
          this.glbalVar.gbViewer,
          function (positions) {
            var wgs84_positions = [];
            for (var i = 0; i < positions.length; i++) {
              var wgs84_point = _this.Cartesian3_to_WGS84({
                x: positions[i].x,
                y: positions[i].y,
                z: positions[i].z,
              });
              wgs84_positions.push(wgs84_point);
            }
            console.log(wgs84_positions);
          }
        );
      }
      if (command == "e") {
        drawTool.circleDraw(
          this.Cesium,
          this.glbalVar.gbViewer,
          function (positions) {
            var wgs84_positions = [];
            for (var i = 0; i < positions.length; i++) {
              var wgs84_point = _this.Cartesian3_to_WGS84({
                x: positions[i].x,
                y: positions[i].y,
                z: positions[i].z,
              });
              wgs84_positions.push(wgs84_point);
            }
            console.log(wgs84_positions);
          }
        );
      }
      if (command == "f") {
        drawTool.clearHandle(this.glbalVar.gbViewer);
      }
    },
    handleCommand_spatial(command) {},
    handleCommand_dataInit(command) {
      if (command == "bimLoad") {
        var modelMatrix = this.Cesium.Transforms.eastNorthUpToFixedFrame(
          this.Cesium.Cartesian3.fromDegrees(
            120.62898254394531,
            30.02804946899414,
            1.0
          )
        );
        var model =  this.glbalVar.gbViewer.scene.primitives.add(
          this.Cesium.Model.fromGltf({
            url: "../../../zhenghe10.gltf", //模型文件相对路径
            modelMatrix: modelMatrix,
            scale: 1,
            //调整模型在地图中的大小
          })
        );
        this.glbalVar.gbViewer.camera.flyTo({
          //设置视角
          destination:this.Cesium.Cartesian3.fromDegrees(
            120.62898254394531,
            30.02804946899414,
            100.0
          ),
        });
      }
    },

    exevat(Cesium, viewer) {
      var tpurl = require("../../assets/img/excavate_kuangqu.jpg");
      var points = [
        Cesium.Cartesian3.fromDegrees(116.5, 40.8),
        Cesium.Cartesian3.fromDegrees(116.6, 40.8),
        Cesium.Cartesian3.fromDegrees(116.6, 40.9),
      ];
      var pointsLength = points.length;
      var clippingPlanes = []; // 存储ClippingPlane集合
      for (var i = 0; i < pointsLength; ++i) {
        var nextIndex = (i + 1) % pointsLength;
        var midpoint = Cesium.Cartesian3.add(
          points[i],
          points[nextIndex],
          new Cesium.Cartesian3()
        );
        midpoint = Cesium.Cartesian3.multiplyByScalar(midpoint, 0.5, midpoint);
        var up = Cesium.Cartesian3.normalize(midpoint, new Cesium.Cartesian3());
        var right = Cesium.Cartesian3.subtract(
          points[nextIndex],
          midpoint,
          new Cesium.Cartesian3()
        );
        right = Cesium.Cartesian3.normalize(right, right);
        var normal = Cesium.Cartesian3.cross(
          right,
          up,
          new Cesium.Cartesian3()
        );
        normal = Cesium.Cartesian3.normalize(normal, normal);

        var originCenteredPlane = new Cesium.Plane(normal, 0.0);
        var distance = Cesium.Plane.getPointDistance(
          originCenteredPlane,
          midpoint
        );

        clippingPlanes.push(new Cesium.ClippingPlane(normal, distance));
      }
      viewer.scene.globe.clippingPlanes = new Cesium.ClippingPlaneCollection({
        planes: clippingPlanes,
        edgeWidth: 1.0,
        edgeColor: Cesium.Color.YELLOW,
      });
      viewer.entities.add({
        polygon: {
          hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights([
            116.5,
            40.8,
            10.0,
            116.6,
            40.8,
            10.0,
            116.6,
            40.9,
            10.0,
          ]),
          material: new Cesium.ImageMaterialProperty({
            image: tpurl,
          }),
          closeTop: false, // 这个要设置为false
          extrudedHeight: 0,
          perPositionHeight: true, // 这个要设置true
        },
      });

      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(116.5, 40.8, 0),
        orientation: {
          heading: Cesium.Math.toRadians(0.0),
          pitch: Cesium.Math.toRadians(-25.0),
          roll: 0.0,
        },
      });
    },
  },
};
</script>

<style>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-header {
  background-color: #b4c6e1;
  color: #333;
  line-height: 25px;
}
.el-button {
  border: 1px !important;
  padding: 1px !important;
  width: 65px;
  height: 25px;
}
#cesium {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>