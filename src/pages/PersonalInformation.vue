<template>
  <q-pull-to-refresh @refresh="this.refresh()">
    <div class="q-pa-md">
      <q-item-section avatar class="items-center" style="margin: 0 10px">
        <h4 class="text-center">
          <q-icon name="info" />
          Personal Information
        </h4>
      </q-item-section>

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
          v-for="(value, property) in view"
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
              <span>
                {{ formatted(property, value) }}
              </span>
            </q-item-label>
          </div>
        </div>
      </div>
    </div>

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
          <q-form method="post" @submit.prevent="onSubmit" autocomplete="off">
            <div class="row bg-white">
              <div class="col-lg-6 col-md-12 col-sm-12 col-12">
                <q-input
                  class="marginLeftAndRight"
                  type="text"
                  label="Last Name"
                  maxlength="30"
                  v-model="edit.submit.last_name"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'This field is required',
                  ]"
                >
                </q-input>
              </div>

              <div class="col-lg-6 col-md-12 col-sm-12 col-12">
                <q-input
                  class="marginLeftAndRight"
                  type="text"
                  label="First Name"
                  maxlength="40"
                  v-model="edit.submit.first_name"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'This field is required',
                  ]"
                >
                </q-input>
              </div>

              <div class="col-lg-6 col-md-12 col-sm-12 col-12">
                <q-input
                  class="marginLeftAndRight"
                  type="text"
                  label="Middle Name (Optional)"
                  maxlength="30"
                  v-model="edit.submit.middle_name"
                  lazy-rules
                >
                </q-input>
              </div>

              <div class="col-lg-6 col-md-12 col-sm-12 col-12">
                <q-input
                  class="marginLeftAndRight"
                  type="text"
                  label="Extension Name (Optional)"
                  maxlength="5"
                  v-model="edit.submit.extension_name"
                >
                </q-input>
              </div>

              <div class="col-lg-6 col-md-12 col-sm-12 col-12">
                <q-input
                  class="marginLeftAndRight"
                  type="text"
                  label="Nick Name (Optional)"
                  maxlength="15"
                  v-model="edit.submit.nick_name"
                >
                </q-input>
              </div>

              <div class="col-lg-6 col-md-12 col-sm-12 col-12">
                <q-input
                  class="marginLeftAndRight"
                  label="Personal Email"
                  maxlength="100"
                  v-model="edit.submit.personal_email"
                  :rules="[
                    (val) => !!val || 'This field is required',
                    isValidEmail,
                  ]"
                >
                </q-input>
              </div>

              <div class="col-lg-6 col-md-12 col-sm-12 col-12">
                <q-input
                  class="marginLeftAndRight"
                  type="text"
                  label="Mobile No"
                  maxlength="15"
                  v-model="edit.submit.mobile_no"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'This field is required',
                  ]"
                >
                </q-input>
              </div>

              <div class="col-lg-6 col-md-12 col-sm-12 col-12">
                <q-input
                  class="marginLeftAndRight"
                  type="text"
                  label="Telephone No (Optional)"
                  maxlength="15"
                  v-model="edit.submit.telephone_no"
                >
                </q-input>
              </div>

              <div class="col-lg-6 col-md-12 col-sm-12 col-12">
                <q-input
                  class="marginLeftAndRight"
                  type="text"
                  label="Height (cm)"
                  maxlength="10"
                  v-model="edit.submit.height"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'This field is required',
                  ]"
                >
                </q-input>
              </div>

              <div class="col-lg-6 col-md-12 col-sm-12 col-12">
                <q-input
                  class="marginLeftAndRight"
                  type="text"
                  label="Weight (kg)"
                  maxlength="10"
                  v-model="edit.submit.weight"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'This field is required',
                  ]"
                >
                </q-input>
              </div>

              <div class="col-lg-6 col-md-12 col-sm-12 col-12">
                <q-input
                  class="marginLeftAndRight"
                  type="text"
                  label="Address"
                  maxlength="150"
                  v-model="edit.submit.address"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'This field is required',
                  ]"
                >
                </q-input>
              </div>

              <div class="col-lg-6 col-md-12 col-sm-12 col-12">
                <q-select
                  class="marginLeftAndRight"
                  v-model="this.edit.submit.civil_status_id"
                  :options="edit.options.civil_status"
                  label="Civil Status"
                  emit-value
                  map-options
                  option-value="civil_status_id"
                  option-label="civil_status_name"
                  lazy-rules
                  :rules="[(val) => val !== 0 || 'This field is required']"
                />
              </div>

              <div class="col-lg-6 col-md-12 col-sm-12 col-12">
                <q-select
                  class="marginLeftAndRight"
                  v-model="this.edit.submit.religion_id"
                  :options="edit.options.religion"
                  label="Religion"
                  emit-value
                  map-options
                  option-value="religion_id"
                  option-label="religion_name"
                  lazy-rules
                  :rules="[(val) => val !== 0 || 'This field is required']"
                />
              </div>

              <div class="col-lg-6 col-md-12 col-sm-12 col-12">
                <q-input
                  class="marginLeftAndRight"
                  type="text"
                  label="Contact Person Name"
                  maxlength="50"
                  v-model="edit.submit.contact_person_name"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'This field is required',
                  ]"
                >
                </q-input>
              </div>

              <div class="col-lg-6 col-md-12 col-sm-12 col-12">
                <q-input
                  class="marginLeftAndRight"
                  type="text"
                  label="Contact Person Address"
                  maxlength="150"
                  v-model="edit.submit.contact_person_address"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'This field is required',
                  ]"
                >
                </q-input>
              </div>

              <div class="col-lg-6 col-md-12 col-sm-12 col-12">
                <q-input
                  class="marginLeftAndRight"
                  type="text"
                  label="Contact Person Contact No"
                  maxlength="15"
                  v-model="edit.submit.contact_person_contact_no"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'This field is required',
                  ]"
                >
                </q-input>
              </div>
            </div>
            <br />
            <br />        
           <br />
        
            <div class="footer">
              <div class="column example-row-equal-width">
                <div class="row">
                  <div class="col">
                    <q-btn
                      class="full-width"
                      color="primary"
                      label="SUBMIT"
                      type="submit"
                      id="btnSubmit"
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
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-pull-to-refresh>
</template>

<script>
// -------------------- Notify plugins --------------------
import { useQuasar } from "quasar";
let $q;
// -------------------- Notify plugins --------------------

import { mapActions } from "vuex";

import helperMethods from "../helperMethods.js";
import { PersonalInformationService } from "src/services/PersonalInformationService.js";

export default {
  name: "PersonalInformation",
  mounted: function () {
    $q = useQuasar();
  },
  data: function () {
    return {
      dialog: false,
      view: {
        employee_id:
          this.$store.state.users.user.personal_informations.employee_id,
        last_name: this.$store.state.users.user.personal_informations.last_name,
        first_name:
          this.$store.state.users.user.personal_informations.first_name,
        middle_name:
          this.$store.state.users.user.personal_informations.middle_name,
        extension_name:
          this.$store.state.users.user.personal_informations.extension_name,
        nick_name: this.$store.state.users.user.personal_informations.nick_name,
        full_name: this.$store.state.users.user.personal_informations.full_name,
        gender: this.$store.state.users.user.personal_informations.gender,
        personal_email:
          this.$store.state.users.user.personal_informations.personal_email,
        mobile_no: this.$store.state.users.user.personal_informations.mobile_no,
        telephone_no:
          this.$store.state.users.user.personal_informations.telephone_no,
        address: this.$store.state.users.user.personal_informations.address,
        birth_date:
          this.$store.state.users.user.personal_informations.birth_date,
        age: this.$store.state.users.user.personal_informations.age,
        height: this.$store.state.users.user.personal_informations.height,
        weight: this.$store.state.users.user.personal_informations.weight,
        place_of_birth:
          this.$store.state.users.user.personal_informations.place_of_birth,
        citizenship:
          this.$store.state.users.user.personal_informations.citizenship,
        civil_status:
          this.$store.state.users.user.personal_informations.civil_status,
        religion: this.$store.state.users.user.personal_informations.religion,
        tin: this.$store.state.users.user.personal_informations.tin,
        phil_health:
          this.$store.state.users.user.personal_informations.phil_health,
        pagibig_no:
          this.$store.state.users.user.personal_informations.pagibig_no,
        sss_no: this.$store.state.users.user.personal_informations.sss_no,
        atm_no: this.$store.state.users.user.personal_informations.atm_no,
        uerm_email:
          this.$store.state.users.user.personal_informations.uerm_email,
        department_name:
          this.$store.state.users.user.personal_informations.department_name,
        job_position:
          this.$store.state.users.user.personal_informations.job_position,
        hired_date:
          this.$store.state.users.user.personal_informations.hired_date,
        regularized_date:
          this.$store.state.users.user.personal_informations.regularized_date,
        contact_person_name:
          this.$store.state.users.user.personal_informations
            .contact_person_name,
        contact_person_address:
          this.$store.state.users.user.personal_informations
            .contact_person_address,
        contact_person_contact_no:
          this.$store.state.users.user.personal_informations
            .contact_person_contact_no,
        date_time_updated: helperMethods.convertToReadableFormatDateTime(
          this.$store.state.users.user.personal_informations.date_time_updated
        ),
      },
      edit: this.getEditDefaultValues(),
    };
  },
  methods: {
    ...mapActions(["getUser"]),
    showDialog: async function () {
      this.dialog = true;
      this.edit.options.religion = await this.getAllReligions();
      this.edit.options.civil_status = await this.getAllCivilStatuses();
    },
    hideDialog: function () {
      this.dialog = false;
      this.edit = this.getEditDefaultValues();
    },
    getEditDefaultValues: function () {
      const response = {
        submit: {
          employee_id:
            this.$store.state.users.user.personal_informations.employee_id,
          last_name:
            this.$store.state.users.user.personal_informations.last_name,
          first_name:
            this.$store.state.users.user.personal_informations.first_name,
          middle_name:
            this.$store.state.users.user.personal_informations.middle_name,
          extension_name:
            this.$store.state.users.user.personal_informations.extension_name,
          nick_name:
            this.$store.state.users.user.personal_informations.nick_name,
          personal_email:
            this.$store.state.users.user.personal_informations.personal_email,
          mobile_no:
            this.$store.state.users.user.personal_informations.mobile_no,
          telephone_no:
            this.$store.state.users.user.personal_informations.telephone_no,
          height: this.$store.state.users.user.personal_informations.height,
          weight: this.$store.state.users.user.personal_informations.weight,
          address: this.$store.state.users.user.personal_informations.address,
          civil_status_id:
            this.$store.state.users.user.personal_informations.civil_status_id,
          religion_id:
            this.$store.state.users.user.personal_informations.religion_id,
          contact_person_name:
            this.$store.state.users.user.personal_informations
              .contact_person_name,
          contact_person_address:
            this.$store.state.users.user.personal_informations
              .contact_person_address,
          contact_person_contact_no:
            this.$store.state.users.user.personal_informations
              .contact_person_contact_no,
        },
        options: {
          religion: null,
          civil_status: null,
        },
      };
      return response;
    },
    formatted: function (columnName, columnValue) {
      if (columnName === "birth_date") {
        return helperMethods.convertToReadableFormatDate(columnValue);
      } else if (
        columnName === "regularized_date" &&
        columnValue === "1900-01-01"
      )
        return "";
      else {
        return columnValue;
      }
    },
    isValidEmail(val) {
      const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(val) || "Invalid Email";
    },
    onSubmit: async function () {
      try {
        document.getElementById("btnSubmit").disabled = true;
        let response = await PersonalInformationService.createRequest(
          this.edit.submit
        );

        await this.getUser();
        $q.notify({
          type: "positive",
          message: response.data,
        });
        return this.$router.push("/my-request");
      } catch (error) {
        let withRefresh = false;
        helperMethods.showErrorMessage(error, withRefresh);
      } finally {
        document.getElementById("btnSubmit").disabled = false;
      }
    },
    getAllReligions: async function () {
      try {
        let response = await PersonalInformationService.getAllReligions();
        return response.data;
      } catch (error) {
        let withRefresh = false;
        helperMethods.showErrorMessage(error, withRefresh);
        return null;
      }
    },
    getAllCivilStatuses: async function () {
      try {
        let response = await PersonalInformationService.getAllCivilStatuses();
        return response.data;
      } catch (error) {
        let withRefresh = false;
        helperMethods.showErrorMessage(error, withRefresh);
        return null;
      }
    },
    refresh: function () {
      helperMethods.refreshPage();
    },
  },
};
</script>