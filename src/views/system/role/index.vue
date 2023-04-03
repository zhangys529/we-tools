<template>
  <div v-if="user.userType===999" class="app-container">
    <el-row class="head-container">
      <el-input v-model="query.condition.roleName" size="small" clearable placeholder="角色名称" class="filter-item" @keypress.enter.native="page()" />
      <el-button :loading="loading" size="mini" type="primary" icon="el-icon-refresh" class="filter-item" @click="page()">搜索</el-button>
      <el-button :loading="loading" size="mini" type="success" icon="el-icon-plus" class="filter-item" @click="add">创建角色</el-button>
    </el-row>

    <el-table v-loading="loading" row-key="roleId" :data="roles" default-expand-all border :header-cell-style="{background: 'aliceblue'}">
      <el-table-column fixed prop="users" type="expand">
        <template slot-scope="scope">
          <el-table v-if="scope.row.users" :data="scope.row.users" row-key="userId" size="mini" border stripe :header-cell-style="{background: 'aliceblue'}">
            <el-table-column prop="username" label="账号" />
            <el-table-column prop="nickname" label="昵称" />
            <el-table-column prop="userType" label="用户类型">
              <template slot-scope="scopeUser">
                <el-tag :type="enumFormatter.enumColorFormatter(enums.userTypes,scopeUser.row.userType)">{{ enumFormatter.enumTitleFormatter(enums.userTypes,scopeUser.row.userType) }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="userStatus" label="用户状态">
              <template slot-scope="scopeUser">
                <el-tag :type="enumFormatter.enumColorFormatter(enums.userStatuses,scopeUser.row.userStatus)">{{ enumFormatter.enumTitleFormatter(enums.userStatuses,scopeUser.row.userStatus) }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" :formatter="enumFormatter.timeFormatter" />
          </el-table>
        </template>
      </el-table-column>
      <el-table-column prop="roleName" label="后台角色" />
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="edit(scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="remove(scope.row)">删除</el-button>
          <el-button size="mini" type="primary" @click="menuDialogShow(scope.row)">关联菜单</el-button>
          <el-button size="mini" type="success" @click="userDialogShow(scope.row)">关联用户</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      v-if="total>=0"
      background
      :total="total"
      :current-page="query.pageNum"
      :page-size="query.pageSize"
      :page-sizes="[10, 20, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      @current-change="handlePageNumChange"
      @size-change="handlePageSizeChange"
    />

    <el-dialog title="关联菜单" :close-on-click-modal="false" :visible.sync="menuDialogVisible" :before-close="menuDialogClose">
      <el-tree ref="menus" :data="menus" node-key="menuId" show-checkbox highlight-current default-expand-all :default-checked-keys="roleMenu.menuIds">
        <span slot-scope="scope">
          <span :class="scope.data.icon" style="margin-right: 10px"></span>
          <span>{{ scope.data.title }}</span>
        </span>
      </el-tree>
      <el-row type="flex" justify="center" align="middle">
        <el-button size="mini" class="filter-item" @click="menuDialogClose">取 消</el-button>
        <el-button size="mini" type="primary" class="filter-item" @click="bindMenu">提 交</el-button>
      </el-row>
    </el-dialog>

    <el-dialog title="关联用户" :close-on-click-modal="false" :visible.sync="userDialogVisible" :before-close="userDialogClose">
      <el-table ref="boundUserTable" :data="users" row-key="userId" border stripe :header-cell-style="{background: 'aliceblue'}" @selection-change="handleUserSelectionChange">
        <el-table-column type="selection" fixed width="55" />
        <el-table-column prop="username" label="账号" />
        <el-table-column prop="nickname" label="昵称" />
        <el-table-column prop="userType" label="用户类型">
          <template slot-scope="scope">
            <el-tag :type="enumFormatter.enumColorFormatter(enums.userTypes,scope.row.userType)">{{ enumFormatter.enumTitleFormatter(enums.userTypes,scope.row.userType) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="userStatus" label="用户状态">
          <template slot-scope="scope">
            <el-tag :type="enumFormatter.enumColorFormatter(enums.userStatuses,scope.row.userStatus)">{{ enumFormatter.enumTitleFormatter(enums.userStatuses,scope.row.userStatus) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" :formatter="enumFormatter.timeFormatter" />
      </el-table>
      <el-row type="flex" justify="center" align="middle">
        <el-button size="mini" class="filter-item" @click="userDialogClose">取 消</el-button>
        <el-button size="mini" type="primary" class="filter-item" @click="bindUser">提 交</el-button>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { page, insert, update, remove, bindMenu, bindUser } from '@/api/role'
import { getAllMenu } from '@/api/menu'
import { getAllUser } from '@/api/user'

export default {
  name: 'Role',
  data() {
    return {
      roles: [],
      query: {
        condition: {
          roleName: null
        },
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      menuDialogVisible: false,
      menus: [],
      roleMenu: {
        roleId: null,
        menuIds: []
      },
      userDialogVisible: false,
      users: [],
      roleUser: {
        roleId: null,
        userIds: []
      },
      loading: false
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  created() {
    this.page()
  },
  updated() {
    this.users.forEach(user => {
      this.$refs.boundUserTable.toggleRowSelection(user, user.bound)
    })
  },
  methods: {
    handlePageNumChange(pageNum) {
      this.page(pageNum)
    },
    handlePageSizeChange(pageSize) {
      this.query.pageSize = pageSize
      this.page()
    },
    page(pageNum = 1) {
      this.query.pageNum = pageNum
      this.loading = true
      page(this.query).then(response => {
        const pageInfo = response.data || {}
        this.roles = pageInfo.list || []
        this.total = pageInfo.total || 0
      }).finally(() => {
        this.loading = false
      })
    },
    add() {
      this.$prompt('请输入角色名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        insert({ roleName: value }).then(response => {
          this.commonFunction.showMsg(response)
          this.page()
        })
      }).catch(() => {
      })
    },
    edit(row) {
      this.$prompt(row.roleName + '=>请输入角色名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        update({ roleId: row.roleId, roleName: value }).then(response => {
          this.commonFunction.showMsg(response)
          this.page(this.query.pageNum)
        })
      }).catch(() => {
      })
    },
    remove(row) {
      this.$confirm(row.roleName + '=>此操作将删除此角色', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        remove({ idList: row.roleId }).then(response => {
          this.commonFunction.showMsg(response)
          this.page(this.query.pageNum)
        })
      }).catch(() => {
      })
    },
    getSelectedMenuIds: function(menus) {
      const selectedMenuIds = menus.filter(menu => menu.selected).map(menu => menu.menuId)
      menus.forEach(menu => {
        if (menu.children) {
          selectedMenuIds.push.apply(selectedMenuIds, this.getSelectedMenuIds(menu.children))
        }
      })
      return selectedMenuIds
    },
    menuDialogShow(row) {
      this.menuDialogVisible = true
      getAllMenu(row.roleId).then(response => {
        this.menus = response.data || []
        this.roleMenu = { roleId: row.roleId, menuIds: this.getSelectedMenuIds(this.menus) }
      })
    },
    menuDialogClose() {
      this.menuDialogVisible = false
      this.roleMenu = {}
      this.menus = []
    },
    bindMenu() {
      const selectedMenus = this.$refs.menus.getCheckedNodes()
      this.roleMenu.menuIds = selectedMenus.map(menu => menu.menuId)
      bindMenu(this.roleMenu).then(response => {
        this.commonFunction.showMsg(response)
        this.menuDialogClose()
        this.page(this.query.pageNum)
      })
    },
    userDialogShow(row) {
      this.userDialogVisible = true
      getAllUser(row.roleId, null).then(response => {
        this.users = response.data || []
        this.roleUser = { roleId: row.roleId, userIds: this.users.filter(user => user.bound).map(user => user.userId) }
      })
    },
    userDialogClose() {
      this.userDialogVisible = false
      this.roleUser = {}
      this.users = []
    },
    handleUserSelectionChange(selections) {
      this.roleUser.userIds = selections.map(selection => selection.userId)
    },
    bindUser() {
      bindUser(this.roleUser).then(response => {
        this.commonFunction.showMsg(response)
        this.userDialogClose()
        this.page(this.query.pageNum)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-row {
    .el-input {
      width: 200px;
    }
  }

  .el-form-item {
    .el-input {
      width: 300px;
    }

    .el-select {
      width: 300px;
    }
  }

  .el-dialog {
    .el-row {
      margin-top: 16px;
    }
  }
</style>
