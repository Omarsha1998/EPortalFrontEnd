<template>
  <q-pull-to-refresh @refresh="this.refresh()">
    <div class="bgImageUERM row justify-center">
      <div class="column">
        <div class="row">
          <q-layout class="row justify-center items-center">
            <q-card style="margin: 15px">
              <br />
              <br />
              <Logo />
              <Title :title="'(UPDATE LICENSE EXPIRATION DATE)'"></Title>
              <q-card-section>
                <q-form
                  id="frm"
                  class="q-gutter-md"
                  method="post"
                  @submit.prevent="onSubmit(this.submit)"
                  autocomplete="off"
                >
                  <h6
                    class="text-center"
                    style="margin: 0 30px"
                    v-if="view.remaining_days === 0"
                  >
                    Today is your last day to submit a request to update your
                    license before it expires. Please update it.
                  </h6>
                  <h6
                    class="text-center"
                    style="margin: 0 30px"
                    v-else-if="view.remaining_days > 0"
                  >
                    You have {{ view.remaining_days }}
                    {{ view.remaining_days == 1 ? "day" : "days" }}, before your
                    license will expire.
                  </h6>
                  <h6
                    class="text-center"
                    style="margin: 0 30px"
                    v-else-if="view.remaining_days < 0 && this.submit.current_expiration_date !== '1900-01-01T00:00:00.000Z'"
                  >
                    This license is already expired. Please update it.
                  </h6>     

                  <q-item-label
                    >License Name : {{ submit.license_name }}</q-item-label
                  >
                  <q-item-label
                    >License No : {{ submit.license_no }}</q-item-label
                  >

                  <q-item-label v-if="this.submit.current_expiration_date !== '1900-01-01T00:00:00.000Z'"
                    >License Expiration Date :
                    {{ view.string_old_expiration_date }}</q-item-label
                  >

                  <q-item-label v-if="this.submit.current_expiration_date !== '1900-01-01T00:00:00.000Z'"
                    >PRC ID : <a :href="view.prc_id_url" target="_blank" style="color: #1681ec">CLICK HERE</a> </q-item-label
                  >
       
                  <q-input
                    type="date"
                    label="New Expiration Date of License"
                    v-model="submit.new_expiration_date"
                    lazy-rules
                    :rules="[
                      (val) =>
                        (val && val.length > 0) || 'This field is required',
                    ]"
                  >
                  </q-input>

                  <q-file
                    accept=".pdf"
                    clearable
                    v-model="submit.attach_prc_id"
                    label="Attach - PRC ID"
                    counter
                    lazy-rules
                    @rejected="this.onRejected"
                    :rules="[
                      (val) =>
                        (val && val !== null) || 'This field is required',
                    ]"
                    max-file-size="5242880"
                  >
                    <template v-slot:prepend>
                      <q-icon name="attach_file" />
                    </template>

                    <template v-slot:hint> (5MB maximum file size) </template>
                  </q-file>

                  <div>
                    <q-btn
                      id="btnSubmit"
                      class="full-width"
                      color="primary"
                      label="SUBMIT"
                      type="submit"
                    ></q-btn>
                    <q-btn
                      class="full-width"
                      color="primary"
                      label="NOT NOW"
                      type="button"
                      style="margin-top: 7px"
                      @click="redirect()"
                    ></q-btn>
                  </div>
                </q-form>
              </q-card-section>
            </q-card>
          </q-layout>
        </div>
      </div>
    </div>
  </q-pull-to-refresh>
</template>

<script>
// -------------------- Notify plugins --------------------
import { useQuasar } from "quasar";
let $q;
// -------------------- Notify plugins --------------------

import Logo from "../components/Logo.vue";
import Title from "../components/Title.vue";

import { LicenseService } from "../services/LicenseService.js";
import { UploadService } from "src/services/UploadService.js";
import helperMethods from "../helperMethods.js";

import { mapActions } from "vuex";

export default {
  name: "UpdateLicenseExpirationDate",
  components: {
    Logo,
    Title,
  },
  data: function () {
    return {
      view: {
        remaining_days: null,
        string_old_expiration_date: null,
        prc_id_url: null,
      },
      submit: {
        employee_id:
          this.$store.state.users.user.personal_informations.employee_id,
        license_no: null,
        license_name: null,
        new_expiration_date: null,
        current_expiration_date: null,
        attach_prc_id: null,
      },
    };
  },
  beforeMount: function () {
    this.setDetails();
  },
  mounted: function () {
    $q = useQuasar();
  },
  methods: {
    ...mapActions(["getUser"]),
    onRejected: function (rejectedFiles) {
      const errorsMap = {
        accept: "(.jpg or .jpeg or .pdf) file is only allowed.",
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
    refresh: function () {
      helperMethods.refreshPage();
    },
    redirect: function () {
      helperMethods.refreshPage();
    },
    createCookie: function (newValue) {
      let numberOfDays = 1;
      let expires = helperMethods.addDays(
        helperMethods.getDateTimeToday(),
        numberOfDays
      );
      if (newValue != undefined) {
        helperMethods.createCookie(
          "exposed_license_indexes",
          newValue,
          expires
        );
      }
    },
    setDetails: function () {
      let index = helperMethods.getCookie("not_exposed_notification_index");
      helperMethods.deleteCookie("not_exposed_notification_index");

      if (helperMethods.getCookie("exposed_license_indexes") === undefined) {
        this.createCookie(index);
      } else {
        let indexes = helperMethods.getCookie("exposed_license_indexes");
        helperMethods.deleteCookie("exposed_license_indexes");
        if (indexes.includes(index.toString()) === false) {
          indexes = indexes + " " + index;
        }
        this.createCookie(indexes);
      }

      this.submit.license_name =
        this.$store.state.users.user.licenses[index].license_name;
      this.submit.license_no =
        this.$store.state.users.user.licenses[index].license_no;
      this.submit.current_expiration_date =
        this.$store.state.users.user.licenses[index].expiration_date;
      this.view.remaining_days = helperMethods.daysBetweenTwoDates(
        this.submit.current_expiration_date,
        helperMethods.getDateToday()
      );

      this.view.string_old_expiration_date =
        helperMethods.convertToReadableFormatDate(
          this.submit.current_expiration_date
        );

      this.view.prc_id_url = this.$store.state.users.user.licenses[index].url;

    },
    onSubmit: async function (data) {
      try {
        document.getElementById("btnSubmit").disabled = true;

         const obj = {
         employee_id: data.employee_id,
        license_no: data.license_no,
        license_name: data.license_name,
        new_expiration_date: data.new_expiration_date,
        current_expiration_date: data.current_expiration_date,
        attach_prc_id: data.attach_prc_id.name,
        };

        let response = await LicenseService.createRequest(obj);

        if (data.attach_prc_id !== null) {
          const formData = new FormData();
          formData.append("request_id", response.data);
          formData.append("request_type", data.current_expiration_date === "1900-01-01T00:00:00.000Z" ? "create" : "edit");
          formData.append("attach_file", "prc_id");
          formData.append("employee_id", data.employee_id);
          formData.append(this.submit.license_name.trim(), data.attach_prc_id);
          await UploadService.index(formData);
        }

        await this.getUser();
        helperMethods.createCookie("notify_message", "Successfully submitted.");
        helperMethods.createCookie("notify_type", "positive");
        this.redirect();
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
