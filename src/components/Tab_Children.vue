<template>
  <div class="q-pa-md">
    <div class="row justify-center" style="margin-bottom: 12px">
      <q-btn
        color="primary"
        label="EDIT"
        icon="edit"
        type="button"
        style="margin-right: 10px"
        @click="this.showDialogEdit()"
        v-if="
          this.$store.state.users.user.family_backgrounds.children.length > 0
        "
      ></q-btn>
      <q-btn
        color="positive"
        label="CREATE"
        icon="add"
        type="button"
        @click="this.showDialogCreate()"
      ></q-btn>
    </div>

    <div
      class="borderStyle"
      v-for="child in this.$store.state.users.user.family_backgrounds.children"
      :key="child.full_name"
    >
      <div v-for="(value, property) in child" :key="property">
        <div v-if="value !== ''">
          <div class="row marginTopBottom20px" v-if="property !== 'family_id'">
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
                <span v-if="value !== '' && property === 'birth_certificate'">
                  <a :href="value" target="_blank" style="color: #1681ec"
                    >CLICK HERE</a
                  >
                </span>
                <span v-else style="font-weight: normal">
                  {{ formatted(property, value) }}
                </span>
              </q-item-label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!---------------------------------------------------------------------- EDIT ---------------------------------------------------------------------->
  <q-dialog
    v-model="dialogEdit"
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
          id="frmChildren"
          method="post"
          @submit.prevent="onSubmit(this.submit.edit.children)"
          @reset="onReset()"
          autocomplete="off"
          ref="myForm"
        >
          <div
            class="borderStyle"
            v-for="(c, index) in submit.edit.children"
            :key="c.index"
            style="margin-bottom: 50px"
          >
            <div class="row bg-white">
              <div
                class="col-lg-12 col-md-12 col-sm-12 col-12"
                v-for="(value, property) in c"
                :key="property"
              >
                <q-input
                  v-if="property === 'full_name'"
                  class="marginLeftAndRight"
                  type="text"
                  label="Full Name"
                  maxlength="80"
                  v-model="this.submit.edit.children[index].full_name"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'This field is required',
                  ]"
                >
                </q-input>
                <q-input
                  v-else-if="property === 'birth_date'"
                  class="marginLeftAndRight"
                  type="date"
                  label="Birth Date"
                  v-model="this.submit.edit.children[index].birth_date"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'This field is required',
                  ]"
                >
                </q-input>
                <q-input
                  v-else-if="property === 'occupation'"
                  class="marginLeftAndRight"
                  type="text"
                  label="Occupation"
                  maxlength="60"
                  v-model="this.submit.edit.children[index].occupation"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'This field is required',
                  ]"
                >
                </q-input>
                <q-input
                  v-else-if="property === 'school_name_or_company_name'"
                  class="marginLeftAndRight"
                  type="text"
                  label="School Name or Company Name"
                  maxlength="150"
                  v-model="
                    this.submit.edit.children[index].school_name_or_company_name
                  "
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'This field is required',
                  ]"
                >
                </q-input>

                <q-file
                  v-else-if="
                    property === 'attach_birth_certificate' &&
                    this.submit.edit.children[index].has_birth_certificate ===
                      false
                  "
                  accept=".pdf"
                  clearable
                  v-model="
                    this.submit.edit.children[index].attach_birth_certificate
                  "
                  label="Attach - Birth Certificate"
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
          </div>
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
                    @click="this.hideDialogEdit()"
                  ></q-btn>
                </div>
              </div>
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
  <!---------------------------------------------------------------------- EDIT ---------------------------------------------------------------------->

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
        <q-table
          separator="cell"
          flat
          bordered
          title=""
          :rows="this.submit.create.children"
          :columns="this.submit.tableColumns"
          row-key="full_name"
          v-model:selected="this.submit.create.children"
          virtual-scroll
          :rows-per-page-options="[0]"
          style="cursor: pointer"
        />
        <div v-if="submit.create.children.length > 0">
          <q-btn
            class="full-width"
            color="primary"
            label="SUBMIT"
            type="button"
            id="btnSubmit"
            @click="onSubmit(this.submit.create.children)"
          ></q-btn>
        </div>
        <br />
        <br />

        <q-form
          id="frmChildrenCreate"
          method="post"
          @submit="this.onAdd(this.submit.model)"
          autocomplete="off"
        >
          <div class="row bg-white">
            <div class="col-lg-12 col-md-12 col-sm-12 col-12">
              <q-input
                class="marginLeftAndRight"
                type="text"
                label="Full Name"
                maxlength="80"
                v-model="this.submit.model.full_name"
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
                v-model="this.submit.model.birth_date"
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
                v-model="this.submit.model.occupation"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'This field is required',
                ]"
              >
              </q-input>
              <q-input
                class="marginLeftAndRight"
                type="text"
                label="School Name or Company Name"
                maxlength="150"
                v-model="this.submit.model.school_name_or_company_name"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'This field is required',
                ]"
              >
              </q-input>
              <q-file
                accept=".pdf"
                clearable
                v-model="this.submit.model.attach_birth_certificate"
                label="Attach - Birth Certificate"
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
              <br />
            </div>
          </div>
          <div class="row" style="margin-bottom: 14px">
            <q-btn
              class="full-width"
              color="primary"
              label="ADD"
              id="btnAdd"
              type="submit"
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
  name: "Tab_Children",
  data: function () {
    return {
      dialogEdit: false,
      dialogCreate: false,
      submit: {
        tableColumns: [
          {
            name: "fullName",
            required: true,
            label: "Full Name",
            align: "center",
            field: (row) => row.full_name,
            format: (val) => `${val}`,
            sortable: true,
          },
          {
            name: "birthDate",
            required: true,
            label: "Birth Date",
            align: "center",
            field: (row) => row.birth_date,
            format: (val) => `${val}`,
            sortable: true,
          },
          {
            name: "occupation",
            required: true,
            label: "Occupation",
            align: "center",
            field: (row) => row.occupation,
            format: (val) => `${val}`,
            sortable: true,
          },
          {
            name: "schoolNameOrCompanyName",
            required: true,
            label: "School Name Or Company Name",
            align: "center",
            field: (row) => row.school_name_or_company_name,
            format: (val) => `${val}`,
            sortable: true,
          },
          {
            name: "attachBirthCertificate",
            required: true,
            label: "Attach - Birth Certificate",
            align: "center",
            field: (row) => row.attach_birth_certificate.name,
            format: (val) => `${val}`,
            sortable: true,
          },
        ],
        model: this.getDefaultModel(),
        create: {
          children: [],
        },
        edit: {
          children: [],
        },
      },
    };
  },
  mounted: function () {
    $q = useQuasar();
  },
  created: function () {
    this.setChildren();
  },
  methods: {
    ...mapActions(["getUser"]),
    showDialogEdit: function () {
      this.dialogEdit = true;
    },
    hideDialogEdit: function () {
      this.dialogEdit = false;
      this.submit.edit.children = [];
      this.setChildren();
    },
    showDialogCreate: function () {
      this.dialogCreate = true;
    },
    hideDialogCreate: function () {
      this.dialogCreate = false;
      this.submit.create.children = [];
      this.submit.model = this.getDefaultModel();
    },
    getBirthDate: function (value) {
      return helperMethods.removeTime(helperMethods.correctDate(value));
    },
    getDefaultModel: function () {
      const value = {
        request_type: "create",
        family_type: "Child",
        employee_id:
          this.$store.state.users.user.personal_informations.employee_id,
        full_name: null,
        birth_date: null,
        occupation: null,
        school_name_or_company_name: null,
        attach_birth_certificate: null,
      };
      return value;
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
    setChildren: function () {
      for (let item of this.$store.state.users.user.family_backgrounds
        .children) {
        let value = {
          family_id: item.family_id,
          request_type: "edit",
          family_type: "Child",
          employee_id:
            this.$store.state.users.user.personal_informations.employee_id,
          full_name: item.full_name,
          birth_date: this.getBirthDate(item.birth_date),
          occupation: item.occupation,
          school_name_or_company_name: item.school_name_or_company_name,
          attach_birth_certificate: null,
          has_birth_certificate: item.birth_certificate === "" ? false : true,
        };

        this.submit.edit.children.push(value);
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
    onReset: function () {
      this.submit.model = this.getDefaultModel();
      document.getElementById("frmChildrenCreate").reset();
      $q.notify({
        type: "positive",
        message: "Successfully Added",
      });
    },
    onAdd: function (data) {
      document.getElementById("btnAdd").disabled = true;
      const value = {
        request_type: data.request_type,
        family_type: data.family_type,
        employee_id: data.employee_id,
        full_name: data.full_name,
        birth_date: data.birth_date,
        occupation: data.occupation,
        school_name_or_company_name: data.school_name_or_company_name,
        attach_birth_certificate: data.attach_birth_certificate,
      };
      this.submit.create.children.push(value);
      this.onReset();
      document.getElementById("btnAdd").disabled = false;
    },
    onSubmit: async function (data) {
      try {
        document.getElementById("btnSubmit").disabled = true;

        let array = [];

        for (let i = 0; i < data.length; i++) {
          let currentObject = data[i];
          let newObj = {
            request_type: currentObject.request_type,
            family_type: currentObject.family_type,
            employee_id: currentObject.employee_id,
            full_name: currentObject.full_name,
            birth_date: currentObject.birth_date,
            occupation: currentObject.occupation,
            school_name_or_company_name:
              currentObject.school_name_or_company_name,
            attach_birth_certificate:
              currentObject.attach_birth_certificate === null
                ? ""
                : currentObject.attach_birth_certificate.name,
          };

          if (currentObject.request_type === "edit") {
            newObj.family_id = currentObject.family_id;
          }

          array.push(newObj);
        }

        let response = await FamilyBackgroundService.createRequest(array);

        for (let i = 0; i < data.length; i++) {
          let currentObject = data[i];
          if (currentObject.attach_birth_certificate !== null) {
            const formData = new FormData();
            formData.append("request_id", response.data);
            formData.append("request_type", "create");
            formData.append("attach_file", "birth_certificate");
            formData.append("employee_id", currentObject.employee_id);
            formData.append(
              currentObject.full_name,
              currentObject.attach_birth_certificate
            );
            await UploadService.index(formData);
          }
        }

        await this.getUser();
        $q.notify({
          type: "positive",
          message: "Successfully submitted.",
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