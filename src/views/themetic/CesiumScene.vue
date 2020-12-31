<template>
  <div id="cesiumContainer"></div>
</template>

<script>
export default {
  name: "Map",
  data() {
    return {};
  },
  mounted() {
    var Cesium = this.Cesium;
    var cesiumContainer = document.getElementById("cesiumContainer");
    var viewer = new Cesium.Viewer("cesiumContainer", {
      imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
        url:
          "http://t0.tianditu.com/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=ebf64362215c081f8317203220f133eb",
        layer: "tdtBasicLayer",
        style: "default",
        format: "tiles",
        tileMatrixSetID: "GoogleMapsCompatible",
        show: true,
        maximumLevel: 18,
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
  },
};
</script>

<style>
#cesiumContainer {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>