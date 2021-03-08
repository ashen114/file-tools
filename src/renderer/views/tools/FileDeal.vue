<template>
  <div class="container">
    <section class="file-dir">
      <a-tree
        showLine
        :load-data="getNodeDirList"
        :tree-data="dirList"
        @select="selectTreeNode"
      />
    </section>
  </div>
</template>

<script>
const fs = require("fs");
const { exec } = require("child_process");
import { openFile } from "@/utils/files.js";

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
              this.dirList.push({
                title: item,
                key: item + "\\\\",
                isLeaf: false,
              });
            });
          }
        }
      );
    },
    /**
     * 获取节点下的目录
     * @param 当前节点
     */
    getNodeDirList(treeNode) {
      return new Promise((resolve) => {
        if (treeNode.dataRef.children) {
          resolve();
          return;
        }
        const dirList = fs.readdirSync(treeNode.dataRef.key);
        if (dirList.length) {
          treeNode.dataRef.children = [];
          dirList.forEach((item) => {
            let subKey = treeNode.eventKey + item;
            fs.stat(subKey, (err, status) => {
              if (err) {
                console.error("当前文件异常:", err);
                return;
              }
              treeNode.dataRef.children.push({
                title: item,
                key: status.isFile() ? subKey : subKey + "\\\\",
                isLeaf: status.isFile(),
              });
            });
          });
          setTimeout(() => {
            this.dirList = [...this.dirList];
            resolve();
          }, 100);
        }
      });
    },
    /**
     * 选择树节点
     * @param selectedKeys 选中的节点
     * @param event 选中事件
     */
    selectTreeNode(selectedKeys, event) {
      let {
        node: {
          dataRef: { isLeaf, key, title },
        },
      } = event;
      // 若为文件类型，则直接打开
      if (isLeaf) {
        openFile(key);
      }
    },
  },
};
</script>

<style></style>
