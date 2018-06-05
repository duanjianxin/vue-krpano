<!--  -->
<template>
    <div>
        <div><input id="file-selector" type="file" @change="doUpload($event.currentTarget)" />单文件上传</div>
        <br>
        <div><input id="file-selector" type="file" @change="doUpload($event.currentTarget)" webkitdirectory />文件夹上传</div>
    </div>
</template>

<script>
import COS from "cos-js-sdk-v5";
export default {
  data() {
    return {
      msg: "aaaaa",
      Bucket: "demo-1256583783",
      Region: "ap-guangzhou",
      key: "uploadfile/", //设置默认存储文件夹
      filesList: []
    };
  },

  created() {},

  components: {},

  computed: {},

  mounted() {},
  methods: {
    //   获取指定字符前/后的字符串
    getStr(string, str) {
      if (string) {
        return string.split(str)[0] + "/";
      } else {
        return "";
      }
    },
    doUpload(event) {
      let envs = event.files;
      if (!envs) {
        alert("未选择上传文件");
        return;
      } else {
        for (let i = 0; i < envs.length; i++) {
          this.filesList.push({
            Bucket: this.Bucket,
            Region: this.Region,
            Key:
              this.key +
              this.getStr(envs[i].webkitRelativePath, "/") +
              envs[i].name,
            Body: envs[i]
          });
        }
      }

      // ===================================================================================

      const cos = new COS({
        getAuthorization: function(options, callback) {
          var authorization = COS.getAuthorization({
            SecretId: "",
            SecretKey: "",
            Method: options.Method,
            Key: options.Key,
            Query: options.Query,
            Headers: options.Headers,
            Expires: 60
          });
          callback(authorization);
        }
      });
      let filesData = this.filesList;
      cos.uploadFiles(
        {
          files: filesData,
          SliceSize: 1024 * 1024,
          onProgress: function(info) {
            var percent = parseInt(info.percent * 10000) / 100;
            var speed = parseInt(info.speed / 1024 / 1024 * 100) / 100;
            console.log("进度：" + percent + "%; 速度：" + speed + "Mb/s;");
          },
          onFileFinish: function(err, data, options) {
            console.log(options.Key + " 上传" + (err ? "失败" : "完成"));
          }
        },
        function(err, data) {
          console.log(err || data);
        }
      );
    }
  },
  watch: {}
};
</script>
<style lang='scss' scoped type='text/css'>
// AKIDHLAk5BqoGSQ8boGNr79yZw5zf6JHcXoq
// yiDSSEk02oLccQ0LQIv62jDSR9cpmTu5
</style>