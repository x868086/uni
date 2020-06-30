<template>
  <div class="dashboard-container">
    <div class="dashboard-text">用户: {{ nickname }}</div>
    <div class="dashboard-text">
      角色:
      <span v-for="role in roles" :key="role">{{ role }},</span>
    </div>
    <div class="dashboard-text">
      角色属性:
      <span v-for="rolename in rolesname" :key="rolename">{{ rolename }},</span>
    </div>
    <div class="dashboard-text">
      组织节点:
      <span>{{ orgdesc }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters(['nickname', 'roles', 'rolesname', 'orgdesc'])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
