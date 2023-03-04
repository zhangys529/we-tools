<template>
  <div v-if="user.userType===999" class="app-container">
    <el-row class="head-container">
      <el-button :loading="loading" size="mini" type="primary" icon="el-icon-refresh" class="filter-item" @click="getAllMenu">搜索</el-button>
      <el-button :loading="loading" size="mini" type="success" icon="el-icon-plus" class="filter-item" @click="menuDialogShow(0,null)">添加一级菜单</el-button>
    </el-row>

    <el-table v-loading="loading" :data="menus" row-key="menuId" :tree-props="{children:'children'}" default-expand-all border :header-cell-style="{background: 'aliceblue'}">
      <el-table-column fixed prop="icon" label="菜单" width="180">
        <template slot-scope="scope">
          <span :class="scope.row.icon" style="margin-right: 10px"></span>
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="menuId" label="菜单id" width="180" />
      <el-table-column prop="pid" label="上级id" width="180" />
      <el-table-column prop="name" label="组件名称" />
      <el-table-column prop="path" label="路径" />
      <el-table-column prop="sort" label="排序" width="70" />
      <el-table-column prop="cache" label="缓存" width="80">
        <template slot-scope="scope">
          <el-tag :type="enumFormatter.enumColorFormatter(enums.cacheEnums,scope.row.cache)">{{ enumFormatter.enumTitleFormatter(enums.cacheEnums,scope.row.cache) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="hidden" label="隐藏" width="80">
        <template slot-scope="scope">
          <el-tag :type="enumFormatter.enumColorFormatter(enums.hiddenEnums,scope.row.hidden)">{{ enumFormatter.enumTitleFormatter(enums.hiddenEnums,scope.row.hidden) }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="260">
        <template slot-scope="scope">
          <el-button size="mini" @click="menuDialogShow(null,scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="remove(scope.row)">删除</el-button>
          <el-button size="mini" type="primary" @click="menuDialogShow(scope.row.menuId)">添加子菜单</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="(editMenu.menuId?'修改':'添加')+'菜单'" :close-on-click-modal="false" :visible.sync="menuDialogVisible" :before-close="menuDialogClose">
      <el-form ref="menuForm" :model="editMenu" :rules="rules" label-position="right" label-width="100px">
        <el-form-item v-if="editMenu.menuId" label="菜单id" prop="menuId">
          <el-input v-model="editMenu.menuId" disabled />
        </el-form-item>
        <el-form-item label="上级id" prop="pid">
          <el-input v-model="editMenu.pid" disabled />
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <el-select v-model="editMenu.icon" filterable placeholder="请选择">
            <template slot="prefix">
              <span :class="editMenu.icon" style="margin-right: 10px"></span>
            </template>
            <el-option v-for="icon in elIcons" :key="icon" :value="icon" :label="icon">
              <span :class="icon" style="margin-right: 10px"></span>
              <span>{{ icon }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="editMenu.title" />
        </el-form-item>
        <el-form-item label="组件名称" prop="name">
          <el-input v-model="editMenu.name" />
        </el-form-item>
        <el-form-item label="路径" prop="path">
          <el-input v-model="editMenu.path" />
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="editMenu.sort" type="number" />
        </el-form-item>
        <el-form-item label="缓存" prop="cache">
          <el-select v-model="editMenu.cache" placeholder="请选择">
            <el-option v-for="item in enums.cacheEnums" :key="item.key" :value="item.key" :label="item.title" />
          </el-select>
        </el-form-item>
        <el-form-item label="隐藏" prop="hidden">
          <el-select v-model="editMenu.hidden" placeholder="请选择">
            <el-option v-for="item in enums.hiddenEnums" :key="item.key" :value="item.key" :label="item.title" />
          </el-select>
        </el-form-item>
        <el-row type="flex" justify="center" align="middle">
          <el-button @click="menuDialogClose">取 消</el-button>
          <el-button :loading="loading" type="primary" @click="submit">提 交</el-button>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getAllMenu, insert, update, remove } from '@/api/menu'

export default {
  name: 'Menu',
  data() {
    return {
      menus: [],
      menuDialogVisible: false,
      editMenu: {},
      rules: {
        icon: [
          { required: true, message: '请选择图标', trigger: 'change' }
        ],
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入组件名称', trigger: 'blur' }
        ],
        path: [
          { required: true, message: '请输入路径', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '请设置排序', trigger: 'blur' }
        ],
        cache: [
          { required: true, message: '请选择页面是否缓存', trigger: 'change' }
        ],
        hidden: [
          { required: true, message: '请选择页面是否隐藏', trigger: 'change' }
        ]
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
    this.getAllMenu()
  },
  methods: {
    getAllMenu() {
      this.loading = true
      getAllMenu().then(response => {
        this.menus = response.data || []
      }).finally(() => {
        this.loading = false
      })
    },
    menuDialogShow(pid, row) {
      this.menuDialogVisible = true
      if (row) {
        this.editMenu = JSON.parse(JSON.stringify(row))
      } else {
        this.editMenu = { pid }
      }
    },
    menuDialogClose() {
      this.$refs.menuForm.resetFields()
      this.menuDialogVisible = false
      this.editMenu = {}
    },
    submit() {
      this.$refs.menuForm.validate((valid) => {
        if (valid) {
          if (this.editMenu.menuId) {
            update(this.editMenu).then(response => {
              this.commonFunction.showMsg(response)
              if (response.code === 200) {
                this.menuDialogClose()
                this.getAllMenu()
              }
            })
          } else {
            insert(this.editMenu).then(response => {
              this.commonFunction.showMsg(response)
              if (response.code === 200) {
                this.menuDialogClose()
                this.getAllMenu()
              }
            })
          }
        } else {
          return false
        }
      })
    },
    remove(row) {
      this.$confirm(row.title + '=>此操作将删除此菜单', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        remove({ idList: row.menuId }).then(response => {
          this.commonFunction.showMsg(response)
          this.getAllMenu()
        })
      }).catch(() => {
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
