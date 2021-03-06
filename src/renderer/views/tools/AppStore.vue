<template>
  <a-table :columns="columns" :data-source="fileList" bordered>
    <template
      v-for="col in ['name', 'description', 'filePath']"
      :slot="col"
      slot-scope="text, record"
    >
      <div :key="col">
        <a-input
          v-if="record.editable && ['filePath'].includes(col)"
          style="margin: -5px 0"
          :value="text"
          @change="(e) => handleChange(e.target.value, record.key, col)"
        />
        <template v-else>
          {{ text }}
        </template>
      </div>
    </template>
    <template slot="operation" slot-scope="text, record">
      <div class="editable-row-operations">
        <span v-if="record.editable">
          <a @click="() => save(record.key)">保存</a>
          <a-popconfirm
            title="Sure to cancel?"
            @confirm="() => cancel(record.key)"
          >
            <a>取消</a>
          </a-popconfirm>
        </span>
        <span v-else>
          <a :disabled="editingKey !== ''" @click="() => edit(record.key)"
            >编辑</a
          >
          <a
            :disabled="editingKey !== ''"
            @click="() => openFile(record.filePath)"
            >打开</a
          >
          <a :disabled="true" @click="() => {}">详情</a>
        </span>
      </div>
    </template>
  </a-table>
</template>
<script>
const { execFile } = require("child_process");
const fs = require("fs");
const path = require("path");

const columns = [
  {
    title: "文件名",
    dataIndex: "name",
    width: "25%",
    scopedSlots: { customRender: "name" },
  },
  {
    title: "文件描述",
    dataIndex: "description",
    width: "15%",
    scopedSlots: { customRender: "description" },
  },
  {
    title: "文件路径",
    dataIndex: "filePath",
    width: "40%",
    scopedSlots: { customRender: "filePath" },
  },
  {
    title: "操作",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" },
  },
];

export default {
  name: "appStore",
  data() {
    return {
      columns,
      editingKey: "",
      fileList: [
        {
          key: 0,
          name: "SpaceSniffer",
          filePath: "C:\\software\\spacesniffer_1_3_0_2\\SpaceSniffer.exe",
          description: "分析硬盘使用空间",
        },
      ],
      cacheData: [],
    };
  },
  created() {
    this.cacheData = this.fileList.map((item) => ({ ...item }));
    fs.stat(this.fileList[0].filePath, (err, stats) => {
      if (err) throw err;
      console.log(`文件属性: ${JSON.stringify(stats)}`);
    });
    let basename = path.basename(this.fileList[0].filePath);
    let extname = path.extname(this.fileList[0].filePath);
    console.info(`文件属性:`, basename, extname);
    result = basename.substring(0, basename.indexOf(extname));
  },
  methods: {
    handleChange(value, key, column) {
      const newData = [...this.fileList];
      const target = newData.filter((item) => key === item.key)[0];
      if (target) {
        target[column] = value;
        this.fileList = newData;
      }
    },
    edit(key) {
      const newData = [...this.fileList];
      const target = newData.filter((item) => key === item.key)[0];
      this.editingKey = key;
      if (target) {
        target.editable = true;
        this.fileList = newData;
      }
    },
    save(key) {
      const newData = [...this.fileList];
      const newCacheData = [...this.cacheData];
      const target = newData.filter((item) => key === item.key)[0];
      const targetCache = newCacheData.filter((item) => key === item.key)[0];
      if (target && targetCache) {
        delete target.editable;
        this.fileList = newData;
        Object.assign(targetCache, target);
        this.cacheData = newCacheData;
      }
      this.editingKey = "";
    },
    cancel(key) {
      const newData = [...this.fileList];
      const target = newData.filter((item) => key === item.key)[0];
      this.editingKey = "";
      if (target) {
        Object.assign(
          target,
          this.cacheData.filter((item) => key === item.key)[0]
        );
        delete target.editable;
        this.fileList = newData;
      }
    },
    openFile(filePath) {
      if (filePath && typeof filePath === "string") {
        execFile(filePath, (error, stdout, stderr) => {
          if (error) {
            this.$message.error("文件异常");
            throw error;
          }
          console.log("stdout:", stdout);
          console.log("stderr:", stderr);
        });
      } else {
        this.$message.error("文件不存在");
      }
    },
  },
};
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
