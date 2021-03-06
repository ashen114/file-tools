<template>
  <a-layout id="app" style="min-height: 100vh">
    <siderMenuComponent
      @breadcrumbList="getBreadcrumbList"
    ></siderMenuComponent>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <headComponent></headComponent>
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <breadcrumbComponent
          :list="activeTab.breadcrumbList"
        ></breadcrumbComponent>
        <div class="content">
          <router-view></router-view>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        <footComponent></footComponent>
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
import headComponent from "@/components/Head";
import siderMenuComponent from "@/components/SiderMenu";
import breadcrumbComponent from "@/components/Breadcrumb";
import footComponent from "@/components/Foot";

export default {
  name: "app",
  data() {
    return {
      activeTab: {
        menuItem: ["0"],
        breadcrumbList: [
          {
            name: "首页",
          },
        ],
      },
    };
  },
  components: {
    headComponent,
    breadcrumbComponent,
    siderMenuComponent,
    footComponent,
  },
  methods: {
    getBreadcrumbList(breadcrumbList) {
      this.activeTab.breadcrumbList = breadcrumbList;
    },
  },
};
</script>

<style lang="scss" scoped>
#app {
  > .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  }
  .content {
    padding: 24px;
    background: #fff;
    height: calc(100vh - 188px);
    overflow: auto;
  }
}
</style>
