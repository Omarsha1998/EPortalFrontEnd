<template>
  <q-pull-to-refresh @refresh="this.refresh()">
    <div class="q-pa-md" v-if="this.formIsvisible === true">
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

import helperMethods from "../helperMethods.js";

export default {
  name: "PersonalInformation",
  computed: {
    employeeID() {
      return this.$store.getters["user_module/employee_id"];
    },
    personalInformations() {
      return this.$store.getters[
        "personal_informations_module/personal_informations"
      ];
    },
  },
  mounted: function () {
    $q = useQuasar();
  },
  created: async function () {
    await this.getData();
  },
  data: function () {
    return {
      formIsvisible: false,
      dialog: false,
      view: {
        employee_id: null,
        last_name: null,
        first_name: null,
        middle_name: null,
        extension_name: null,
        nick_name: null,
        full_name: null,
        gender: null,
        personal_email: null,
        mobile_no: null,
        telephone_no: null,
        address: null,
        birth_date: null,
        age: null,
        height: null,
        weight: null,
        place_of_birth: null,
        citizenship: null,
        civil_status: null,
        religion: null,
        tin: null,
        phil_health: null,
        pagibig_no: null,
        sss_no: null,
        atm_no: null,
        uerm_email: null,
        department_name: null,
        job_position: null,
        hired_date: null,
        regularized_date: null,
        contact_person_name: null,
        contact_person_address: null,
        contact_person_contact_no: null,
        date_time_updated: null,
      },
      edit: null,
    };
  },
  methods: {
    getData: async function () {
      await this.$store.dispatch(
        "personal_informations_module/get",
        this.employeeID
      );

      this.view.employee_id = this.employeeID;
      this.view.last_name =
        this.personalInformations.last_name;
      this.view.first_name =
        this.personalInformations.first_name;
      this.view.middle_name =
        this.personalInformations.middle_name;
      this.view.extension_name =
        this.personalInformations.extension_name;
      this.view.nick_name =
        this.personalInformations.nick_name;
      this.view.full_name =
        this.personalInformations.full_name;
      this.view.gender =
        this.personalInformations.gender;
      this.view.personal_email =
        this.personalInformations.personal_email;
      this.view.mobile_no =
        this.personalInformations.mobile_no;
      this.view.telephone_no =
        this.personalInformations.telephone_no;
      this.view.address =
        this.personalInformations.address;
      this.view.birth_date =
        this.personalInformations.birth_date;
      this.view.age =
        this.personalInformations.age;
      this.view.height =
        this.personalInformations.height;
      this.view.weight =
        this.personalInformations.weight;
      this.view.place_of_birth =
        this.personalInformations.place_of_birth;
      this.view.citizenship =
        this.personalInformations.citizenship;
      this.view.civil_status =
        this.personalInformations.civil_status;
      this.view.religion =
        this.personalInformations.religion;
      this.view.tin =
        this.personalInformations.tin;
      this.view.phil_health =
        this.personalInformations.phil_health;
      this.view.pagibig_no =
        this.personalInformations.pagibig_no;
      this.view.sss_no =
        this.personalInformations.sss_no;
      this.view.atm_no =
        this.personalInformations.atm_no;
      this.view.uerm_email =
        this.personalInformations.uerm_email;
      this.view.department_name =
        this.personalInformations.department_name;
      this.view.job_position =
        this.personalInformations.job_position;
      this.view.hired_date =
        this.personalInformations.hired_date;
      this.view.regularized_date =
        this.personalInformations.regularized_date;
      this.view.contact_person_name =
        this.personalInformations.contact_person_name;
      this.view.contact_person_address =
        this.personalInformations.contact_person_address;
      this.view.contact_person_contact_no =
        this.personalInformations.contact_person_contact_no;
      this.view.date_time_updated =
        this.personalInformations.date_time_updated;

      this.formIsvisible = true;
    },
    showDialog: async function () {
      this.dialog = true;
      this.edit = this.getEditDefaultValues();
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
          employee_id: this.employeeID,
          last_name:
            this.personalInformations
              .last_name,
          first_name:
            this.personalInformations
              .first_name,
          middle_name:
            this.personalInformations
              .middle_name,
          extension_name:
            this.personalInformations
              .extension_name,
          nick_name:
            this.personalInformations
              .nick_name,
          personal_email:
            this.personalInformations
              .personal_email,
          mobile_no:
            this.personalInformations
              .mobile_no,
          telephone_no:
            this.personalInformations
              .telephone_no,
          height:
            this.personalInformations
              .height,
          weight:
            this.personalInformations
              .weight,
          address:
            this.personalInformations
              .address,
          civil_status_id:
            this.personalInformations
              .civil_status_id,
          religion_id:
            this.personalInformations
              .religion_id,
          contact_person_name:
            this.personalInformations
              .contact_person_name,
          contact_person_address:
            this.personalInformations
              .contact_person_address,
          contact_person_contact_no:
            this.personalInformations
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
      if (columnName === "birth_date" || columnName === "date_time_updated") {
        return helperMethods.convertToReadableFormatDate(columnValue);
      } else if (columnValue === "1900-01-01") {
        return "";
      } else {
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

        let response = await this.$store.dispatch(
          "personal_informations_module/createRequest",
          this.edit.submit
        );

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
        let response = await this.$store.dispatch(
          "personal_informations_module/getAllReligions"
        );
        return response.data;
      } catch (error) {
        let withRefresh = false;
        helperMethods.showErrorMessage(error, withRefresh);
        return null;
      }
    },
    getAllCivilStatuses: async function () {
      try {
        let response = await this.$store.dispatch(
          "personal_informations_module/getAllCivilStatuses"
        );
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