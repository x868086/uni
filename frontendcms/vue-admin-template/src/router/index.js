import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

/* Layout */
import Layout from '@/layout';

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  // {
  //   path: '/login',
  //   component: () => import('@/views/login/index'),
  //   hidden: true
  // },

  // {
  //   path: '/404',
  //   component: () => import('@/views/404'),
  //   hidden: true
  // },

  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   children: [{
  //     path: 'dashboard',
  //     name: 'Dashboard',
  //     component: () => import('@/views/dashboard/index'),
  //     meta: { title: 'Dashboard', icon: 'dashboard' }
  //   }]
  // },

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // }

  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true,
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '工作台', icon: 'dashboard' },
      },
    ],
  },

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: '示例', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: '表格', icon: 'table' },
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: '树', icon: 'tree' },
  //     },
  //   ],
  // },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: '表单', icon: 'form' },
  //     },
  //   ],
  // },
];

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     roles: ['DepartmentSupervisor'],
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' },
  //     },
  //   ],
  // },

  {
    path: '/market',
    component: Layout,
    redirect: '/market/classic',
    name: 'market',
    meta: {
      roles: [
        'DepartmentSupervisor',
        'StoreSupervisor',
        'StoreManager',
        'DirectSeller',
      ],
      title: '市场运营',
      icon: 'el-icon-shopping-bag-2',
    },
    children: [
      {
        path: 'classic',
        component: () => import('@/views/market/classic/index'), // Parent router-view
        name: 'classic',
        meta: {
          roles: [
            'DepartmentSupervisor',
            'StoreSupervisor',
            'StoreManager',
            'DirectSeller',
          ],
          title: '存量经营',
        },
        children: [
          {
            path: 'threshold-config',
            component: () => import('@/views/market/classic/threshold-config'),
            name: 'threshold-config',
            meta: { roles: ['DepartmentSupervisor'], title: '阈值配置' },
          },
          {
            path: 'threshold-list',
            component: () => import('@/views/market/classic/threshold-list'),
            name: 'threshold-list',
            meta: { roles: ['DepartmentSupervisor'], title: '阈值列表' },
          },
          {
            path: 'threshold-bingo',
            component: () => import('@/views/market/classic/threshold-bingo'),
            name: 'threshold-bingo',
            meta: {
              roles: [
                'DepartmentSupervisor',
                'StoreSupervisor',
                'StoreManager',
                'DirectSeller',
              ],
              title: '档级查询',
            },
          },
        ],
      },
      {
        path: 'b2i2c',
        component: () => import('@/views/market/b2i2c/index'),
        name: 'b2i2c',
        meta: {
          roles: ['DepartmentSupervisor', 'DirectSeller'],
          title: 'B2I2C运营',
        },
        alwaysShow: true,
        children: [
          {
            path: 'serial-reset',
            component: () => import('@/views/market/b2i2c/serial-reset'),
            name: 'serial-reset',
            meta: { roles: ['DepartmentSupervisor'], title: '号码回收调度' },
          },
          {
            path: 'serial-modify',
            component: () => import('@/views/market/b2i2c/serial-modify'),
            name: 'serial-modify',
            meta: { roles: ['DirectSeller'], title: '号码释放申请' },
          },
        ],
      },

      // {
      //   path: 'middleplatform',
      //   component: () => import('@/views/market/middleplatform'),
      //   name: 'middleplatform',
      //   meta: {
      //     roles: ['DepartmentSupervisor', 'StoreManager'],
      //     title: '中台运营'
      //   },
      //   alwaysShow: true,
      //   children: [
      //     {
      //       path: 'special-serial',
      //       component: () => import('@/views/market/middleplatform/special-serial'),
      //       name: 'special-serial',
      //       meta: { roles: ['DepartmentSupervisor', 'StoreManager'], title: '靓号协议' }
      //     }
      //   ]
      // }
    ],
  },
  {
    path: '/middleplatform',
    component: Layout,
    redirect: '/middleplatform/special-serial',
    name: 'middleplatform',
    alwaysShow: true,
    meta: {
      roles: ['DepartmentSupervisor', 'StoreManager'],
      title: '中台运营',
      icon: 'el-icon-monitor',
    },
    children: [
      {
        path: 'special-serial',
        component: () => import('@/views/middleplatform/special-serial'),
        name: 'special-serial',
        meta: {
          roles: ['DepartmentSupervisor', 'StoreManager'],
          title: '靓号协议',
        },
      },
    ],
  },

  {
    path: '/upload',
    component: Layout,
    redirect: '/upload/upload-file',
    name: 'upload',
    alwaysShow: true,
    meta: {
      roles: ['DepartmentSupervisor'],
      title: '上传导入',
      icon: 'el-icon-upload',
    },
    children: [
      {
        path: 'upload-file',
        component: () => import('@/views/upload/upload-file'),
        name: 'upload-file',
        meta: { roles: ['DepartmentSupervisor'], title: '文件上传' },
      },
    ],
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
