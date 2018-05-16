<template>
  <div id="wrapper">
    <!-- <img class="img_btn" src="../assets/qrcode.png" alt="" v-if="!show" @click="show=!show"> -->
    <div id="pano"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      config: {
        swf:
          "https://demo-1256583783.cos.ap-guangzhou.myqcloud.com/vtour/tour.swf",
        xml:
          "https://demo-1256583783.cos.ap-guangzhou.myqcloud.com/vtour/tour.xml",

        target: "pano",
        html5: "auto",
        mobilescale: 1.0,
        passQueryParameters: true,
        onready: this.krpanoReady
      }
    };
  },
  created() {},
  // el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。
  mounted() {
    this.getconfig(this.config);
  },
  computed: {},
  methods: {
    getconfig(configs) {
      embedpano(configs);
    },
    krpanoReady(krpano) {
      var xmlstring = `<krpano>
                        <include url="https://demo-1256583783.cos.ap-guangzhou.myqcloud.com/vtour/skin/vtourskin.xml" />
                        <skin_settings maps="false"
                        maps_type="google"
                        maps_bing_api_key=""
                        maps_google_api_key=""
                        maps_zoombuttons="false"
                        gyro="true"
                        webvr="true"
                        webvr_gyro_keeplookingdirection="false"
                        webvr_prev_next_hotspots="true"
                        littleplanetintro="false"
                        title="true"
                        thumbs="true"
                        thumbs_width="120" thumbs_height="80" thumbs_padding="10" thumbs_crop="0|40|240|160"
                        thumbs_opened="false"
                        thumbs_text="false"
                        thumbs_dragging="true"
                        thumbs_onhoverscrolling="false"
                        thumbs_scrollbuttons="false"
                        thumbs_scrollindicator="false"
                        thumbs_loop="false"
                        tooltips_buttons="false"
                        tooltips_thumbs="false"
                        tooltips_hotspots="false"
                        tooltips_mapspots="false"
                        deeplinking="false"
                        loadscene_flags="MERGE"
                        loadscene_blend="OPENBLEND(0.5, 0.0, 0.75, 0.05, linear)"
                        loadscene_blend_prev="SLIDEBLEND(0.5, 180, 0.75, linear)"
                        loadscene_blend_next="SLIDEBLEND(0.5,   0, 0.75, linear)"
                        loadingtext="loading..."
                        layout_width="100%"
                        layout_maxwidth="814"
                        controlbar_width="-24"
                        controlbar_height="40"
                        controlbar_offset="20"
                        controlbar_offset_closed="-40"
                        controlbar_overlap.no-fractionalscaling="10"
                        controlbar_overlap.fractionalscaling="0"
                        design_skin_images="vtourskin.png"
                        design_bgcolor="0x2D3E50"
                        design_bgalpha="0.8"
                        design_bgborder="0"
                        design_bgroundedge="1"
                        design_bgshadow="0 4 10 0x000000 0.3"
                        design_thumbborder_bgborder="3 0xFFFFFF 1.0"
                        design_thumbborder_padding="2"
                        design_thumbborder_bgroundedge="0"
                        design_text_css="color:#FFFFFF; font-family:Arial;"
                        design_text_shadow="1"
                        />
                        <action name="startup" autorun="onstart">
                          if(startscene === null OR !scene[get(startscene)], copy(startscene,scene[0].name); );
                          loadscene(get(startscene), null, MERGE);
                          if(startactions !== null, startactions() );
                        </action>
                        <scene name="scene_Sports02" title="Sports02" onstart="" thumburl="panos/Sports02.tiles/thumb.jpg" lat="" lng="" heading="">
                        <view hlookat="0.0" vlookat="0.0" fovtype="MFOV" fov="120" maxpixelzoom="2.0" fovmin="70" fovmax="140" limitview="auto" />
                        <preview url="https://demo-1256583783.cos.ap-guangzhou.myqcloud.com/panos/Sports01.tiles/preview.jpg" />
                        <image>
                          <cube url="https://demo-1256583783.cos.ap-guangzhou.myqcloud.com/panos/Sports01.tiles/pano_%s.jpg" />
                        </image>
                      </scene>
                      </krpano>`;
      krpano.call(
        "loadxml(" + escape(xmlstring) + ", null, MERGE, BLEND(0.5));"
      );
      krpano.call("loadscene(scene_Sports02)");
    }
  },
  components: {},
  // 一个对象，键是需要观察的表达式，值是对应回调函数。值也可以是方法名，或者包含选项的对象。Vue 实例将会在实例化时调用 $watch()，遍历 watch 对象的每一个属性。
  watch: {}
};
</script>

<style  scoped="" type="text/css">
#wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
}
#pano {
  width: 100%;
  height: 100%;
}
</style>