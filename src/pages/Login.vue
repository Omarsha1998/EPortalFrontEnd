<template>
  <div class="bgImageUERM row justify-center">
    <div class="column">
      <div class="row">
        <q-layout class="row justify-center items-center">
          <q-card style="margin: 15px">
            <br />
            <br />
            <Logo />
            <Title :title="'(LOGIN)'"></Title>

            <q-card-section>
              <q-form
                id="frm"
                class="q-gutter-md"
                method="post"
                @submit.prevent="onSubmit"
                autocomplete="off"
              >
                <q-input
                  id="txtEmployeeID"
                  label="Employee ID"
                  v-model="user.employee_id"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'Employee ID is required',
                  ]"
                >
                </q-input>
                <q-input
                  label="Password"
                  type="password"
                  v-model="user.password"
                  lazy-rules
                  :rules="[
                    (val) => (val && val.length > 0) || 'Password is required',
                  ]"
                >
                </q-input>
                <div>
                  <q-btn
                    id="btnSubmit"
                    class="full-width"
                    color="primary"
                    label="Login"
                    type="submit"
                  ></q-btn>

                  <div class="text-center q-mt-sm q-gutter-lg">
                    <br />

                    <!-- <q-btn
                      color="primary"
                      label="ASD"
                      type="button"
                      @click="pushNotif()"
                    ></q-btn> -->

                    <!-- <router-link
                    class="text-black"
                    to="/account/forgot-password-with-mobile-number"
                    >Forgot Password?</router-link> -->
                  </div>
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </q-layout>
      </div>
    </div>
  </div>
</template>

<script>
// -------------------- Notify plugins --------------------
import { useQuasar } from "quasar";
let $q;
// -------------------- Notify plugins --------------------

import Title from "../components/Title.vue";
import Logo from "../components/Logo.vue";

import { mapActions } from "vuex";

export default {
  name: "Login",
  components: {
    Logo,
    Title,
  },
  data: function () {
    return {
      user: {
        employee_id: null,
        password: null,
      },
    };
  },
  mounted: function () {
    $q = useQuasar();
    this.onReset();
  },
  methods: {
    ...mapActions(["login"]),
    onSubmit: async function () {
      // $q.notify({
      //     type: "positive",
      //     message: "THIS IS POSITIVE.",
      //   });

      //   $q.notify({
      //     type: "negative",
      //     message: "THIS IS NEGATIVE.",
      //   });

      //   $q.notify({
      //     type: "warning",
      //     message: "THIS IS WARNING.",
      //   });

      //   $q.notify({
      //     type: "info",
      //     message: "THIS IS INFO.",
      //   });

      // $q.notify({
      //   type: "ongoing",
      //   message: "THIS IS ONGOING",
      // });
      try {
        document.getElementById("btnSubmit").disabled = true;
        await this.login(this.user);
        return this.$router.push("/");
      } catch (error) {
        let text = error.response.data;
        // 401 = Unauthorized
        if (error.response.status === 401) {
          this.onReset();
        }
        $q.notify({
          type: "negative",
          message: text,
        });
      } finally {
        document.getElementById("btnSubmit").disabled = false;
      }
    },
    onReset: function () {
      document.getElementById("frm").reset();
      const value = {
        employee_id: null,
        password: null,
      };
      this.user = value;
    },
    // pushNotif: function () {
    //   helperMethods.pushNotification();
    // },
  },
};
</script>

<style scoped>
</style>
