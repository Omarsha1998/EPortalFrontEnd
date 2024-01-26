<template>
  <q-layout view="lHh Lpr lFf" v-if="hasAllValues === true">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="ontoggleLeftDrawer()"
        />
        <q-toolbar-title @click="redirect()" style="cursor: pointer">
          {{  app_name }}
        </q-toolbar-title>

        <div>v {{ app_version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" 
      show-if-above bordered
    >
      <q-list>
        <div class="example-row-equal-width">
          <div class="row">
            <div class="col bg-grey-2">
              <q-avatar size="90px" class="center">
                <img src="../assets/images/uerm-logo.png" alt="uerm-logo" />
              </q-avatar>
            </div>
            <div class="col bg-grey-2">
              <q-avatar size="90px" style="border-radius: 0" class="center">
                <img
                  src="../assets/images/uerm-hospital-logo.png"
                  alt="uerm-hospital-logo"
                />
              </q-avatar>
            </div>
          </div>
        </div>
        <br />

        <q-card-section style="margin: 60px 0">
          <q-avatar size="160px" class="absolute-center">
            <img
              :src="image_rest_api + employeeID"
              alt="avatar"
            />
          </q-avatar>
        </q-card-section>

        <q-item-label header class="text-center">
          <span> {{ employeeID }}</span>
          <br />
          <span style="font-weight: bold"> {{ employeeFullName }} </span>
        </q-item-label>

        <q-expansion-item
          class="custom-expansion-item"
          icon="settings"
          label="Personnel Information System"
        >
          <q-card>
            <q-card-section>
              <EssentialLink
                v-for="link in essentialLinks"
                :key="link.title"
                v-bind="link"
              />
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-expansion-item
          class="custom-expansion-item"
          icon="event_busy"
          label="Leave Management System"
        >
          <q-card>
            <q-card-section>
              <EssentialLink
                v-for="link in filteredChildren"
                :key="link.title"
                v-bind="link"
              />
            </q-card-section>
          </q-card>
        </q-expansion-item>


        <q-expansion-item
          class="custom-expansion-item"
          icon="schedule"
          label="DTR Management"
        >
          <q-card>
            <q-card-section>
              <EssentialLink
                v-for="link in DTRLinks"
                :key="link.title"
                v-bind="link"
              />
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-item clickable @click="onLogout()">
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Logout</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import helperMethods from "../helperMethods.js";

export default defineComponent({
  name: "MainLayout",
  components: {
    EssentialLink,
  },
  computed: {
    hasAllValues() {
      return this.$store.getters["user_module/has_all_values"];
    },
    employeeID() {
      return this.$store.getters["user_module/employee_id"];
    },
    employeeFullName() {
      return this.$store.getters["user_module/employee_full_name"];
    },
    isHR() {
      return this.$store.getters["user_module/is_hr"];
    },
    isPISApprover() {
      return this.$store.getters["user_module/is_pis_approver"];
    },
    isLicense() {
      return this.$store.getters["user_module/is_license"];
    },
    hasWorkExperience() {
      return this.$store.getters["user_module/has_work_experience"];
    },
    mainLinks() {
      return this.$store.getters["helpers/mainLinks"];
    },
    DTRLinks() {
      const dtrLinks = this.$store.getters["helpers/DTRLinks"];
      return dtrLinks.length > 0 ? dtrLinks[0].children : [];
    },
    filteredChildren() {
      if (this.isLeaveApprover) {
        return this.mainLinks[0].children;
      } else {
        return this.mainLinks[0].children.filter(child => child.title !== 'Leave Approval');
      }
    },
    isLeaveApprover() {
      return this.$store.getters["user_module/is_leave_approver"];
    },
  },
  data: function () {
    return {
      app_name: process.env.APP_NAME,
      app_version: process.env.APP_VERSION,
      image_rest_api: process.env.IMAGE_REST_API_URL,
      essentialLinks: this.getLinkLists(),
      leftDrawerOpen: false,
    };
  },
  created: function () {
    // User is not PIS Approver
    if (this.isPISApprover === false) {
      this.removeTab("Other Request");
      this.removeTab("Attachment Archive");
    }

    // User is not license
    if (this.isLicense === false) {
      this.removeTab("License");
    }

    // Check if there is no previous work experiences
    if (this.hasWorkExperience === false) {
      this.removeTab("Work Experience");
    }
  },
  methods: {
    redirect: function () {
      helperMethods.redirect("/");
    },
    ontoggleLeftDrawer: function () {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
    onLogout: async function () {
      await this.$store.dispatch("user_module/logout", this.employeeID);
      helperMethods.refreshPage();
    },
    getLinkLists: function () {
      let linksList = [
        {
          title: "Other Request",
          icon: "mail",
          link: "/other-request",
        },
        {
          title: "My Request",
          icon: "message",
          link: "/my-request",
        },

        {
          title: "Personal Information",
          icon: "info",
          link: "/personal-information",
        },
        {
          title: "Family Background",
          icon: "people",
          link: "/family-background",
        },
        {
          title: "Educational Background",
          icon: "school",
          link: "/educational-background",
        },
        {
          title: "Work Experience",
          icon: "work",
          link: "/work-experience",
        },
        {
          title: "License",
          icon: "newspaper",
          link: "/license",
        },
        {
          title: "Training/Seminar",
          icon: "event",
          link: "/training-or-seminar",
        },
        {
          title: "Attachment Archive",
          icon: "upload",
          link: "/attachment-archive",
        },
      ];
      return linksList;
    },

    // DTRLinks: function () {
    //   let DTRList = [
    //     {
    //       title: "Daily Time Record",
    //       icon: "mail",
    //       link: "/other-request",
    //     },
    //     {
    //       title: "Time Adjustment",
    //       icon: "upload",
    //       link: "/attachment-archive",
    //     },
    //   ];
    //   return DTRList;
    // },
    removeTab: function (title) {
      const itemToBeRemoved = { title: title };
      let index = this.essentialLinks.findIndex(
        (x) => x.title === itemToBeRemoved.title
      );
      this.essentialLinks.splice(index, 1);
    },
  },
});
</script>
