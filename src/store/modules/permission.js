import { loadMenus } from '@/api/menu'
import { componentFormatter } from '@/api/enumFormatter'
import Layout from '@/layout/index'

function buildRoutes(menus, view = '') {
  return menus.map(menu => {
    if (menu.pid === '0' && !menu.children) {
      // 根路由且没有子路由
      return buildSingleRootRoute(menu)
    }
    let route = {}
    if (menu.pid === '0') {
      // 有子路由的根路由
      route = buildRootRoute(menu)
    } else {
      // 子路由
      route = buildChildrenRoute(menu, view)
    }
    if (menu.children) {
      route.children = buildRoutes(menu.children, view + menu.path)
    }
    return route
  })
}

function buildSingleRootRoute(menu) {
  return {
    path: menu.path,
    component: Layout,
    redirect: menu.path,
    hidden: menu.hidden === 1,
    children: [{
      path: menu.path,
      name: menu.name,
      component: componentFormatter(menu.path),
      meta: { title: menu.title, icon: menu.icon, noCache: menu.cache === 0 }
    }]
  }
}

function buildRootRoute(menu) {
  return {
    path: menu.path,
    name: menu.name,
    component: Layout,
    redirect: menu.path,
    hidden: menu.hidden === 1,
    meta: { title: menu.title, icon: menu.icon, noCache: menu.cache === 0 }
  }
}

function buildChildrenRoute(menu, view) {
  return {
    path: view + menu.path,
    name: menu.name,
    hidden: menu.hidden === 1,
    component: componentFormatter(view + menu.path),
    meta: { title: menu.title, icon: menu.icon, noCache: menu.cache === 0 }
  }
}

const state = {
  routes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.routes = routes
  }
}

const actions = {
  loadRoutes({ commit, state }) {
    return new Promise((resolve, reject) => {
      // loadMenus().then(response => {
      //   const { data } = response
      //   const routes = data ? buildRoutes(data) : []
      const routes = []
      routes.push({ path: '*', redirect: '/404', hidden: true })
      commit('SET_ROUTES', routes)
      resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
