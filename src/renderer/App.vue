<template>
  <a-layout id="app" style="min-height: 100vh">
    <a-layout-sider v-model="collapsed" collapsible>
      <div class="logo" />
      <a-menu
        @click="handleClickMenu"
        theme="dark"
        :defaultOpenKeys="[menuList[0].id]"
        :defaultSelectedKeys="[menuList[0].id]"
        mode="inline"
      >
        <template v-for="item in menuList">
          <template v-if="!(item.subMenu && item.subMenu.length)">
            <a-menu-item :key="item.id">
              <a-icon :type="item.icon" />
              <span>{{ item.name }}</span>
            </a-menu-item>
          </template>
          <template v-else>
            <a-sub-menu :key="item.id">
              <span slot="title"
                ><a-icon :type="item.icon" /><span>{{ item.name }}</span></span
              >
              <a-menu-item v-for="subItem in item.subMenu" :key="subItem.id">
                <a-icon v-if="subItem.icon" :type="subItem.icon" />
                <span>{{ subItem.name }}</span>
              </a-menu-item>
            </a-sub-menu>
          </template>
        </template>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0" />
      <a-layout-content style="margin: 0 16px">
        <breadcrumb :list="activeTab.breadcrumbList"></breadcrumb>
        <div
          :style="{
            padding: '24px',
            background: '#fff',
            height: 'calc(100vh - 188px)',
          }"
        >
          <router-view></router-view>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
import Breadcrumb from "@/components/Breadcrumb";

export default {
  name: "app",
  data() {
    return {
      collapsed: false,
      activeTab: {
        menuItem: ["0"],
        breadcrumbList: [
          {
            name: "首页",
          },
        ],
      },
      menuList: [
        {
          id: "0",
          name: "首页",
          icon: "home",
          route: "/main",
        },
        {
          id: "1",
          name: "工具",
          icon: "tool",
          subMenu: [
            {
              id: "1-0",
              icon: "file",
              name: "文件处理",
              route: "/file",
            },
            {
              id: "1-1",
              icon: "appstore",
              name: "快捷应用",
              route: "/appstore",
            },
            {
              id: "1-2",
              icon: "bug",
              name: "bug",
              route: "/bug",
            },
          ],
        },
        {
          id: "2",
          name: "日志",
          icon: "history",
          route: "/record",
        },
      ],
    };
  },
  components: {
    breadcrumb: Breadcrumb,
  },
  methods: {
    handleClickMenu(event) {
      let { key } = event;
      let keys = key.split("-");
      let item = this.menuList[keys[0]];

      this.activeTab.breadcrumbList = [];
      this.activeTab.breadcrumbList.push({
        name: this.menuList[keys[0]].name,
      });
      if (keys.length) {
        switch (keys.length) {
          case 2:
            let subItem = item.subMenu[keys[1]];
            this.activeTab.breadcrumbList.push({
              name: subItem.name,
            });
            this.$router.push(subItem.route);
            break;
          case 1:
            this.$router.push(item.route);
            break;
          default:
            this.$router.push("/notfound");
            break;
        }
      }
    },
  },
};
</script>

<style lang="scss">
#app {
  > .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  }
}
</style>
