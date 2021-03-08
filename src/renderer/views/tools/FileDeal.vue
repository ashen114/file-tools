<template>
  <div class="container">
    <section class="file-dir">
      <a-tree :load-data="getNodeDirList" :tree-data="dirList" />
    </section>
  </div>
</template>

<script>
const fs = require("fs");
const { exec } = require("child_process");

export default {
  name: "FileDeal",
  data() {
    return {
      dirList: [],
    };
  },
  created() {
    this.getDisks();
  },
  methods: {
    /**
     * 获取系统硬盘分区
     */
    getDisks() {
      exec(
        "wmic logicaldisk get caption",
        {
          windowsHide: true,
        },
        (err, stdout, stderr) => {
          if (err) {
            console.error("获取系统盘信息失败:", error);
            return;
          }
          let disks = stdout.trim().split("\n");
          disks.shift();
          if (disks.length) {
            this.dirList = [];
            disks.forEach((item) => {
              item = item.trim();
              const disksDir = fs.readdirSync(item + "\\\\");
              console.log(item, disksDir);
              this.dirList.push({
                title: item,
                key: item + "\\\\",
                isLeaf: false
              });
            });
          }
        }
      );
    },
    /**
     * 获取节点下的目录
     */
    getNodeDirList(treeNode) {
      return new Promise((resolve) => {
        if (treeNode.dataRef.children) {
          resolve();
          return;
        }
        const dirList = fs.readdirSync(treeNode.dataRef.key);
        if(dirList.length){
          treeNode.dataRef.children = [];
          dirList.forEach((item) => {
            let subKey = treeNode.eventKey + item;
            let isFile = fs.statSync(subKey).isFile();
            treeNode.dataRef.children.push({
              title: item,
              key: isFile ? subKey : subKey + "\\\\",
              isLeaf: isFile
            })
          })
          this.dirList = [...this.dirList];
          resolve();
        }
      });
    },
  },
};
</script>

<style></style>
