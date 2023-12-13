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
        redirect: '/other-request',
        component: () => import('layouts/MainLayout.vue'),
        children: [
          {
            path: '/other-request',
            name: '/OtherRequest',
            meta: {
              title: "Other Request",
              requiresAuth: true,
            },
            component: () => import('src/pages/OtherRequest.vue')
          },
          {
            path: '/my-request',
            name: '/MyRequest',
            meta: {
              title: "My Request",
              requiresAuth: true,
            },
            component: () => import('src/pages/MyRequest.vue')
          },
          {
            path: '/personal-information',
            name: 'PersonalInformation',
            meta: {
              title: "Personal Information",
              requiresAuth: true,
            },
            component: () => import('src/pages/PersonalInformation.vue')
          },
          {
            path: '/family-background',
            name: 'FamilyBackground',
            meta: {
              title: "Family Background",
              requiresAuth: true,
            },
            component: () => import('src/pages/FamilyBackground.vue')
          },
          {
            path: '/educational-background',
            name: 'EducationalBackground',
            meta: {
              title: "Educational Background",
              requiresAuth: true,
            },
            component: () => import('src/pages/EducationalBackground.vue')
          },
          {
            path: '/training-or-seminar',
            name: 'TrainingOrSeminar',
            meta: {
              title: "Training/Seminar",
              requiresAuth: true,
            },
            component: () => import('src/pages/TrainingOrSeminar.vue')
          },
          {
            path: '/work-experience',
            name: 'WorkExperience',
            meta: {
              title: "Work Experience",
              requiresAuth: true,
            },
            component: () => import('src/pages/WorkExperience.vue')
          },
          {
            path: '/attachment-archive',
            name: 'AttachmentArchive',
            meta: {
              title: "Attachment Archive",
              requiresAuth: true,
            },
            component: () => import('src/pages/AttachmentArchive.vue')
          },
          {
            path: '/license',
            name: 'License',
            meta: {
              title: "License",
              requiresAuth: true,
            },
            component: () => import('src/pages/License.vue')
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
          tofullPathLowerCase.includes("/license") === true ||
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
        (tofullPathLowerCase.includes("/other-request") === true ||
        tofullPathLowerCase.includes("/attachment-archive") === true
        )
      ) {
        return next('/my-request');
      }
      // #endregion

      // #region Validation_IsUserDontHavePreviousWorkExperiences
      if (Store.state.users.user.work_experiences.length === 0
        &&
        tofullPathLowerCase.includes("/work-experience") === true
      ) {
        return next('/');
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
