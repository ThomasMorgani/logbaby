
const routes = [
  {
    path: '/',
    component: () => import('layouts/Main-layout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/timer',
    component: () => import('layouts/Main-layout.vue'),
    children: [
      { path: '', component: () => import('pages/Timer.vue') }
    ]
  },
  {
    path: '/logs',
    component: () => import('layouts/Main-layout.vue'),
    children: [
      { path: '', component: () => import('pages/Logs.vue') }
    ]
  },
  {
    path: '/reports',
    component: () => import('layouts/Main-layout.vue'),
    children: [
      { path: '', component: () => import('pages/Reports.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
