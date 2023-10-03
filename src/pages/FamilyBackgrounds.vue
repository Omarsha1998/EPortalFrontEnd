<template>
  <q-pull-to-refresh @refresh="this.refresh()">
    <q-item-section avatar class="items-center" style="margin: 0 10px;">
      <h4 class="text-center">
        <q-icon name="people" />
        Family Backgrounds
      </h4>
    </q-item-section>

    <div class="q-pa-md">
      <div class="q-gutter-y-md">
        <h5
          class="text-center"
          v-if="
            this.$store.state.users.user.family_backgrounds.parents.mother
              .full_name === '' &&
            this.$store.state.users.user.family_backgrounds.parents.father
              .full_name === ''
          "
        >
          No Records found
        </h5>

        <div
           v-if="
                this.$store.state.users.user.family_backgrounds.parents.mother
                  .full_name !== '' &&
                this.$store.state.users.user.family_backgrounds.parents.father
                  .full_name !== ''
              "
        >
          <q-expansion-item expand-separator icon="" label="PARENTS" caption="">
            <q-card
              v-if="
                this.$store.state.users.user.family_backgrounds.parents.mother
                  .full_name !== '' &&
                this.$store.state.users.user.family_backgrounds.parents.father
                  .full_name !== ''
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
            :label="
              'SIBLINGS (' +
              this.$store.state.users.user.family_backgrounds.siblings.length +
              ')'
            "
          >
            <q-card>
              <q-card-section>
                <TabSiblings />
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-expansion-item expand-separator icon="" label="SPOUSE" caption="">
            <q-card>
              <q-card-section> <TabSpouse /> </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-expansion-item
            expand-separator
            icon=""
            caption=""
            :label="
              'CHILDREN (' +
              this.$store.state.users.user.family_backgrounds.children.length +
              ')'
            "
          >
            <q-card>
              <q-card-section> <TabChildren /></q-card-section>
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

import TabMother from "../components/Tab_Mother.vue";
import TabFather from "../components/Tab_Father.vue";
import TabSiblings from "../components/Tab_Siblings.vue";
import TabSpouse from "../components/Tab_Spouse.vue";
import TabChildren from "../components/Tab_Children.vue";
import TabMotherInLaw from "../components/Tab_Mother_In_Law.vue";
import TabFatherInLaw from "../components/Tab_Father_In_Law.vue";

import helperMethods from "../helperMethods.js";

export default defineComponent({
  name: "FamilyBackgrounds",
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
      default: {
        tab: "parents",
      },
      tabs: {
        parents: "mother",
        parents_in_law: "motherInLaw",
      },
    };
  },
  methods: {
    refresh: function () {
      helperMethods.refreshPage();
    },
  },
});
</script>


<style scoped>
</style>