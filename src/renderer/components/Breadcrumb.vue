<template>
  <a-breadcrumb style="margin: 16px 0">
    <a-breadcrumb-item v-for="(item, index) in list" :key="index">
      {{ item.name }}
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
export default {
  name: "breadcrumb",
  data() {
    return {};
  },
  props: {
    list: {
      type: Array,
      default: [],
    },
  },
  methods: {},
};
</script>

<style></style>
