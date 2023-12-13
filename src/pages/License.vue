<template>
  <q-pull-to-refresh @refresh="this.refresh()">
    <q-item-section avatar class="items-center" style="margin: 0 10px">
      <h4 class="text-center">
        <q-icon name="newspaper" />
        License
      </h4>
    </q-item-section>

    <div class="q-pa-md">
      <div class="q-gutter-y-md">
        <q-card>
          <q-tabs
            v-model="tab"
            dense
            class="bg-grey-2 text-grey-7"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
          >
            <q-tab
              name="view"
              :label="
                'TOTAL RECORDS (' +
                this.$store.state.users.user.licenses.length +
                ')'
              "
            />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="view">
              <div
                v-for="(obj, index) in this.licenses"
                :key="obj.license_name"
              >
                <div class="borderStyle">
                  <div class="row justify-center">
                    <h6
                      style="margin: 20px 50px"
                      v-if="getRemainingDays(obj.expiration_date) === 0"
                    >
                      Today is your last day to submit a request to update your
                      license before it expires. Please update it.
                    </h6>
                    <h6
                      style="margin: 20px 50px"
                      v-else-if="getRemainingDays(obj.expiration_date) > 0"
                    >
                      You have {{ getRemainingDays(obj.expiration_date) }}
                      {{
                        getRemainingDays(obj.expiration_date) == 1
                          ? "day"
                          : "days"
                      }}, before your license will expire.
                    </h6>

                    <h6
                      style="margin: 20px 50px"
                      v-else-if="
                        getRemainingDays(obj.expiration_date) < 0 &&
                        obj.expiration_date !== '1900-01-01T00:00:00.000Z'
                      "
                    >
                      This license is already expired. Please update it.
                    </h6>
                  </div>

                  <div v-for="(value, property) in obj" :key="property">
                    <div
                      class="row"
                      v-if="
                        value !== '1900-01-01T00:00:00.000Z' &&
                        value !== '1899-12-31T15:54:17.000Z'
                      "
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
                          <span v-if="property === 'prc_id'">
                            <a
                              :href="value"
                              target="_blank"
                              style="color: #1681ec"
                              >CLICK HERE</a
                            >
                          </span>
                          <span v-else>
                            {{ formatted(property, value) }}
                          </span>
                        </q-item-label>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row" style="margin-bottom: 30px">
                  <q-btn
                    class="full-width"
                    color="primary"
                    label="UPDATE LICENSE EXPIRATION DATE"
                    type="button"
                    @click="createCookieAndRedirect(index)"
                  ></q-btn>
                </div>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </q-pull-to-refresh>
</template>

<script>
// -------------------- Notify plugins --------------------
import { useQuasar } from "quasar";
let $q;
// -------------------- Notify plugins --------------------
import { defineComponent } from "vue";
import helperMethods from "../helperMethods.js";

export default defineComponent({
  name: "License",
  data: function () {
    return {
      tab: "view",
      licenses: [],
    };
  },
  created: function () {
    this.getLicenses();
  },
  methods: {
    getLicenses: function () {
      try {
        for (let item of this.$store.state.users.user.licenses) {
          let value = {
            license_name: item.license_name,
            license_no: item.license_no,
            rate: item.rate,
            year_taken: item.year_taken,
            expiration_date: item.expiration_date,
            date_time_updated: item.date_time_updated,
          };

          if (
            item.expiration_date !== "1900-01-01T00:00:00.000Z" &&
            item.date_time_updated !== "1899-12-31T15:54:17.000Z"
          ) {
            value.prc_id = item.url;
          }

          this.licenses.push(value);
        }
      } catch (error) {
        let withRefresh = false;
        helperMethods.showErrorMessage(error, withRefresh);
      }
    },
    refresh: function () {
      helperMethods.refreshPage();
    },
    createCookieAndRedirect: function (index) {
      try {
        helperMethods.createCookie("not_exposed_notification_index", index);
        this.$router.push("/update-license-expiration-date");
      } catch (error) {
        let withRefresh = false;
        helperMethods.showErrorMessage(error, withRefresh);
      }
    },
    getRemainingDays: function (expirationDate) {
      try {
        return helperMethods.daysBetweenTwoDates(
          expirationDate,
          helperMethods.getDateToday()
        );
      } catch (error) {
        let withRefresh = false;
        helperMethods.showErrorMessage(error, withRefresh);
      }
    },
    formatted: function (columnName, columnValue) {
      try {
        if (columnName === "expiration_date") {
          return helperMethods.convertToReadableFormatDate(columnValue);
        } else if (columnName === "date_time_updated") {
          return helperMethods.convertToReadableFormatDateTime(columnValue);
        } else {
          return columnValue;
        }
      } catch (error) {
        let withRefresh = false;
        helperMethods.showErrorMessage(error, withRefresh);
      }
    },
    convertToReadableFormatDate: function (value) {
      try {
        return helperMethods.convertToReadableFormatDate(value);
      } catch (error) {
        let withRefresh = false;
        helperMethods.showErrorMessage(error, withRefresh);
      }
    },
  },
});
</script>
