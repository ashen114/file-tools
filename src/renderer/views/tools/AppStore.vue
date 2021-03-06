<template>
  <a-table :columns="columns" :data-source="fileList" bordered>
    <template
      v-for="col in [
        'name',
        'description',
        'legend',
        'filePath',
        'size',
        'createTime',
        'lastVisitTime',
      ]"
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
          <template v-if="col === 'legend'">
            <a-popover title="Title">
              <template slot="content">
                <template>
                  <a-card hoverable style="width: 20vw">
                    <img slot="cover" alt="example" :src="record.legend" />
                  </a-card>
                </template>
              </template>
              <a>图例</a>
            </a-popover>
          </template>
          <template v-else-if="col === 'createTime' || col === 'lastVisitTime'">
            {{ text | formatTime }}
          </template>
          <template v-else>
            {{ text }}
          </template>
        </template>
      </div>
    </template>
    <template slot="operation" slot-scope="text, record">
      <div class="editable-row-operations">
        <span v-if="record.editable">
          <a @click="() => save(record.key)">保存</a>
          <a-popconfirm
            title="是否取消修改?"
            cancelText="取消"
            okText="确认"
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
        </span>
      </div>
    </template>
  </a-table>
</template>
<script>
const { execFile } = require("child_process");
const fs = require("fs");

export default {
  name: "appStore",
  data() {
    return {
      columns: [
        {
          title: "文件名",
          dataIndex: "name",
          width: "12%",
          scopedSlots: {
            customRender: "name",
          },
        },
        {
          title: "文件描述",
          dataIndex: "description",
          width: "12%",
          scopedSlots: {
            customRender: "description",
          },
        },
        {
          title: "图例",
          dataIndex: "legend",
          width: "4%",
          scopedSlots: { customRender: "legend" },
        },
        {
          title: "文件大小",
          dataIndex: "size",
          width: "6%",
          scopedSlots: { customRender: "size" },
          sorter: (a, b) => parseFloat(a.size) - parseFloat(b.size),
        },
        {
          title: "创建时间",
          dataIndex: "createTime",
          width: "12%",
          scopedSlots: { customRender: "createTime" },
          sorter: (a, b) =>
            new Date(a.createTime).getTime() - new Date(b.createTime).getTime(),
        },
        {
          title: "上次访问时间",
          dataIndex: "lastVisitTime",
          width: "12%",
          scopedSlots: { customRender: "lastVisitTime" },
          sorter: (a, b) =>
            new Date(a.lastVisitTime).getTime() -
            new Date(b.lastVisitTime).getTime(),
        },
        {
          title: "文件路径",
          dataIndex: "filePath",
          width: "35%",
          scopedSlots: { customRender: "filePath" },
        },
        {
          title: "操作",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" },
        },
      ],
      editingKey: "",
      fileList: [
        {
          key: 0,
          name: "SpaceSniffer",
          filePath: "C:\\software\\spacesniffer_1_3_0_2\\SpaceSniffer.exe",
          description: "分析硬盘使用空间",
          size: "",
          createTime: "", // 创建时间
          lastVisitTime: "", // 最后一次访问时间
          legend: "/static/images/2021-03-06-22-20-03.png",
        },
        {
          key: 1,
          name: "EasyU_v3.3",
          filePath: "C:\\software\\EasyU_3.3.2018.0320\\EasyU_v3.3.exe",
          description: "U盘制作工具",
          size: "",
          createTime: "", // 创建时间
          lastVisitTime: "", // 最后一次访问时间
          legend: "/static/images/2021-03-06-23-03-52.png",
        },
        {
          key: 2,
          name: "aida64",
          filePath:
            "C:\\software\\aida64extreme_build_5490_qw8crtk6sv\\aida64.exe",
          description: "系统配置查看工具",
          size: "",
          createTime: "", // 创建时间
          lastVisitTime: "", // 最后一次访问时间
          legend: "/static/images/2021-03-06-23-04-45.png",
        },
        {
          key: 3,
          name: "aida64",
          filePath: "C:\\software\\geek.exe",
          description: "进程查看工具",
          size: "",
          createTime: "", // 创建时间
          lastVisitTime: "", // 最后一次访问时间
          legend: "/static/images/2021-03-06-23-06-13.png",
        },
        {
          key: 4,
          name: "网速管家",
          filePath:
            "C:\\Users\\Administrator\\AppData\\Local\\Programs\\SpeedManager\\网速管家.exe",
          description: "网络测试工具",
          size: "",
          createTime: "", // 创建时间
          lastVisitTime: "", // 最后一次访问时间
          legend: "/static/images/2021-03-06-23-07-50.png",
        },
        {
          key: 5,
          name: "向日葵",
          filePath:
            "C:\\Program Files\\Oray\\SunLogin\\SunloginClient\\SunloginClient.exe",
          description: "远程控制工具",
          size: "",
          createTime: "", // 创建时间
          lastVisitTime: "", // 最后一次访问时间
          legend: "/static/images/2021-03-06-23-11-02.png",
        },
        {
          key: 6,
          name: "XMind",
          filePath: "C:\\Program Files\\XMind\\XMind.exe",
          description: "思维导图",
          size: "",
          createTime: "", // 创建时间
          lastVisitTime: "", // 最后一次访问时间
          legend: "/static/images/2021-03-06-23-12-29.png",
        },
        {
          key: 7,
          name: "free download manager",
          filePath: "C:\\software\\Free Download Manager\\fdm.exe",
          description: "下载工具",
          size: "",
          createTime: "", // 创建时间
          lastVisitTime: "", // 最后一次访问时间
          legend: "/static/images/2021-03-06-23-14-44.png",
        },
        {
          key: 8,
          name: "ScreenToGif_v2.26.0",
          filePath: "C:\\software\\ScreenToGif\\ScreenToGif_v2.26.0.exe",
          description: "gif动画录制工具",
          size: "",
          createTime: "", // 创建时间
          lastVisitTime: "", // 最后一次访问时间
          legend: "/static/images/2021-03-06-23-16-20.png",
        },
        {
          key: 9,
          name: "Windows On Top",
          filePath: "C:\\software\\Windows On Top.exe",
          description: "窗口置顶工具",
          size: "",
          createTime: "", // 创建时间
          lastVisitTime: "", // 最后一次访问时间
          legend: "/static/images/2021-03-06-23-17-32.png",
        },
        {
          key: 10,
          name: "jcpicker_32bit",
          filePath: "C:\\software\\jcpicker5.4\\jcpicker_32bit.exe",
          description: "颜色吸取工具",
          size: "",
          createTime: "", // 创建时间
          lastVisitTime: "", // 最后一次访问时间
          legend: "/static/images/2021-03-06-23-18-48.png",
        },
        {
          key: 11,
          name: "cheatengine",
          filePath:
            "C:\\Program Files\\Cheat Engine 7.1\\cheatengine-x86_64.exe",
          description: "CE修改器，修改内存数据",
          size: "",
          createTime: "", // 创建时间
          lastVisitTime: "", // 最后一次访问时间
          legend: "/static/images/2021-03-06-23-23-17.png",
        },
      ],
      cacheData: [],
    };
  },
  filters: {
    formatTime(time) {
      time = new Date(time);
      return (
        time.getFullYear() +
        "/" +
        (time.getMonth() + 1).toString().padStart(2, 0) +
        "/" +
        time
          .getDate()
          .toString()
          .padStart(2, 0) +
        " " +
        time
          .getHours()
          .toString()
          .padStart(2, 0) +
        ":" +
        time
          .getMinutes()
          .toString()
          .padStart(2, 0) +
        ":" +
        time
          .getSeconds()
          .toString()
          .padStart(2, 0)
      );
    },
  },
  created() {
    if (this.fileList && this.fileList.length) {
      this.fileList = this.fileList.map((item) => {
        let results = fs.statSync(item.filePath);
        let { atime, birthtime, size } = results;
        item = {
          ...item,
          size: (+size / 1024 / 1024).toFixed(2) + "MB",
          createTime: birthtime, // 创建时间
          lastVisitTime: atime, // 最后一次访问时间
        };
        return item;
      });
      this.cacheData = this.fileList.map((item) => ({ ...item }));
    }
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
