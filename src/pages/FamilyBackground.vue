<template>
  <q-pull-to-refresh @refresh="this.refresh()">
    <q-item-section avatar class="items-center" style="margin: 0 10px">
      <h4 class="text-center">
        <q-icon name="people" />
        Family Background
      </h4>
    </q-item-section>

    <div class="q-pa-md" v-if="formIsvisible === true">
      <div class="q-gutter-y-md">
        <h5
          class="text-center"
          v-if="
            familyBackgrounds.parents.mother.full_name === '' &&
            familyBackgrounds.parents.father.full_name === ''
          "
        >
          No Records found
        </h5>

        <div
          v-if="
            familyBackgrounds.parents.mother.full_name !== '' &&
            familyBackgrounds.parents.father.full_name !== ''
          "
        >
          <q-expansion-item expand-separator icon="" label="PARENTS" caption="">
            <q-card
              v-if="
                familyBackgrounds.parents.mother.full_name !== '' &&
                familyBackgrounds.parents.father.full_name !== ''
              "
            >
              <q-card-section>
                <q-tabs
                  v-model="this.tabs.parents"
                  dense
                  class="bg-grey-2 text-grey-7"
                  active-color="primary"
                  indicator-color="primary"
                  align="justify"
                  narrow-indicator
                >
                  <q-tab name="mother" label="MOTHER" />
                  <q-tab name="father" label="FATHER" />
                </q-tabs>
                <q-separator />
                <q-tab-panels v-model="this.tabs.parents" animated>
                  <q-tab-panel name="mother">
                    <TabMother />
                  </q-tab-panel>

                  <q-tab-panel name="father">
                    <TabFather />
                  </q-tab-panel>
                </q-tab-panels>
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-expansion-item
            expand-separator
            icon=""
            caption=""
            :label="'SIBLINGS (' + familyBackgrounds.siblings.length + ')'"
          >
            <q-card>
              <q-card-section>
                <TabSiblings />
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-expansion-item expand-separator icon="" label="SPOUSE" caption="">
            <q-card>
              <q-card-section>
                <TabSpouse />
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-expansion-item
            expand-separator
            icon=""
            caption=""
            :label="'CHILDREN (' + familyBackgrounds.children.length + ')'"
          >
            <q-card>
              <q-card-section>
                <TabChildren />
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-expansion-item
            expand-separator
            icon=""
            label="PARENTS IN LAW"
            caption=""
          >
            <q-card>
              <q-card-section>
                <q-tabs
                  v-model="this.tabs.parents_in_law"
                  dense
                  class="bg-grey-2 text-grey-7"
                  active-color="primary"
                  indicator-color="primary"
                  align="justify"
                  narrow-indicator
                >
                  <q-tab name="motherInLaw" label="MOTHER IN LAW" />
                  <q-tab name="fatherInLaw" label="FATHER IN LAW" />
                </q-tabs>
                <q-separator />
                <q-tab-panels v-model="this.tabs.parents_in_law" animated>
                  <q-tab-panel name="motherInLaw">
                    <TabMotherInLaw />
                  </q-tab-panel>

                  <q-tab-panel name="fatherInLaw">
                    <TabFatherInLaw />
                  </q-tab-panel>
                </q-tab-panels>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </div>
      </div>
    </div>
  </q-pull-to-refresh>
</template>

<script>
import { defineComponent } from "vue";

// -------------------- Notify plugins --------------------
import { useQuasar } from "quasar";
let $q;
// -------------------- Notify plugins --------------------

import TabMother from "../components/Tab_Mother.vue";
import TabFather from "../components/Tab_Father.vue";
import TabSiblings from "../components/Tab_Siblings.vue";
import TabSpouse from "../components/Tab_Spouse.vue";
import TabChildren from "../components/Tab_Children.vue";
import TabMotherInLaw from "../components/Tab_Mother_In_Law.vue";
import TabFatherInLaw from "../components/Tab_Father_In_Law.vue";

import helperMethods from "../helperMethods.js";

export default defineComponent({
  name: "FamilyBackground",
  computed: {
    employeeID() {
      return this.$store.getters["user_module/employee_id"];
    },
    familyBackgrounds() {
      return this.$store.getters[
        "family_backgrounds_module/family_backgrounds"
      ];
    },
  },
  components: {
    TabMother,
    TabFather,
    TabSiblings,
    TabSpouse,
    TabChildren,
    TabMotherInLaw,
    TabFatherInLaw,
  },
  data: function () {
    return {
      formIsvisible: false,
      default: {
        tab: "parents",
      },
      tabs: {
        parents: "mother",
        parents_in_law: "motherInLaw",
      },
    };
  },
  mounted: function () {
    $q = useQuasar();
  },
  created: async function () {
    await this.getData();
  },
  methods: {
    getData: async function () {
      await this.$store.dispatch(
        "family_backgrounds_module/get",
        this.employeeID
      );
      this.formIsvisible = true;
    },
    refresh: function () {
      helperMethods.refreshPage();
    },
  },
});
</script>