export const routes = [
  {
    name: "Login",
    path: "/login",
    component: () => import("@/layouts/LayoutLogin.vue"),
  },
  {
    name: "Basic",
    path: "/",
    component: () => import("@/layouts/LayoutBasic.vue"),
    children: [
      {
        name: "FuneralsRead",
        path: "read",
        component: () => import("@/views/AppFunRead.vue"),
      },
      {
        name: "FuneralsStatistic",
        path: "statistic",
        component: () => import("@/views/AppFunStatistic.vue"),
      },
      {
        name: "FuneralsAdd",
        path: "",
        component: () => import("@/views/AppFunAdd.vue"),
      },
      {
        name: "FuneralsAllocation",
        path: "allocation",
        component: () => import("@/views/AppFunAllocation.vue"),
      },
      {
        name: "FuneralsPhone",
        path: "phone",
        component: () => import("@/views/AppFunPhone.vue"),
      },
      {
        name: "FuneralsSettings",
        path: "settings",
        component: () => import("@/views/AppFunSettings.vue"),
        children: [
          {
            name: "SettingsTempls",
            path: "templs",
            component: () => import("@/views/AppSettingsTempls.vue"),
          },
          {
            name: "SettingsCemeterys",
            path: "cemeterys",
            component: () => import("@/views/AppSettingsCemeterys.vue"),
          },
          {
            name: "SettingsServices",
            path: "services",
            component: () => import("@/views/AppSettingsServices.vue"),
          },
        ],
      },
      {
        name: "FuneralsEdit",
        path: "edit/:id",
        component: () => import("@/views/AppFunEdit.vue"),
      },
    ],
  },
  {
    name: "Print",
    path: "/export",
    component: () => import("@/layouts/LayoutPrint.vue"),
  },
  {
    name: "Email",
    path: "/mail",
    component: () => import("@/layouts/LayoutEmail.vue"),
  },
];
