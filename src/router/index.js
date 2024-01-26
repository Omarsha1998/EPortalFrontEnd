import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import helperMethods from "../helperMethods.js";
import Store from "../store/index.js"
import { Cookies } from 'quasar';

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
        redirect: '/home',
        component: () => import('layouts/MainLayout.vue'),
        children: [
          {
            path: '/home',
            name: '/Home',
            meta: {
              title: "Home",
              requiresAuth: true,
            },
            component: () => import('src/pages/Home.vue')
          },
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
          {
            path: '/Leave',
            meta: {
              title: "My Leaves",
              requiresAuth: true,
            },
            children: [{ path: '', component: () => import('src/pages/LeaveDetails.vue') }],
          },
          {
            path: '/LeaveOperation',
            meta: {
              title: "Leave Approval",
              requiresAuth: true,
            },
            children: [{ path: '', component: () => import('src/pages/LeaveOperation.vue') }],
          },
          {
            path: '/MyDTR',
            meta: {
              title: "MY DTR",
              requiresAuth: true,
            },
            children: [{ path: '', component: () => import('src/pages/DTRPage.vue') }],
          }
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


    if (helperMethods.getCookie('token') !== undefined && Store.getters['user_module/has_all_values'] === false) {
      let token = helperMethods.getCookie('token');
      await Store.dispatch('user_module/setNewValues', token);
    }

    if (to.matched.some(record => record.meta.requiresAuth) === true) {

      // #region isNotAuthenticated
      if (Store.getters['user_module/has_all_values'] === false) {
        return next('/account/login');
      }
      // #endregion

      // #region Validation_IsNotLicensed
      if (Store.getters['user_module/is_license'] === false
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
      if (Store.getters['user_module/is_license'] === true) {

        if (Store.getters['licenses_module/licenses'] === null) {
          await Store.dispatch('licenses_module/get', Store.getters['user_module/employee_id']);
        }

        for (var index = 0; index < Store.getters['licenses_module/licenses'].length; ++index) {

          let totalDays = helperMethods.daysBetweenTwoDates(Store.getters['licenses_module/licenses'][index].expiration_date, helperMethods.getDateToday());
          if (totalDays <= process.env.START_NOTIF_DAYS
            &&
            tofullPathLowerCase.includes("update-license-expiration-date") === false
            &&
            (helperMethods.getCookie("not_exposed_notification_index") === undefined)
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

      // #region Validation_IsNotHREmployee
      if (Store.getters['user_module/is_pis_approver'] === false
        &&
        (tofullPathLowerCase.includes("/other-request") === true ||
          tofullPathLowerCase.includes("/attachment-archive") === true
        )
      ) {
        return next('/my-request');
      }
      // #endregion

          // #region Validation_IsNotApproverEmployee
        if (Store.getters['user_module/is_leave_approver'] === false
          &&
          (tofullPathLowerCase.includes("leaveoperation") === true)
        ) {
          return next('/home');
        }
        // #endregion


      // #region Validation_IsUserDontHavePreviousWorkExperiences
      if (Store.getters['user_module/has_work_experience'] === false
        &&
        tofullPathLowerCase.includes("/work-experience") === true
      ) {
        return next('/');
      }
      // #endregion

      return next();
    } else {
      // #region Validation_IsAuthenticated
      if (Store.getters['user_module/has_all_values'] === true && tofullPathLowerCase.includes("/account/login") === true) {
        return next(from);
      }
      // #endregion
      return next();
    }
  });

  return Router
})
