import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import helperMethods from "../helperMethods.js";
import Store from "../store/index.js"

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
    routes: [
      {
        path: '/',
        redirect: '/other-requests',
        component: () => import('layouts/MainLayout.vue'),
        children: [
          {
            path: '/other-requests',
            name: '/OtherRequests',
            meta: {
              title: "Other Requests",
              requiresAuth: true,
            },
            component: () => import('src/pages/OtherRequests.vue')
          },
          {
            path: '/my-requests',
            name: '/MyRequests',
            meta: {
              title: "My Requests",
              requiresAuth: true,
            },
            component: () => import('src/pages/MyRequests.vue')
          },
          {
            path: '/personal-informations',
            name: 'PersonalInformations',
            meta: {
              title: "Personal Informations",
              requiresAuth: true,
            },
            component: () => import('src/pages/PersonalInformations.vue')
          },
          {
            path: '/family-backgrounds',
            name: 'FamilyBackgrounds',
            meta: {
              title: "Family Backgrounds",
              requiresAuth: true,
            },
            component: () => import('src/pages/FamilyBackgrounds.vue')
          },
          {
            path: '/educational-backgrounds',
            name: 'EducationalBackgrounds',
            meta: {
              title: "Educational Backgrounds",
              requiresAuth: true,
            },
            component: () => import('src/pages/EducationalBackgrounds.vue')
          },
          {
            path: '/work-experiences',
            name: 'WorkExperiences',
            meta: {
              title: "Work Experiences",
              requiresAuth: true,
            },
            component: () => import('src/pages/WorkExperiences.vue')
          },
          {
            path: '/licenses',
            name: 'Licenses',
            meta: {
              title: "Licenses",
              requiresAuth: true,
            },
            component: () => import('src/pages/Licenses.vue')
          },
        ]
      },
      {
        path: '/account/login',
        name: 'Login',
        meta: {
          title: "Login"
        },
        component: () => import('pages/Login.vue')
      },
      {
        path: '/update-license-expiration-date',
        name: 'UpdateLicenseExpirationDate',
        meta: {
          title: "Update License Expiration Date",
          requiresAuth: true
        },
        component: () => import('pages/UpdateLicenseExpirationDate.vue')
      },
      {
        // path: '/:catchAll(.*)*',
        path: '/:pathMatch(.*)*',
        name: 'PageNotFound',
        meta: {
          title: "Page Not Found"
        },
        component: () => import('src/pages/PageNotFound.vue')
      },
    ]
  })

  Router.beforeEach(async (to, from, next) => {
    helperMethods.setPageTitle(to.meta.title + " - " + process.env.APP_NAME);
    let tofullPathLowerCase = to.fullPath.toLowerCase();
    // #region Validation_UserToken
    if (Store.state.users.token === null) {
      // actions
      await Store.dispatch('getToken');
    }
    if (Store.state.users.user === null && Store.state.users.token !== null) {
      // actions
      await Store.dispatch('getUser');
    }
    // #endregion
    if (to.matched.some(record => record.meta.requiresAuth) === true) {

      isNotAuthenticated(next);

      // #region Validation_IsNotLicensed
      if (Store.state.users.user.licenses.length === 0
        &&
        (
          tofullPathLowerCase.includes("/licenses") === true ||
          tofullPathLowerCase.includes("/update-license-expiration-date") === true
        )
      ) {
        return next('/');
      }
      // #endregion

      // #region Validation_IsLicensed
      if (Store.state.users.user.licenses.length > 0) {
        for (var index = 0; index < Store.state.users.user.licenses.length; ++index) {

          let totalDays = helperMethods.daysBetweenTwoDates(Store.state.users.user.licenses[index].expiration_date, helperMethods.getDateToday());
          if (totalDays <= process.env.START_NOTIF_DAYS
            &&
            tofullPathLowerCase.includes("update-license-expiration-date") === false
            &&
            helperMethods.getCookie("not_exposed_notification_index") === undefined
          ) {

            if (helperMethods.getCookie("exposed_license_indexes") === undefined) {
              helperMethods.createCookie("not_exposed_notification_index", index.toString());
            } else {
              let array = helperMethods.getCookie("exposed_license_indexes").split(" ");
              if (array.includes(index.toString()) === false) {
                helperMethods.createCookie("not_exposed_notification_index", index.toString());
              }
            }

          }

        };
      }
      // #endregion

      if (helperMethods.getCookie("not_exposed_notification_index") !== undefined
        &&
        tofullPathLowerCase.includes("update-license-expiration-date") === false
      ) {
        return next('/update-license-expiration-date');
      }

      if (helperMethods.getCookie("not_exposed_notification_index") === undefined
        &&
        tofullPathLowerCase.includes("update-license-expiration-date") === true
      ) {
        return next(from);
      }


      isNotAuthenticated(next);


      // #region Validation_IsNotHREmployee
      if (Store.state.users.user.personal_informations.department_id !== process.env.HR_DEPARTMENT_ID
        &&
        tofullPathLowerCase.includes("/other-requests") === true
      ) {
        return next('/my-requests');
      }
      // #endregion

      return next();
    } else {
      // #region Validation_IsAuthenticated
      if (Store.getters.authenticated === true && tofullPathLowerCase.includes("/account/login") === true) {
        return next(from);
      }
      // #endregion
      return next();
    }
  });

  function isNotAuthenticated(next) {
    if (Store.getters.authenticated === false) {
      return next('/account/login');
    }
  }

  return Router
})
