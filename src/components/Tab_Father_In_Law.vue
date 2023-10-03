<template>
  <!---------------------------------------------------------------------- CREATE ---------------------------------------------------------------------->
  <q-card
    v-if="
      this.$store.state.users.user.family_backgrounds.parents_in_law
        .father_in_law.full_name === ''
    "
  >
    <q-tabs
      v-model="this.default.createTab"
      dense
      class="bg-grey-2 text-grey-7"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="create" label="CREATE" />
    </q-tabs>
    <q-separator />
    <q-tab-panels v-model="this.default.createTab" animated>
      <q-tab-panel name="create">
        <q-form
          id="frmMotherInLaw"
          method="post"
          @submit.prevent="onSubmit(this.submit.create)"
          autocomplete="off"
        >
          <div class="row bg-white">
            <div class="col-lg-12 col-md-12 col-sm-12 col-12">
              <q-input
                style="margin: 10px"
                type="text"
                label="Full Name"
                maxlength="80"
                v-model="this.submit.create.full_name"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'This field is required',
                ]"
              >
              </q-input>
              <q-input
                style="margin: 10px"
                type="date"
                label="Birth Date"
                v-model="this.submit.create.birth_date"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'This field is required',
                ]"
              >
              </q-input>
              <q-input
                style="margin: 10px"
                type="text"
                label="Occupation"
                maxlength="60"
                v-model="this.submit.create.occupation"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'This field is required',
                ]"
              >
              </q-input>
              <q-input
                style="margin: 10px"
                type="text"
                label="Company Name"
                maxlength="150"
                v-model="this.submit.create.company_name"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'This field is required',
                ]"
              >
              </q-input>
            </div>
          </div>
          <div class="row" style="margin-top: 13px">
            <q-btn
              id="btnSubmit"
              class="full-width"
              color="primary"
              label="SUBMIT"
              type="submit"
            ></q-btn>
          </div>
        </q-form>
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
  <!---------------------------------------------------------------------- CREATE ---------------------------------------------------------------------->

  <div
    v-if="
      this.$store.state.users.user.family_backgrounds.parents_in_law
        .father_in_law.full_name !== ''
    "
  >
    <div class="row justify-center" style="margin-bottom: 12px">
      <q-btn
        color="primary"
        label="EDIT"
        icon="edit"
        type="button"
        @click="this.showDialog()"
      ></q-btn>
    </div>
    <div class="borderStyle">
      <div
        class="row bg-white"
        v-for="(value, property) in this.$store.state.users.user
          .family_backgrounds.parents_in_law.father_in_law"
        :key="property"
      >
        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
          <q-item-label class="cardStyle">
            <span style="font-weight: bold" v-if="property === 'height'">
              HEIGHT (cm) :
            </span>
            <span style="font-weight: bold" v-else-if="property === 'weight'">
              WEIGHT (kg) :
            </span>
            <span style="font-weight: bold" v-else>
              {{ property.replaceAll("_", " ").toUpperCase() }}
              :
            </span>
          </q-item-label>
        </div>

        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
          <q-item-label class="cardStyle">
            <span style="font-weight: normal">
              {{ formatted(property, value) }}
            </span>
          </q-item-label>
        </div>
      </div>
    </div>
  </div>

  <!---------------------------------------------------------------------- EDIT ---------------------------------------------------------------------->
  <q-dialog
    v-model="dialog"
    persistent
    :maximized="true"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card>
      <q-card-section>
        <div class="text-h6 text-primary">EDIT</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form
          method="post"
          @submit.prevent="onSubmit(this.submit.edit)"
          autocomplete="off"
        >
          <div class="row bg-white">
            <div class="col-lg-6 col-md-12 col-sm-12 col-12">
              <q-input
                style="margin: 10px"
                type="text"
                label="Full Name"
                maxlength="80"
                v-model="this.submit.edit.full_name"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'This field is required',
                ]"
              >
              </q-input>
            </div>
            <div class="col-lg-6 col-md-12 col-sm-12 col-12">
              <q-input
                style="margin: 10px"
                type="date"
                label="Full Name"
                v-model="this.submit.edit.birth_date"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'This field is required',
                ]"
              >
              </q-input>
            </div>
            <div class="col-lg-6 col-md-12 col-sm-12 col-12">
              <q-input
                style="margin: 10px"
                type="text"
                label="Occupation"
                maxlength="60"
                v-model="this.submit.edit.occupation"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'This field is required',
                ]"
              >
              </q-input>
            </div>

            <div class="col-lg-6 col-md-12 col-sm-12 col-12">
              <q-input
                style="margin: 10px"
                type="text"
                label="Company Name"
                maxlength="150"
                v-model="this.submit.edit.company_name"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'This field is required',
                ]"
              >
              </q-input>
            </div>
          </div>
          <div class="column example-row-equal-width">
            <div class="row">
              <div class="col">
                <q-btn
                  id="btnSubmit"
                  class="full-width"
                  color="primary"
                  label="SUBMIT"
                  type="submit"
                ></q-btn>
              </div>
              <div class="col">
                <q-btn
                  class="full-width"
                  color="negative"
                  label="CANCEL"
                  type="button"
                  @click="this.hideDialog()"
                ></q-btn>
              </div>
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!---------------------------------------------------------------------- EDIT ---------------------------------------------------------------------->
</template>

<script>
// -------------------- Notify plugins --------------------
import { useQuasar } from "quasar";
let $q;
// -------------------- Notify plugins --------------------

import { mapActions } from "vuex";
import { FamilyBackgroundService } from "src/services/FamilyBackgroundService.js";
import helperMethods from "src/helperMethods";
export default {
  name: "Tab_Father_In_Law",
  mounted: function () {
    $q = useQuasar();
  },
  data: function () {
    return {
      dialog: false,
      default: {
        createTab: "create",
      },
      submit: {
        create: {
          request_type: "create",
          employee_id:
            this.$store.state.users.user.personal_informations.employee_id,
          family_type: "Father-In-Law",
          full_name: null,
          birth_date: null,
          occupation: null,
          company_name: null,
        },
        edit: this.getEditDefaultValues(),
      },
    };
  },
  methods: {
    ...mapActions(["getUser"]),
    showDialog: function () {
      this.dialog = true;
    },
    hideDialog: function () {
      this.dialog = false;
      this.edit = this.getEditDefaultValues();
    },
    getBirthDate: function (value) {
      return helperMethods.removeTime(helperMethods.correctDate(value));
    },
    getEditDefaultValues: function () {
      const response = {
        full_name:
          this.$store.state.users.user.family_backgrounds.parents_in_law
            .father_in_law.full_name,
        request_type: "edit",
        family_type: "Father-In-Law",
        birth_date: this.getBirthDate(
          this.$store.state.users.user.family_backgrounds.parents_in_law
            .father_in_law.birth_date
        ),
        employee_id:
          this.$store.state.users.user.personal_informations.employee_id,
        occupation:
          this.$store.state.users.user.family_backgrounds.parents_in_law
            .father_in_law.occupation,
        company_name:
          this.$store.state.users.user.family_backgrounds.parents_in_law
            .father_in_law.company_name,
      };
      return response;
    },
    formatted: function (columnName, columnValue) {
      if (columnName === "birth_date" || columnName === "marriage_date") {
        let response = helperMethods.correctDate(columnValue);
        if (response !== "1900-01-01T00:00:00.000Z") {
          response = helperMethods.convertToReadableFormatDate(response);
          return response;
        }
      } else if (columnName === "date_time_updated") {
        if (columnValue === "1899-12-31T15:54:17.000Z") {
          return "";
        }
        return helperMethods.convertToReadableFormatDateTime(columnValue);
      } else {
        return columnValue;
      }
    },
    onSubmit: async function (data) {
      try {
        document.getElementById("btnSubmit").disabled = true;
        await FamilyBackgroundService.createRequest(data);
        await this.getUser();
        $q.notify({
          type: "positive",
          message: "Successfully submitted.",
        });
        return this.$router.push("/my-requests");
      } catch (error) {
        let withRefresh = false;
        helperMethods.showErrorMessage(error, withRefresh);
      } finally {
        document.getElementById("btnSubmit").disabled = false;
      }
    },
  },
};
</script>

<style scoped>
</style>
