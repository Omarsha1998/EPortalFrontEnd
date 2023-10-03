<template>
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
        .family_backgrounds.parents.mother"
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
          id="frm"
          method="post"
          @submit.prevent="onSubmit(this.edit.submit)"
          autocomplete="off"
        >
          <div class="row bg-white">
            <div class="col-lg-6 col-md-12 col-sm-12 col-12">
              <q-input
                style="margin: 10px"
                type="text"
                label="Full Name"
                maxlength="80"
                v-model="this.edit.submit.full_name"
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
                label="Birth Date"
                v-model="this.edit.submit.birth_date"
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
                v-model="this.edit.submit.occupation"
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
                v-model="this.edit.submit.company_name"
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
  name: "Tab_Mother",
  mounted: function () {
    $q = useQuasar();
  },
  data: function () {
    return {
      dialog: false,
      edit: this.getEditDefaultValues(),
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
        submit: {
          full_name:
            this.$store.state.users.user.family_backgrounds.parents.mother
              .full_name,
          request_type: "edit",
          family_type: "Mother",
          birth_date: this.getBirthDate(
            this.$store.state.users.user.family_backgrounds.parents.mother
              .birth_date
          ),
          employee_id:
            this.$store.state.users.user.personal_informations.employee_id,
          occupation:
            this.$store.state.users.user.family_backgrounds.parents.mother
              .occupation,
          company_name:
            this.$store.state.users.user.family_backgrounds.parents.mother
              .company_name,
        },
      };
      return response;
    },
    formatted: function (columnName, columnValue) {
      if (columnName === "birth_date") {
        return helperMethods.convertToReadableFormatDate(
          helperMethods.correctDate(columnValue)
        );
      } else if (columnName === "date_time_updated") {
        if (columnValue === "1899-12-31T15:54:17.000Z") {
          return "";
        }
        return helperMethods.convertToReadableFormatDateTime(columnValue);
      } else {
        return columnValue;
      }
    },
    onSubmit: async function (value) {
      try {
        document.getElementById("btnSubmit").disabled = true;
        await FamilyBackgroundService.createRequest(value);
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
