<template>
  <!---------------------------------------------------------------- COMPLY DIALOG FOR PENDING ---------------------------------------------------------------->
  <q-dialog
    persistent
    :maximized="true"
    transition-show="slide-up"
    transition-hide="slide-down"
    ref="dialogComply"
    @hide="this.hideComplyDialog()"
  >
    <q-card class="q-dialog-plugin">
      <q-card-section>
        <div class="text-h6 text-primary">COMPLY</div>
      </q-card-section>
      <q-form
        method="post"
        @submit.prevent="this.submitComply()"
        autocomplete="off"
      >
        <div class="col-lg-6 col-md-12 col-sm-12 col-12">
          <q-select
            v-if="this.comply.view.field_name === 'CIVIL STATUS'"
            style="margin: 10px"
            v-model="comply.submit.value"
            :options="comply.view.options"
            label="Civil Status"
            emit-value
            map-options
            option-value="civil_status_id"
            option-label="civil_status_name"
            lazy-rules
            :rules="[
              (val) => val !== null || 'This field is required',
              (val) => val !== 0 || 'This field is required',
            ]"
          />
          <q-select
            v-else-if="this.comply.view.field_name === 'RELIGION'"
            style="margin: 10px"
            v-model="comply.submit.value"
            :options="comply.view.options"
            label="Religion"
            emit-value
            map-options
            option-value="religion_id"
            option-label="religion_name"
            lazy-rules
            :rules="[
              (val) => val !== null || 'This field is required',
              (val) => val !== 0 || 'This field is required',
            ]"
          />
          <q-input
            v-else-if="this.comply.view.field_name === 'BIRTH DATE'"
            style="margin: 10px"
            type="date"
            label="Birth Date"
            v-model="comply.submit.value"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'This field is required',
            ]"
          >
          </q-input>
          <q-input
            v-else-if="this.comply.view.field_name === 'MARRIAGE DATE'"
            style="margin: 10px"
            type="date"
            label="Marriage Date"
            v-model="comply.submit.value"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'This field is required',
            ]"
          >
          </q-input>
          <q-file
            v-else-if="this.comply.view.field_name === 'MARRIAGE CERTIFICATE'"
            style="margin: 10px 10px"
            accept=".pdf"
            clearable
            v-model="comply.submit.value"
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
          <q-file
            v-else-if="this.comply.view.field_name === 'BIRTH CERTIFICATE'"
            style="margin: 10px 10px"
            accept=".pdf"
            clearable
            v-model="comply.submit.value"
            :label="(this.comply.file_name === undefined) ? 'Attach - Birth Certificate' : 'Attach - Birth Certificate for ' + this.comply.file_name"
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
            v-else-if="this.comply.view.field_name === 'PRC ID'"
            style="margin: 10px 10px"
            accept=".pdf"
            clearable
            v-model="comply.submit.value"
            label="Attach - PRC ID "
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
            v-else-if="this.comply.view.field_name === 'TOR'"
            style="margin: 10px 10px"
            accept=".pdf"
            clearable
            v-model="comply.submit.value"
            label="Attach - TOR "
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
            v-else-if="this.comply.view.field_name === 'DIPLOMA'"
            style="margin: 10px 10px"
            accept=".pdf"
            clearable
            v-model="comply.submit.value"
            label="Attach - Diploma "
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
            v-else-if="this.comply.view.field_name === 'TRAINING OR SEMINAR CERTIFICATE'"
            style="margin: 10px 10px"
            accept=".pdf"
            clearable
            v-model="comply.submit.value"
           :label="(this.comply.file_name === undefined) ? 'Attach - Training or Seminar Certificate' : 'Attach - Training or Seminar Certificate for ' + this.comply.file_name"
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
            v-else
            style="margin: 10px"
            filled
            autogrow
            v-model="comply.submit.value"
            :label="comply.view.field_name"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'This field is required',
            ]"
          >
          </q-input>
        </div>

        <q-card-actions align="center">
          <q-btn color="primary" label="SUBMIT" type="submit" id="btnSubmit" />
          <q-btn
            color="negative"
            label="CANCEL"
            type="button"
            id="btnCancel"
            @click="this.hideComplyDialog()"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
  <!---------------------------------------------------------------- COMPLY DIALOG FOR PENDING ---------------------------------------------------------------->

  <!---------------------------------------------------------------- PENDING DETAILS DIALOG ---------------------------------------------------------------->
  <q-dialog
    persistent
    :maximized="true"
    transition-show="slide-up"
    transition-hide="slide-down"
    ref="dialogPendingDetails"
    @hide="this.hidePendingDetailsDialog()"
  >
    <q-card class="q-dialog-plugin">
      <q-card-actions align="right">
        <q-btn
          color="negative"
          label="CLOSE"
          @click="this.hidePendingDetailsDialog()"
        />
      </q-card-actions>
      <div class="q-card__section q-card__section--vert q-dialog__message">
        <span style="font-weight: bold">
          Request ID : {{ this.latest_selected_request_id }}
        </span>
        <br />
        <span v-html="description"></span>
        <div v-if="are_siblings_or_children === false">
          <q-table
            separator="cell"
            flat
            bordered
            title=""
            :rows="pending.details.rows"
            :columns="
              request_type === 'edit'
                ? pending.details.edit.columns
                : pending.details.create.columns
            "
            row-key="id"
            :rows-per-page-options="[0]"
            style="cursor: pointer"
          >
            <template v-slot:body="props">
              <q-tr>
                <q-td key="columnName" :props="props" style="width: 20%">
                  {{ props.row.column_name }}
                </q-td>

                <q-td key="from" :props="props" v-if="request_type === 'edit'">
                  <div v-if="props.row.from === null">
                    <span style="color: red">NO PREVIOUS DATA</span>
                  </div>
                  <div v-else-if="props.row.column_name === 'PRC ID'">
                    <a
                      :href="
                        this.url_prc_id +
                        this.latest_selected_request_id +
                        '&statusID=0&folder=from'
                      "
                      target="_blank"
                      style="color: #1681ec"
                      >CLICK HERE</a
                    >
                  </div>
                  <div
                    v-else-if="props.row.column_name === 'MARRIAGE CERTIFICATE'"
                  >
                    <a
                      :href="
                        this.url_marriage_certificate +
                        this.latest_selected_request_id +
                        '&statusID=0&folder=from'
                      "
                      target="_blank"
                      style="color: #1681ec"
                      >CLICK HERE</a
                    >
                  </div>
                  <div v-else>
                    {{ props.row.from }}
                  </div>
                </q-td>

                <q-td key="to" :props="props" v-if="request_type === 'edit'">
                  <div v-if="props.row.column_name === 'PRC ID'">
                    <a
                      :href="
                        this.url_prc_id +
                        this.latest_selected_request_id +
                        '&statusID=0&folder=' +
                        (props.row.from === null ? 'value' : 'to')
                      "
                      target="_blank"
                      style="color: #1681ec"
                      >CLICK HERE</a
                    >
                  </div>
                  <div
                    v-else-if="props.row.column_name === 'MARRIAGE CERTIFICATE'"
                  >
                    <a
                      :href="
                        this.url_marriage_certificate +
                        this.latest_selected_request_id +
                        '&statusID=0&folder=' +
                        (props.row.from === null ? 'value' : 'to')
                      "
                      target="_blank"
                      style="color: #1681ec"
                      >CLICK HERE</a
                    >
                  </div>
                  <div
                    v-else-if="props.row.column_name === 'BIRTH CERTIFICATE'"
                  >
                    <a
                      :href="
                        this.url_birth_certificate +
                        this.latest_selected_request_id +
                        '&statusID=0&folder=value&fileName=' +
                        props.row.to.trim()
                      "
                      target="_blank"
                      style="color: #1681ec"
                      >CLICK HERE</a
                    >
                  </div>
                  <div v-else>
                    {{ props.row.to }}
                  </div>
                </q-td>

                <q-td
                  key="value"
                  :props="props"
                  v-if="request_type === 'create'"
                >
                  <div v-if="props.row.column_name === 'MARRIAGE CERTIFICATE'">
                    <a
                      :href="
                        this.url_marriage_certificate +
                        this.latest_selected_request_id +
                        '&statusID=0&folder=value'
                      "
                      target="_blank"
                      style="color: #1681ec"
                      >CLICK HERE</a
                    >
                  </div>
                  <div
                    v-else-if="props.row.column_name === 'BIRTH CERTIFICATE'"
                  >
                    <a
                      :href="
                        this.url_birth_certificate +
                        this.latest_selected_request_id +
                        '&statusID=0&folder=value&fileName=' +
                        props.row.value.trim()
                      "
                      target="_blank"
                      style="color: #1681ec"
                      >CLICK HERE</a
                    >
                  </div>
                  <div
                    v-else-if="
                      (props.row.column_name === 'TOR' ||
                      props.row.column_name === 'DIPLOMA')
                      && (
                      props.row.value === 'tor.pdf' ||
                      props.row.value === 'diploma.pdf'
                      )
                    "
                  >
                    <a
                      :href="
                        this.url_tor_or_diploma +
                        this.latest_selected_request_id +
                        '&statusID=0&folder=value&document=' +
                        props.row.column_name.trim().toLowerCase()
                      "
                      target="_blank"
                      style="color: #1681ec"
                      >CLICK HERE</a
                    >
                  </div>
                  <div
                    v-else-if="props.row.column_name === 'TRAINING OR SEMINAR CERTIFICATE'"
                  >
                    <a
                      :href="
                        this.url_training_or_seminar_certificate +
                        this.latest_selected_request_id +
                       '&statusID=0&folder=value'
                      "
                      target="_blank"
                      style="color: #1681ec"
                      >CLICK HERE</a
                    >
                  </div>
                  <div v-else>
                    {{ props.row.value }}
                  </div>
                </q-td>

                <q-td key="hrRemarks" :props="props">
                  {{ props.row.hr_remarks }}
                </q-td>

                <q-td key="remarksBy" :props="props">
                  {{ props.row.remarks_by }}
                </q-td>

                <q-td key="dateTimeRemarks" :props="props">
                  <span v-if="props.row.date_time_remarks !== null">
                    {{
                      convertToReadableFormatDateTime(
                        props.row.date_time_remarks
                      )
                    }}
                  </span>
                </q-td>

                <q-td key="action" :props="props">
                  <span
                    v-if="
                      props.row.hr_remarks !== null &&
                      props.row.is_complied === false
                    "
                  >
                    <q-btn
                      color="primary"
                      label="COMPLY"
                      type="button"
                      @click="
                        this.showComplyDialog(
                          props.row.id,
                          props.row.column_name,
                          props.row.column_name === 'TRAINING OR SEMINAR CERTIFICATE'? props.row.value.replaceAll('.pdf', '') : ''
                        )
                      "
                    ></q-btn>
                  </span>
                  <span
                    v-else-if="
                      props.row.hr_remarks !== null &&
                      props.row.is_complied === true
                    "
                    style="color: green"
                  >
                    COMPLIED
                  </span>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
        <div v-else>
          <div
            v-for="item in this.pending.details.rows"
            :key="item.sibling_or_child_full_name"
          >
            <br />
            <b>{{ item.sibling_or_child_full_name }}</b>
            <q-table
              separator="cell"
              flat
              bordered
              title=""
              :rows="item.table_rows"
              :columns="
                request_type === 'edit'
                  ? pending.details.edit.columns
                  : pending.details.create.columns
              "
              row-key="id"
              :rows-per-page-options="[0]"
              style="cursor: pointer"
            >
              <template v-slot:body="props">
                <q-tr>
                  <q-td key="columnName" :props="props" style="width: 20%">
                    {{ props.row.column_name }}
                  </q-td>

                  <q-td
                    key="from"
                    :props="props"
                    v-if="request_type === 'edit'"
                  >
                    <div v-if="props.row.from === null">
                      <span style="color: red">NO PREVIOUS DATA</span>
                    </div>
                    <div v-else>
                      {{ props.row.from }}
                    </div>
                  </q-td>

                  <q-td key="to" :props="props" v-if="request_type === 'edit'">
                    <div
                      v-if="props.row.column_name === 'BIRTH CERTIFICATE'"
                    >
                      <a
                        :href="
                          this.url_birth_certificate +
                          this.latest_selected_request_id +
                          '&statusID=0&folder=value&fileName=' +
                          props.row.to.trim()
                        "
                        target="_blank"
                        style="color: #1681ec"
                        >CLICK HERE</a
                      >
                    </div>
                    <div v-else>
                      {{ props.row.to }}
                    </div>
                  </q-td>

                  <q-td
                    key="value"
                    :props="props"
                    v-if="request_type === 'create'"
                  >
                    <div
                      v-if="props.row.column_name === 'BIRTH CERTIFICATE'"
                    >
                      <a
                        :href="
                          this.url_birth_certificate +
                          this.latest_selected_request_id +
                          '&statusID=0&folder=value&fileName=' +
                          props.row.value.trim()
                        "
                        target="_blank"
                        style="color: #1681ec"
                        >CLICK HERE</a
                      >
                    </div>
                    <div v-else>
                      {{ props.row.value }}
                    </div>
                  </q-td>

                  <q-td key="hrRemarks" :props="props">
                    {{ props.row.hr_remarks }}
                  </q-td>

                  <q-td key="remarksBy" :props="props">
                    {{ props.row.remarks_by }}
                  </q-td>

                  <q-td key="dateTimeRemarks" :props="props">
                    <span v-if="props.row.date_time_remarks !== null">
                      {{
                        convertToReadableFormatDateTime(
                          props.row.date_time_remarks
                        )
                      }}
                    </span>
                  </q-td>

                  <q-td key="action" :props="props">
                    <span
                      v-if="
                        props.row.hr_remarks !== null &&
                        props.row.is_complied === false
                      "
                    >
                      <q-btn
                        color="primary"
                        label="COMPLY"
                        type="button"
                        @click="
                          this.showComplyDialog(
                            props.row.id,
                            props.row.column_name,
                            (item.sibling_or_child_full_name === undefined ? props.row.value.replace('.pdf', '') : item.sibling_or_child_full_name)
                          )
                        "
                      ></q-btn>
                    </span>
                    <span
                      v-else-if="
                        props.row.hr_remarks !== null &&
                        props.row.is_complied === true
                      "
                      style="color: green"
                    >
                      COMPLIED
                    </span>
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </div>
        </div>
      </div>
    </q-card>
  </q-dialog>
  <!---------------------------------------------------------------- PENDING DETAILS DIALOG ---------------------------------------------------------------->

  <!---------------------------------------------------------------- APPROVED DETAILS DIALOG ---------------------------------------------------------------->
  <q-dialog
    persistent
    :maximized="true"
    transition-show="slide-up"
    transition-hide="slide-down"
    ref="dialogApprovedDetails"
    @hide="this.hideApprovedDetailsDialog()"
  >
    <q-card class="q-dialog-plugin">
      <q-card-actions align="right">
        <q-btn
          color="negative"
          label="CLOSE"
          @click="this.hideApprovedDetailsDialog()"
        />
      </q-card-actions>
      <div class="q-card__section q-card__section--vert q-dialog__message">
        <span style="font-weight: bold">
          Request ID : {{ this.latest_selected_request_id }}
        </span>
        <br />
        <span v-html="description"></span>

        <div v-if="are_siblings_or_children === false">
          <q-table
            separator="cell"
            flat
            bordered
            title=""
            :rows="approved.details.rows"
            :columns="
              request_type === 'edit'
                ? approved.details.edit.columns
                : approved.details.create.columns
            "
            row-key="id"
            :rows-per-page-options="[0]"
            style="cursor: pointer"
          >
            <template v-slot:body="props">
              <q-tr>
                <q-td key="dateTimeApproved" :props="props">
                  {{
                    convertToReadableFormatDateTime(
                      props.row.date_time_approved
                    )
                  }}
                </q-td>
                <q-td key="approvedBy" :props="props">
                  {{ props.row.approved_by }}
                </q-td>
                <q-td key="columnName" :props="props">
                  {{ props.row.column_name }}
                </q-td>

                <q-td key="from" :props="props" v-if="request_type === 'edit'">
                  <div v-if="props.row.from === null">
                    <span style="color: red">NO PREVIOUS DATA</span>
                  </div>
                  <div v-else-if="props.row.column_name === 'PRC ID'">
                    <a
                      :href="
                        this.url_prc_id +
                        this.latest_selected_request_id +
                        '&statusID=1&folder=from'
                      "
                      target="_blank"
                      style="color: #1681ec"
                      >CLICK HERE</a
                    >
                  </div>
                  <div
                    v-else-if="props.row.column_name === 'MARRIAGE CERTIFICATE'"
                  >
                    <a
                      :href="
                        this.url_marriage_certificate +
                        this.latest_selected_request_id +
                        '&statusID=1&folder=from'
                      "
                      target="_blank"
                      style="color: #1681ec"
                      >CLICK HERE</a
                    >
                  </div>
                  <div v-else>
                    {{ props.row.from }}
                  </div>
                </q-td>

                <q-td key="to" :props="props" v-if="request_type === 'edit'">
                  <div v-if="props.row.column_name === 'PRC ID'">
                    <a
                      :href="
                        this.url_prc_id +
                        this.latest_selected_request_id +
                        '&statusID=1&folder=' +
                        (props.row.from === null ? 'value' : 'to')
                      "
                      target="_blank"
                      style="color: #1681ec"
                      >CLICK HERE</a
                    >
                  </div>
                  <div
                    v-else-if="props.row.column_name === 'MARRIAGE CERTIFICATE'"
                  >
                    <a
                      :href="
                        this.url_marriage_certificate +
                        this.latest_selected_request_id +
                        '&statusID=1&folder=' +
                        (props.row.from === null ? 'value' : 'to')
                      "
                      target="_blank"
                      style="color: #1681ec"
                      >CLICK HERE</a
                    >
                  </div>
                  <div
                    v-else-if="props.row.column_name === 'BIRTH CERTIFICATE'"
                  >
                    <a
                      :href="
                        this.url_birth_certificate +
                        this.latest_selected_request_id +
                        '&statusID=1&folder=value&fileName=' +
                        props.row.to.trim()
                      "
                      target="_blank"
                      style="color: #1681ec"
                      >CLICK HERE</a
                    >
                  </div>
                  <div v-else>
                    {{ props.row.to }}
                  </div>
                </q-td>

                <q-td
                  key="value"
                  :props="props"
                  v-if="request_type === 'create'"
                >
                  <div v-if="props.row.column_name === 'MARRIAGE CERTIFICATE'">
                    <a
                      :href="
                        this.url_marriage_certificate +
                        this.latest_selected_request_id +
                        '&statusID=1&folder=value'
                      "
                      target="_blank"
                      style="color: #1681ec"
                      >CLICK HERE</a
                    >
                  </div>
                  <div
                    v-else-if="props.row.column_name === 'BIRTH CERTIFICATE'"
                  >
                    <a
                      :href="
                        this.url_birth_certificate +
                        this.latest_selected_request_id +
                        '&statusID=1&folder=value&fileName=' +
                        props.row.value.trim()
                      "
                      target="_blank"
                      style="color: #1681ec"
                      >CLICK HERE</a
                    >
                  </div>
                  <div
                    v-else-if="
                      (props.row.column_name === 'TOR' ||
                      props.row.column_name === 'DIPLOMA')
                      && (
                      props.row.value === 'tor.pdf' ||
                      props.row.value === 'diploma.pdf'
                      )
                    "
                  >
                    <a
                      :href="
                        this.url_tor_or_diploma +
                        this.latest_selected_request_id +
                        '&statusID=1&folder=value&document=' +
                        props.row.column_name.trim().toLowerCase()
                      "
                      target="_blank"
                      style="color: #1681ec"
                      >CLICK HERE</a
                    >
                  </div>
                  <div
                    v-else-if="props.row.column_name === 'TRAINING OR SEMINAR CERTIFICATE'"
                  >
                    <a
                      :href="
                        this.url_training_or_seminar_certificate +
                        this.latest_selected_request_id +
                       '&statusID=1&folder=value'
                      "
                      target="_blank"
                      style="color: #1681ec"
                      >CLICK HERE</a
                    >
                  </div>
                  <div v-else>
                    {{ props.row.value }}
                  </div>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
        <div v-else>
          <div
            v-for="item in this.approved.details.rows"
            :key="item.sibling_or_child_full_name"
          >
            <br />
            <b>{{ item.sibling_or_child_full_name }}</b>
            <q-table
              separator="cell"
              flat
              bordered
              title=""
              :rows="item.table_rows"
              :columns="
                request_type === 'edit'
                  ? approved.details.edit.columns
                  : approved.details.create.columns
              "
              row-key="id"
              :rows-per-page-options="[0]"
              style="cursor: pointer"
            >
              <template v-slot:body="props">
                <q-tr>
                  <q-td key="dateTimeApproved" :props="props">
                    {{
                      convertToReadableFormatDateTime(
                        props.row.date_time_approved
                      )
                    }}
                  </q-td>
                  <q-td key="approvedBy" :props="props">
                    {{ props.row.approved_by }}
                  </q-td>
                  <q-td key="columnName" :props="props">
                    {{ props.row.column_name }}
                  </q-td>

                  <q-td
                    key="from"
                    :props="props"
                    v-if="request_type === 'edit'"
                  >
                    <div v-if="props.row.from === null">
                      <span style="color: red">NO PREVIOUS DATA</span>
                    </div>
                    <div v-else>
                      {{ props.row.from }}
                    </div>
                  </q-td>

                  <q-td key="to" :props="props" v-if="request_type === 'edit'">
                    <div
                      v-if="props.row.column_name === 'BIRTH CERTIFICATE'"
                    >
                      <a
                        :href="
                          this.url_birth_certificate +
                          this.latest_selected_request_id +
                          '&statusID=1&folder=value&fileName=' +
                          props.row.to.trim()
                        "
                        target="_blank"
                        style="color: #1681ec"
                        >CLICK HERE</a
                      >
                    </div>
                    <div v-else>
                      {{ props.row.to }}
                    </div>
                  </q-td>

                  <q-td
                    key="value"
                    :props="props"
                    v-if="request_type === 'create'"
                  >
                    <div
                      v-if="props.row.column_name === 'BIRTH CERTIFICATE'"
                    >
                      <a
                        :href="
                          this.url_birth_certificate +
                          this.latest_selected_request_id +
                          '&statusID=1&folder=value&fileName=' +
                          props.row.value.trim()
                        "
                        target="_blank"
                        style="color: #1681ec"
                        >CLICK HERE</a
                      >
                    </div>
                    <div v-else>
                      {{ props.row.value }}
                    </div>
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </div>
        </div>
      </div>
    </q-card>
  </q-dialog>
  <!---------------------------------------------------------------- APPROVED DETAILS DIALOG ---------------------------------------------------------------->


  <q-pull-to-refresh @refresh="this.refresh()">
    <q-item-section avatar class="items-center" style="margin: 0 10px">
      <h4 class="text-center">
        <q-icon name="message" />
        My Request
      </h4>
    </q-item-section>

    <div class="q-pa-md">
      <div class="q-gutter-y-md">
        <q-card>
          <q-tabs
            v-model="this.tab"
            dense
            class="bg-grey-2 text-grey-7"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
            inline-label
            outside-arrows
            mobile-arrows
          >
            <q-tab
              name="pending"
              :label="
                'PENDING (' +
                this.$store.state.users.user.my_requests.pending.length +
                ')'
              "
            />
            <q-tab
              name="approved"
              :label="
                'APPROVED (' +
                this.$store.state.users.user.my_requests.approved.length +
                ')'
              "
            />
          </q-tabs>
          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="pending">

              <q-form
                class="q-gutter-md"
                method="post"
                @submit.prevent="onSearch"
                autocomplete="off"
              >
               <div class="row">
                  <q-item-label
                    >Pending Request : {{ this.pending.minimum_date_with_pending_request }}
                  </q-item-label>
                </div>
                <div class="row">
                  <div class="col-6 col-md-4" style="margin-right: 20px">
                    <q-input
                      type="date"
                      label="DATE FROM"
                      v-model="this.pending.search.date_from"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) || 'This field is required',
                        (val) =>
                          val <= this.pending.search.date_to ||
                          'DATE FROM MUST BE LOWER OR EQUAL TO DATE TO',
                      ]"
                    >
                    </q-input>
                  </div>
                  <div class="col-6 col-md-4">
                    <q-input
                      type="date"
                      label="DATE TO"
                      v-model="this.pending.search.date_to"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) || 'This field is required',
                        (val) =>
                          val >= this.pending.search.date_from ||
                          'DATE TO MUST BE GREATER OR EQUAL TO DATE FROM',
                      ]"
                    >
                    </q-input>
                  </div>
                  <div class="col-6 col-md-3">
                    <q-btn
                      style="margin: 20px"
                      id="btnSearch"
                      color="primary"
                      label="SEARCH"
                      icon="search"
                      type="submit"
                    ></q-btn>
                  </div>
                </div>
              </q-form>

              <q-table
                separator="cell"
                flat
                bordered
                title=""
                :rows="pending.header.rows"
                :columns="pending.header.columns"
                row-key="request_id"
                virtual-scroll
                :rows-per-page-options="[0]"
                style="cursor: pointer; height: 400px"
                class="my-sticky-header-table"
              >
                <template v-slot:body="props">
                  <q-tr
                    :props="props"
                    :class="[rowSelected(props.row), rowStyle(props.row)]"
                    @click="
                      showPendingDetailsDialog(
                        props.row.description,
                        props.row.request_id
                      )
                      "
                     style="height: auto;"
                  >
                    <q-td key="requestID" :props="props">
                      #{{ props.row.request_id }}
                    </q-td>

                    <q-td key="stats" :props="props">
                      {{ props.row.stats }}
                    </q-td>

                    <q-td key="requestedFields" :props="props" style="white-space: normal;">
                        {{ props.row.requested_fields }}
                    </q-td>

                    <q-td key="dateTimeCreated" :props="props">
                      {{
                        convertToReadableFormatDateTime(
                          props.row.date_time_created
                        )
                      }}
                    </q-td>
                  </q-tr>
                </template>
              </q-table>
            </q-tab-panel>

            <q-tab-panel name="approved">

              <q-form
                class="q-gutter-md"
                method="post"
                @submit.prevent="onSearch"
                autocomplete="off"
              >
                <div class="row">
                  <div class="col-6 col-md-4" style="margin-right: 20px">
                    <q-input
                      type="date"
                      label="DATE FROM"
                      v-model="this.approved.search.date_from"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) || 'This field is required',
                        (val) =>
                          val <= this.approved.search.date_to ||
                          'DATE FROM MUST BE LOWER OR EQUAL TO DATE TO',
                      ]"
                    >
                    </q-input>
                  </div>
                  <div class="col-6 col-md-4">
                    <q-input
                      type="date"
                      label="DATE TO"
                      v-model="this.approved.search.date_to"
                      lazy-rules
                      :rules="[
                        (val) =>
                          (val && val.length > 0) || 'This field is required',
                        (val) =>
                          val >= this.approved.search.date_from ||
                          'DATE TO MUST BE GREATER OR EQUAL TO DATE FROM',
                      ]"
                    >
                    </q-input>
                  </div>
                  <div class="col-6 col-md-3">
                    <q-btn
                      style="margin: 20px"
                      id="btnSearch"
                      color="primary"
                      label="SEARCH"
                      icon="search"
                      type="submit"
                    ></q-btn>
                  </div>
                </div>
              </q-form>

              <q-table
                separator="cell"
                flat
                bordered
                title=""
                :rows="approved.header.rows"
                :columns="approved.header.columns"
                row-key="request_id"
                virtual-scroll
                :rows-per-page-options="[0]"
                style="cursor: pointer; height: 400px"
                class="my-sticky-header-table"
              >
                <template v-slot:body="props">
                  <q-tr
                    :props="props"
                    :class="
                      props.row.request_id == latest_selected_request_id
                        ? 'bg-primary text-white'
                        : 'bg-white text-black'
                    "
                    @click="
                      showApprovedDetailsDialog(
                        props.row.description,
                        props.row.request_id
                      )
                    "
                    style="height: auto;"
                  >
                    <q-td key="requestID" :props="props">
                      #{{ props.row.request_id }}
                    </q-td>

                    <q-td key="stats" :props="props">
                      {{ props.row.stats }}
                    </q-td>

                    <q-td key="requestedFields" :props="props" style="white-space: normal;">
                        {{ props.row.requested_fields }}
                    </q-td>

                    <q-td key="dateTimeCreated" :props="props">
                      {{
                        convertToReadableFormatDateTime(
                          props.row.date_time_created
                        )
                      }}
                    </q-td>

                    <q-td key="createdBy" :props="props">
                      {{ props.row.created_by }}
                    </q-td>
                  </q-tr>
                </template>
              </q-table>
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

import { MyRequestService } from "src/services/MyRequestService";
import { PersonalInformationService } from "src/services/PersonalInformationService";
import { UploadService } from "src/services/UploadService.js";
import helperMethods from "src/helperMethods";
import { defineComponent } from "vue";
import { mapActions } from "vuex";

export default defineComponent({
  name: "MyRequest",
  mounted: function () {
    $q = useQuasar();
    let dateToday = helperMethods.getDateToday();
    let dateMinusDays = helperMethods.getDateMinusDays(7);
    this.pending.search.date_to = dateToday;
    this.pending.search.date_from = dateMinusDays;
    this.approved.search.date_to = dateToday;
    this.approved.search.date_from = dateMinusDays;
  },
  created: function () {
    setTimeout(() => {
      let value = $q.localStorage.getItem("needToOpen");
      if (value !== null) {
        const arrayOfString = value.split(";");
        let description = arrayOfString[0];
        let requestID = helperMethods.toNumber(arrayOfString[1]);
        this.showPendingDetailsDialog(description, requestID);
      }
    }, 2);
  },
  data: function () {
    return {
      url_marriage_certificate:
        process.env.BACKEND_REST_API_URL +
        "/api/uploads/get-marriage-certificate?token=" +
        this.$store.state.users.token +
        "&requestID=",
      url_prc_id:
        process.env.BACKEND_REST_API_URL +
        "/api/uploads/get-prc-id?token=" +
        this.$store.state.users.token +
        "&requestID=",
      url_tor_or_diploma:
        process.env.BACKEND_REST_API_URL +
        "/api/uploads/get-tor-or-diploma?token=" +
        this.$store.state.users.token +
        "&requestID=",
      url_birth_certificate:
        process.env.BACKEND_REST_API_URL +
        "/api/uploads/get-birth-certificate?token=" +
        this.$store.state.users.token +
        "&requestID=",
      url_training_or_seminar_certificate:
        process.env.BACKEND_REST_API_URL +
        "/api/uploads/get-training-or-seminar-certificate?token=" +
        this.$store.state.users.token +
        "&requestID=",
      request_type: null,
      are_siblings_or_children: false,
      latest_selected_request_id: 0,
      description: null,
      tab: "pending",
      comply: {
        file_name: null,
        view: {
          field_name: null,
          options: {
            religion: null,
            civil_status: null,
          },
        },
        submit: {
          request_details_id: 0,
          value: null,
        },
      },
      pending: {
        minimum_date_with_pending_request : (this.$store.state.users.user.my_requests.minimum_date_with_pending_request === '1900-01-01') ? '' : helperMethods.removeTime(helperMethods.correctDate(this.$store.state.users.user.my_requests.minimum_date_with_pending_request)),
        search: {
          date_from: null,
          date_to: null,
        },
        header: {
          columns: [
            {
              name: "requestID",
              required: true,
              label: "Request ID",
              align: "left",
              sortable: true,
              field: (row) => row.request_id,
            },
            {
              name: "stats",
              required: true,
              label: "",
              align: "left",
              sortable: true,
              field: (row) => row.stats,
            },
            {
              name: "requestedFields",
              required: true,
              label: "Requested Fields",
              align: "left",
              sortable: true,
              style: 'max-width: 200px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;', 
              field: (row) => row.requested_fields,
            },
            {
              name: "dateTimeCreated",
              required: true,
              label: "Date Time Created",
              align: "left",
              sortable: true,
              field: (row) => row.date_time_created,
            },
          ],
          rows: this.$store.state.users.user.my_requests.pending,
        },
        details: {
          edit: {
            columns: [
              {
                name: "columnName",
                required: true,
                label: "COLUMN NAME",
                align: "center",
                sortable: true,
                field: (row) => row.column_name,
              },
              {
                name: "from",
                required: true,
                label: "FROM",
                align: "center",
                sortable: true,
                field: (row) => row.from,
              },
              {
                name: "to",
                required: true,
                label: "TO",
                align: "center",
                sortable: true,
                field: (row) => row.to,
              },
              {
                name: "hrRemarks",
                required: true,
                label: "HR REMARKS",
                align: "center",
                sortable: true,
                field: (row) => row.hr_remarks,
              },
              {
                name: "remarksBy",
                required: true,
                label: "REMARKS BY",
                align: "center",
                sortable: true,
                field: (row) => row.remarks_by,
              },
              {
                name: "dateTimeRemarks",
                required: true,
                label: "DATE TIME REMARKS",
                align: "center",
                sortable: true,
                field: (row) => row.date_time_remarks,
              },
              {
                name: "action",
                required: false,
                label: "ACTION",
                align: "center",
                sortable: false,
              },
            ],
          },
          create: {
            columns: [
              {
                name: "columnName",
                required: true,
                label: "COLUMN NAME",
                align: "center",
                sortable: true,
                field: (row) => row.column_name,
              },
              {
                name: "value",
                required: true,
                label: "VALUE",
                align: "center",
                sortable: true,
                field: (row) => row.value,
              },
              {
                name: "hrRemarks",
                required: true,
                label: "HR REMARKS",
                align: "center",
                sortable: true,
                field: (row) => row.hr_remarks,
              },
              {
                name: "remarksBy",
                required: true,
                label: "REMARKS BY",
                align: "center",
                sortable: true,
                field: (row) => row.remarks_by,
              },
              {
                name: "dateTimeRemarks",
                required: true,
                label: "DATE TIME REMARKS",
                align: "center",
                sortable: true,
                field: (row) => row.date_time_remarks,
              },
              {
                name: "action",
                required: false,
                label: "ACTION",
                align: "center",
                sortable: false,
              },
            ],
          },
          rows: null,
        },
      },
      approved: {
        search: {
          date_from: null,
          date_to: null,
        },
        header: {
          columns: [
            {
              name: "requestID",
              required: true,
              label: "Request ID",
              align: "left",
              sortable: true,
              field: (row) => row.request_id,
            },
            {
              name: "stats",
              required: true,
              label: "",
              align: "left",
              sortable: true,
              field: (row) => row.stats,
            },
            {
              name: "requestedFields",
              required: true,
              label: "Requested Fields",
              align: "left",
              sortable: true,
              style: 'max-width: 200px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;', 
              field: (row) => row.requested_fields,
            },
            {
              name: "dateTimeCreated",
              required: true,
              label: "Date Time Created",
              align: "left",
              sortable: true,
              field: (row) => row.date_time_created,
            },
          ],
          rows: this.$store.state.users.user.my_requests.approved,
        },
        details: {
          edit: {
            columns: [
              {
                name: "dateTimeApproved",
                required: true,
                label: "DATE TIME APPROVED",
                align: "center",
                sortable: true,
                field: (row) => row.date_time_approved,
              },
              {
                name: "approvedBy",
                required: true,
                label: "APPROVED BY",
                align: "center",
                sortable: true,
                field: (row) => row.approved_by,
              },
              {
                name: "columnName",
                required: true,
                label: "COLUMN NAME",
                align: "center",
                sortable: true,
                field: (row) => row.column_name,
              },
              {
                name: "from",
                required: true,
                label: "FROM",
                align: "center",
                sortable: true,
                field: (row) => row.from,
              },
              {
                name: "to",
                required: true,
                label: "TO",
                align: "center",
                sortable: true,
                field: (row) => row.to,
              },
            ],
          },
          create: {
            columns: [
              {
                name: "dateTimeApproved",
                required: true,
                label: "DATE TIME APPROVED",
                align: "center",
                sortable: true,
                field: (row) => row.date_time_approved,
              },
              {
                name: "approvedBy",
                required: true,
                label: "APPROVED BY",
                align: "center",
                sortable: true,
                field: (row) => row.approved_by,
              },
              {
                name: "columnName",
                required: true,
                label: "COLUMN NAME",
                align: "center",
                sortable: true,
                field: (row) => row.column_name,
              },
              {
                name: "value",
                required: true,
                label: "VALUE",
                align: "center",
                sortable: true,
                field: (row) => row.value,
              },
            ],
          },
          rows: null,
        },
      },
    };
  },
  methods: {
    ...mapActions(["getUser"]),
    getPendingDetails(requestID) {
      let currentIndex =
        this.$store.state.users.user.my_requests.pending.findIndex(
          (x) => x.request_id === requestID
        );

      this.are_siblings_or_children =
        this.$store.state.users.user.my_requests.pending[
          currentIndex
        ].are_siblings_or_children;

      this.request_type =
        this.$store.state.users.user.my_requests.pending[
          currentIndex
        ].request_type;

      let response = [];
      for (const item of this.$store.state.users.user.my_requests.pending[
        currentIndex
      ].details) {
        response.push(item);
      }
      this.pending.details.rows = response;
    },
    getApprovedDetails(requestID) {
      let currentIndex =
        this.$store.state.users.user.my_requests.approved.findIndex(
          (x) => x.request_id === requestID
        );

      this.are_siblings_or_children =
        this.$store.state.users.user.my_requests.approved[
          currentIndex
        ].are_siblings_or_children;

      this.request_type =
        this.$store.state.users.user.my_requests.approved[
          currentIndex
        ].request_type;

      let response = [];
      for (const item of this.$store.state.users.user.my_requests.approved[
        currentIndex
      ].details) {
        response.push(item);
      }
      this.approved.details.rows = response;
    },
    refresh: function () {
      helperMethods.refreshPage();
    },
    convertToReadableFormatDateTime: function (value) {
      return helperMethods.convertToReadableFormatDateTime(value);
    },
    showPendingDetailsDialog: async function (description, requestID) {
      this.description = description;
      this.latest_selected_request_id = requestID;
      this.getPendingDetails(requestID);
      await this.requestNotHighLightedToRequester(requestID);
      this.$refs.dialogPendingDetails.show();
    },
    requestNotHighLightedToRequester: async function (requestID) {
      try {
        let employeeID =
          this.$store.state.users.user.personal_informations.employee_id;
        await MyRequestService.requestNotHighLightedToRequester(employeeID, {
          requestID: requestID,
        });
        this.getUser();
      } catch (error) {
        let withRefresh = false;
        helperMethods.showErrorMessage(error, withRefresh);
      }
    },
    hidePendingDetailsDialog: function () {
      this.$refs.dialogPendingDetails.hide();
      $q.localStorage.remove("needToOpen");
      this.pending.header.rows =
        this.$store.state.users.user.my_requests.pending;
    },
    showApprovedDetailsDialog: function (description, requestID) {
      this.description = description;
      this.latest_selected_request_id = requestID;
      this.getApprovedDetails(requestID);
      this.$refs.dialogApprovedDetails.show();
    },
    hideApprovedDetailsDialog: function () {
      this.$refs.dialogApprovedDetails.hide();
    },
    showComplyDialog: async function (id, columnName, fileName) {
      try {
        this.comply.submit.request_details_id = id;
        this.comply.view.field_name = columnName;
        this.comply.file_name = fileName !== "" ? fileName : null;
        if (columnName === "CIVIL STATUS") {
          let response = await PersonalInformationService.getAllCivilStatuses();
          this.comply.view.options = response.data;
        } else if (columnName === "RELIGION") {
          let response = await PersonalInformationService.getAllReligions();
          this.comply.view.options = response.data;
        }
      } catch (error) {
        let withRefresh = false;
        helperMethods.showErrorMessage(error, withRefresh);
      } finally {
        this.$refs.dialogComply.show();
      }
    },
    hideComplyDialog: function () {
      this.comply.view.field_name = null;
      this.comply.submit.request_details_id = 0;
      this.comply.submit.value = null;
      this.$refs.dialogComply.hide();
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
    submitComply: async function () {
      try {
        document.getElementById("btnSubmit").disabled = true;
        if (this.comply.view.field_name === "CIVIL STATUS") {
          this.comply.submit.value = this.selectedCivilStatusLabel;
        } else if (this.comply.view.field_name === "RELIGION") {
          this.comply.submit.value = this.selectedReligionLabel;
        }

        let employeeID =
          this.$store.state.users.user.personal_informations.employee_id;

        if (
          this.comply.view.field_name === "MARRIAGE CERTIFICATE" ||
          this.comply.view.field_name === "BIRTH CERTIFICATE" ||
          this.comply.view.field_name === "PRC ID" ||
          this.comply.view.field_name === "DIPLOMA" ||
          this.comply.view.field_name === "TOR" ||
          this.comply.view.field_name === "TRAINING OR SEMINAR CERTIFICATE"
        ) {
          let attachFile = "";

          if (this.comply.view.field_name === "MARRIAGE CERTIFICATE" ||
              this.comply.view.field_name === "DIPLOMA" ||
              this.comply.view.field_name === "TOR" 
          ) {
            attachFile = this.comply.view.field_name.replaceAll(" ", "_").toLowerCase();
          } else if (
            this.comply.view.field_name === "BIRTH CERTIFICATE" ||
            this.comply.view.field_name === "TRAINING OR SEMINAR CERTIFICATE"
            ) {
            attachFile = this.comply.file_name;
          } else if (this.comply.view.field_name === "PRC ID") {
            const arrayOfWords = this.description.split("license ");
            // Use a regular expression to find the word within <b> tags
            const match = arrayOfWords[1].match(/<b>([^<]+)<\/b>/);

            if (match && match.length > 1) {
              attachFile = match[1];
            }
          }

          const formData = new FormData();
          formData.append("request_id", this.latest_selected_request_id);
          formData.append("request_type", "create");
          formData.append("attach_file", attachFile);
          formData.append("employee_id", employeeID);
          formData.append(attachFile, this.comply.submit.value);
          await UploadService.index(formData);
        }

        await MyRequestService.submitComply(employeeID, this.comply.submit);

        helperMethods.createCookie("notify_message", "Successfully submitted.");
        helperMethods.createCookie("notify_type", "positive");

        $q.localStorage.remove("needToOpen");
        $q.localStorage.set(
          "needToOpen",
          this.description + ";" + this.latest_selected_request_id
        );

        helperMethods.refreshPage();
      } catch (error) {
        let withRefresh = false;
        helperMethods.showErrorMessage(error, withRefresh);
      } finally {
        this.hideComplyDialog();
        document.getElementById("btnSubmit").disabled = false;
      }
    },
    rowSelected: function (row) {
      return row.request_id == this.latest_selected_request_id
        ? "rowSelected"
        : "";
    },
    rowStyle: function (row) {
      return row.should_high_lighted_to_requester === true
        ? "highlightedRow"
        : "notHighlightedRow";
    },
       onSearch: async function () {
      try {
        document.getElementById("btnSearch").disabled = true;
        let dateToday = helperMethods.getDateToday();
        let dateTodayMinus7Days = helperMethods.getDateMinusDays(7);

        const dateRangeSearch = {
          other_requests: {
            pending: {
              date_from: dateTodayMinus7Days,
              date_to: dateToday,
            },
            my_approved: {
              date_from: dateTodayMinus7Days,
              date_to: dateToday,
            },
          },
          my_requests: {
            pending: {
              date_from: this.pending.search.date_from,
              date_to: this.pending.search.date_to,
            },
            approved: {
              date_from: this.approved.search.date_from,
              date_to: this.approved.search.date_to,
            },
          },
        };
        await this.getUser(dateRangeSearch);
              this.pending.header.rows =
        this.$store.state.users.user.my_requests.pending;
              this.approved.header.rows =
        this.$store.state.users.user.my_requests.approved;

      } catch (error) {
        let withRefresh = false;
        helperMethods.showErrorMessage(error, withRefresh);
      }finally{
        document.getElementById("btnSearch").disabled = false;
      }
    },
  },
  computed: {
    selectedCivilStatusLabel() {
      const selectedValue = this.comply.submit.value;
      const selectedOption = this.comply.view.options.find(
        (option) => option.civil_status_id === selectedValue
      );
      return selectedOption ? selectedOption.civil_status_name : "";
    },
    selectedReligionLabel() {
      const selectedValue = this.comply.submit.value;
      const selectedOption = this.comply.view.options.find(
        (option) => option.religion_id === selectedValue
      );
      return selectedOption ? selectedOption.religion_name : "";
    },
  },
});
</script>