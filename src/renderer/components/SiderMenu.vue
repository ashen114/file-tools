<template>
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
</template>

<script>
export default {
  name: "siderMenuComponent",
  data() {
    return {
      collapsed: false,
      menuList: [
        {
          id: "0",
          name: "首页",
          icon: "home",
          route: "/home",
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
  props: {},
  methods: {
    handleClickMenu(event) {
      let { key } = event;
      let keys = key.split("-");
      let item = this.menuList[keys[0]];
      let breadcrumbList = [];
      breadcrumbList = [];
      breadcrumbList.push({
        name: this.menuList[keys[0]].name,
      });
      if (keys.length) {
        switch (keys.length) {
          case 2:
            let subItem = item.subMenu[keys[1]];
            breadcrumbList.push({
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
      this.$emit("breadcrumbList", breadcrumbList);
    },
  },
};
</script>

<style></style>
