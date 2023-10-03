<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>{{
          $q.screen.lt.sm ? "UERM PIS" : app_name
        }}</q-toolbar-title>
        <div>
          v {{ app_version }}
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
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
                <img src="../assets/images/uerm-hospital-logo.png" alt="uerm-hospital-logo" />
              </q-avatar>
            </div>
          </div>
        </div>

        <q-card-section style="margin: 37px 0">
          <q-avatar size="90px" class="absolute-center">
            <img
              :src="
                'http://10.107.11.169/getpic/?i=' +
                $store.state.users.user.personal_informations.employee_id
              "
              alt="avatar"
            />
          </q-avatar>
        </q-card-section>

        <q-item-label header class="text-center">
          Name : {{ $store.state.users.user.personal_informations.name }}
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />

        <q-item @click="onLogout()" href="/personal-informations">
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
import { defineComponent, ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { mapActions } from "vuex";
import helperMethods from "../helperMethods.js";

export default defineComponent({
  name: "MainLayout",
  components: {
    EssentialLink,
  },
  setup: function () {
    const leftDrawerOpen = ref(false);
    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  data: function () {
    return {
      app_name: process.env.APP_NAME,
      app_version: process.env.APP_VERSION,
      essentialLinks: this.getLinkLists(),
    };
  },
  created: function () {
    // User is not HR Employee
    if (
      this.$store.state.users.user.personal_informations.department_id !==
      process.env.HR_DEPARTMENT_ID
    ) {
      this.removeTab("Other Requests");
    }
    // User is not license
    if (this.$store.state.users.user.licenses.length === 0) {
      this.removeTab("Licenses");
    }
  },
  methods: {
    ...mapActions(["logout"]),
    onLogout: function () {
      this.logout();
    },
    refreshPage: function () {
      helperMethods.refreshPage();
    },
    getLinkLists: function () {
      let linksList = [
        {
          title: "Other Requests",
          icon: "mail",
          link: "/other-requests",
        },
        {
          title: "My Requests",
          icon: "message",
          link: "/my-requests",
        },

        {
          title: "Personal Informations",
          icon: "info",
          link: "/personal-informations",
        },
        {
          title: "Family Backgrounds",
          icon: "people",
          link: "/family-backgrounds",
        },
        {
          title: "Educational Backgrounds",
          icon: "school",
          link: "/educational-backgrounds",
        },
        {
          title: "Work Experiences",
          icon: "work",
          link: "/work-experiences",
        },
        {
          title: "Licenses",
          icon: "newspaper",
          link: "/licenses",
        },
      ];
      return linksList;
    },
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
