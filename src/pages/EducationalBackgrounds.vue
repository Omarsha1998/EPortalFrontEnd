<template>
  <q-pull-to-refresh @refresh="this.refresh()">
    <q-item-section avatar class="items-center" style="margin: 0 10px">
      <h4 class="text-center">
        <q-icon name="school" />
        Educational Backgrounds
      </h4>
    </q-item-section>

    <div class="q-pa-md">
      <div class="q-gutter-y-md">
        <div class="row justify-center" style="margin-bottom: 20px">
          <q-btn
            color="positive"
            label="CREATE"
            icon="add"
            type="button"
            @click="this.showDialogCreate()"
          ></q-btn>
        </div>

        <h5
          class="text-center"
          v-if="
            this.$store.state.users.user.educational_backgrounds.length === 0
          "
        >
          No Records found
        </h5>

        <div
          v-if="this.$store.state.users.user.educational_backgrounds.length > 0"
        >
          <q-item-label
            class="text-center"
            style="margin-bottom: 15px; font-weight: bold"
            >TOTAL RECORDS : ({{
              this.$store.state.users.user.educational_backgrounds.length
            }})</q-item-label
          >
          <div
            class="borderStyle"
            v-for="education in this.$store.state.users.user
              .educational_backgrounds"
            :key="education.diploma"
          >
            <div
              v-for="(value, property) in education"
              :key="property"
            >
             <div
              class="row marginTopBottom20px"
              v-if="value !== ''"
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
                  <span v-if="value !== '' && (property === 'attached_tor' || property === 'attached_diploma')">
                      <a :href="value" target="_blank" style="color: #1681ec"
                      >CLICK HERE</a>
                  </span>
                   <span v-else>
                   {{ value }}
                  </span>
                </q-item-label>
              </div>
                     </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!---------------------------------------------------------------------- CREATE ---------------------------------------------------------------------->
    <q-dialog
      v-model="dialogCreate"
      persistent
      :maximized="true"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <q-card-section>
          <div class="text-h6 text-primary">CREATE</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form
            id="frmCreate"
            method="post"
            @submit="this.onSubmit(this.submit.create)"
            autocomplete="off"
          >
            <div class="row bg-white">
              <div class="col-lg-12 col-md-12 col-sm-12 col-12">
                <q-input
                  style="margin: 10px"
                  type="number"
                  label="From (yyyy)"
                  maxlength="4"
                  v-model="this.submit.create.from"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'This field is required',
                    (val) => (val && val.length < 5) || 'Maximum digit is 4',
                    (val) => (val && val.length > 3) || '4 digit is required',
                  ]"
                >
                </q-input>
                <q-input
                  style="margin: 10px"
                  type="number"
                  label="To (yyyy)"
                  maxlength="4"
                  v-model="this.submit.create.to"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'This field is required',
                    (val) => (val && val.length < 5) || 'Maximum digit is 4',
                    (val) => (val && val.length > 3) || '4 digit is required',
                  ]"
                >
                </q-input>
                <q-input
                  style="margin: 10px"
                  type="text"
                  label="Diploma"
                  maxlength="100"
                  v-model="this.submit.create.diploma"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'This field is required',
                  ]"
                >
                </q-input>
                <q-input
                  style="margin: 10px"
                  type="text"
                  label="Institution Name"
                  maxlength="60"
                  v-model="this.submit.create.institution_name"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'This field is required',
                  ]"
                >
                </q-input>
                <q-input
                  style="margin: 10px"
                  type="text"
                  label="Institution Address"
                  maxlength="50"
                  v-model="this.submit.create.institution_address"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'This field is required',
                  ]"
                >
                </q-input>
                <q-file
                  accept=".jpg, .jpeg, .png, .pdf"
                  clearable
                  v-model="this.submit.create.attach_tor"
                  label="Attach - TOR"
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
                <q-file
                  accept=".jpg, .jpeg, .png, .pdf"
                  clearable
                  v-model="this.submit.create.attach_diploma"
                  label="Attach - Diploma"
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
            </div>
            <br />
            <br />

            <div class="row" style="margin-bottom: 14px">
              <q-btn
                class="full-width"
                color="primary"
                label="SUBMIT"
                type="submit"
                id="btnSubmit"
              ></q-btn>
            </div>
            <div class="row">
              <q-btn
                class="full-width"
                color="negative"
                label="CANCEL"
                type="button"
                @click="this.hideDialogCreate()"
              ></q-btn>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
    <!---------------------------------------------------------------------- CREATE ---------------------------------------------------------------------->
  </q-pull-to-refresh>
</template>

<script>
import { defineComponent } from "vue";
import helperMethods from "../helperMethods.js";
import { UploadService } from "src/services/UploadService.js";
import { EducationalBackgroundService } from "src/services/EducationalBackgroundService.js";
// -------------------- Notify plugins --------------------
import { useQuasar } from "quasar";
let $q;
// -------------------- Notify plugins --------------------

import { mapActions } from "vuex";

export default defineComponent({
  name: "EducationalBackgrounds",
  data: function () {
    return {
      dialogCreate: false,
      submit: {
        create: {
          request_type: "create",
          employee_id:
            this.$store.state.users.user.personal_informations.employee_id,
          from: null,
          to: null,
          diploma: null,
          institution_name: null,
          institution_address: null,
          attach_tor: null,
          attach_diploma: null,
        },
      },
    };
  },
  mounted: function () {
    $q = useQuasar();
  },
  methods: {
    ...mapActions(["getUser"]),
    refresh: function () {
      helperMethods.refreshPage();
    },
    showDialogCreate: function () {
      this.dialogCreate = true;
    },
    hideDialogCreate: function () {
      this.dialogCreate = false;
      this.submit.create.from = null;
      this.submit.create.to = null;
      this.submit.create.diploma = null;
      this.submit.create.institution_name = null;
      this.submit.create.institution_address = null;
      this.submit.create.attach_tor = null;
      this.submit.create.attach_diploma = null;
    },
    onSubmit: async function (data) {
      try {
        document.getElementById("btnSubmit").disabled = true;

        const obj = {
          request_type: data.request_type,
          employee_id: data.employee_id,
          from: data.from,
          to: data.to,
          diploma: data.diploma,
          institution_name: data.institution_name,
          institution_address: data.institution_address,
          attach_tor: data.attach_tor.name,
          attach_diploma: data.attach_diploma.name,
        };

        let response = await EducationalBackgroundService.createRequest(obj);

        if (data.attach_tor !== null && data.attach_diploma !== null) {
          const formData = new FormData();
          formData.append("request_id", response.data);
          formData.append("request_type", "create");
          formData.append("attach_file", "tor_and_diploma");
          formData.append("employee_id", data.employee_id);
          formData.append("tor", data.attach_tor);
          formData.append("diploma", data.attach_diploma);
          await UploadService.index(formData);
        }

        await this.getUser();
        $q.notify({
          type: "positive",
          message: "Sucessfully submitted.",
        });
        return this.$router.push("/my-requests");
      } catch (error) {
        let withRefresh = false;
        helperMethods.showErrorMessage(error, withRefresh);
      } finally {
        document.getElementById("btnSubmit").disabled = false;
      }
    },
    onRejected: function (rejectedFiles) {
      const errorsMap = {
        accept: "(.jpg or .jpeg or .pdf or .png) file is only allowed.",
        "max-file-size":
          "The file size exceeded 5MB. Please reduce the file resolution.",
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
  },
});
</script>
