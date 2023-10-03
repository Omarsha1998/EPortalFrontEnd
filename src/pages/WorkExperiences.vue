<template>
  <q-pull-to-refresh @refresh="this.refresh()">
    <q-item-section avatar class="items-center" style="margin: 0 10px">
      <h4 class="text-center">
        <q-icon name="work" />
        Work Experiences
      </h4>
    </q-item-section>

    <div class="q-pa-md">
      <div class="q-gutter-y-md">
        <h5
          class="text-center"
          v-if="this.$store.state.users.user.work_experiences.length === 0"
        >
          No Records found
        </h5>

        <div v-if="this.$store.state.users.user.work_experiences.length > 0">
          <q-item-label
            class="text-center"
            style="margin-bottom: 15px; font-weight: bold"
            >TOTAL RECORDS : ({{
              this.$store.state.users.user.work_experiences.length
            }})</q-item-label
          >

          <div
            class="borderStyle"
            v-for="work_experience in this.$store.state.users.user
              .work_experiences"
            :key="work_experience.company_name"
          >
            <div
              class="row marginTopBottom20px"
              v-for="(value, property) in work_experience"
              :key="property"
            >
              <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                <q-item-label class="cardStyle">
                  <span style="font-weight: bold">
                    {{ property.replaceAll("_", " ").toUpperCase() }}
                    :
                  </span>
                </q-item-label>
              </div>
              <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                <q-item-label class="cardStyle">
                  <span>
                    {{ value }}
                  </span>
                </q-item-label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-pull-to-refresh>
</template>

<script>
import { defineComponent } from "vue";
import helperMethods from "../helperMethods.js";

export default defineComponent({
  name: "WorkExperiences",
  methods: {
    refresh: function () {
      helperMethods.refreshPage();
    },
  },
});
</script>
