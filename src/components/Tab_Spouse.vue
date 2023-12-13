<template>
  <!---------------------------------------------------------------------- CREATE ---------------------------------------------------------------------->
  <q-card
    v-if="
      this.$store.state.users.user.family_backgrounds.spouse.full_name === ''
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
          id="frmSpouse"
          method="post"
          @submit.prevent="onSubmit(this.submit.create)"
          autocomplete="off"
        >
          <div class="row bg-white">
            <div class="col-lg-12 col-md-12 col-sm-12 col-12">
              <q-input
                class="marginLeftAndRight"
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
                class="marginLeftAndRight"
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
                class="marginLeftAndRight"
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
                class="marginLeftAndRight"
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
              <q-file
                accept=".pdf"
                clearable
                v-model="this.submit.create.attach_marriage_certificate"
                label="Attach - Marriage Certificate"
                counter
                lazy-rules
                @rejected="this.onRejected"
                :rules="[
                  (val) => (val && val !== null) || 'This field is required',
                ]"
                max-file-size="5242880"
              >
                <template v-slot:prepend>
                  <q-icon name="attach_file" />
                </template>

                <template v-slot:hint> (5MB maximum file size) </template>
              </q-file>
              <q-input
                class="marginLeftAndRight"
                type="date"
                label="Marriage Date (Optional)"
                v-model="this.submit.create.marriage_date"
              >
              </q-input>
            </div>
          </div>
                   <br />
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

  <!---------------------------------------------------------------------- VIEW ---------------------------------------------------------------------->
  <div
    v-if="
      this.$store.state.users.user.family_backgrounds.spouse.full_name !== ''
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
          .family_backgrounds.spouse"
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

        <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6" v-if="value !== ''">
          <q-item-label class="cardStyle">
            <span
              style="font-weight: bold"
              v-if="property === 'marriage_certificate'"
            >
              <a :href="value" target="_blank" style="color: #1681ec"
                >CLICK HERE</a
              >
            </span>
            <span style="font-weight: normal" v-else>
              {{ formatted(property, value) }}
            </span>
          </q-item-label>
        </div>
      </div>
    </div>
  </div>
  <!---------------------------------------------------------------------- VIEW ---------------------------------------------------------------------->

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
          @submit.prevent="onSubmit(this.submit.edit)"
          autocomplete="off"
        >
          <div class="row bg-white">
            <div class="col-lg-6 col-md-12 col-sm-12 col-12">
              <q-input
                class="marginLeftAndRight"
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
                class="marginLeftAndRight"
                type="date"
                label="Birth Date"
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
                class="marginLeftAndRight"
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
                class="marginLeftAndRight"
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

            <div
              class="col-lg-6 col-md-12 col-sm-12 col-12"
              v-if="
                this.$store.state.users.user.family_backgrounds.spouse
                  .marriage_certificate === ''
              "
            >
              <q-file
                accept=".pdf"
                clearable
                v-model="this.submit.edit.attach_marriage_certificate"
                label="Attach - Marriage Certificate"
                counter
                lazy-rules
                @rejected="this.onRejected"
                :rules="[
                  (val) => (val && val !== null) || 'This field is required',
                ]"
                max-file-size="5242880"
              >
                <template v-slot:prepend>
                  <q-icon name="attach_file" />
                </template>

                <template v-slot:hint> (5MB maximum file size) </template>
              </q-file>
            </div>

            <div class="col-lg-6 col-md-12 col-sm-12 col-12">
              <q-input
                class="marginLeftAndRight"
                type="date"
                label="Marriage Date (Optional)"
                v-model="submit.edit.marriage_date"
              >
              </q-input>
            </div>
          </div>
          <br />
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
import { UploadService } from "src/services/UploadService.js";
import helperMethods from "src/helperMethods";
export default {
  name: "Tab_Spouse",
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
          family_type: "Spouse",
          full_name: null,
          birth_date: null,
          occupation: null,
          company_name: null,
          attach_marriage_certificate: null,
          marriage_date: null,
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
      this.submit.edit = this.getEditDefaultValues();
    },
    getCorrectDate: function (value) {
      let response = helperMethods.removeTime(helperMethods.correctDate(value));
      if (response !== "1900-01-01") {
        return response;
      }
    },
    getEditDefaultValues: function () {
      const response = {
        full_name:
          this.$store.state.users.user.family_backgrounds.spouse.full_name,
        request_type: "edit",
        family_type: "Spouse",
        birth_date: this.getCorrectDate(
          this.$store.state.users.user.family_backgrounds.spouse.birth_date
        ),
        employee_id:
          this.$store.state.users.user.personal_informations.employee_id,
        occupation:
          this.$store.state.users.user.family_backgrounds.spouse.occupation,
        company_name:
          this.$store.state.users.user.family_backgrounds.spouse.company_name,
        attach_marriage_certificate: null,
        marriage_date: this.getCorrectDate(
          this.$store.state.users.user.family_backgrounds.spouse.marriage_date
        ),
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
    onRejected: function (rejectedFiles) {
      const errorsMap = {
        accept: "(.pdf) file is only allowed to upload.",
        "max-file-size":
          "The file size exceeded 5MB. Please reduce the file size.",
      };

      rejectedFiles.forEach((rejectedFile) => {
        const errorMessage = errorsMap[rejectedFile.failedPropValidation];

        if (!errorMessage) {
          return;
        }

        if (rejectedFile.failedPropValidation) {
          $q.notify({
            type: "negative",
            message: errorMessage,
          });
        }
      });
    },
    onSubmit: async function (data) {
      try {
        document.getElementById("btnSubmit").disabled = true;

        const obj = {
          request_type: data.request_type,
          employee_id: data.employee_id,
          family_type: data.family_type,
          full_name: data.full_name,
          birth_date: data.birth_date,
          occupation: data.occupation,
          company_name: data.company_name,
          attach_marriage_certificate:
            data.attach_marriage_certificate === null
              ? ""
              : data.attach_marriage_certificate.name,
          marriage_date: data.marriage_date,
        };

        let response = await FamilyBackgroundService.createRequest(obj);

        if (data.attach_marriage_certificate !== null) {
          const formData = new FormData();
          formData.append("request_id", response.data);
          formData.append("request_type", "create");
          formData.append("attach_file", "marriage_certificate");
          formData.append("employee_id", data.employee_id);
          formData.append(
            "marriage_certificate",
            data.attach_marriage_certificate
          );
          await UploadService.index(formData);
        }

        await this.getUser();
        $q.notify({
          type: "positive",
          message: "Sucessfully submitted.",
        });

        return this.$router.push("/my-request");
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