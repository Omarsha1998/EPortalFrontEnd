<template>
  <q-layout>
    <q-page-container>
      <div class="container">
        <div class="row" style="width: 90%;">
          <div class="col-12">
            <q-card class="mainCard">
              <div>
                <q-card-section class="bg-primary text-white text-h6 text-center"
                  :style="{
                    fontWeight: 'bold',
                    fontSize: $q.screen.lt.sm ? '16px' : ($q.screen.lt.md ? '18px' : ($q.screen.gt.md && $q.screen.lt.xl ? '20px' : '18px'))
                  }"
                >
                  Daily Time Record
                </q-card-section>

                <div>
                  <q-virtual-scroll
                    class="virtual-scroll"
                    type="table"
                    style="max-height: 800px"
                    :virtual-scroll-item-size="48"
                    :virtual-scroll-sticky-size-start="48"
                    :virtual-scroll-sticky-size-end="32"
                    :items="DTRDetails"
                  >
                    <template v-slot:before>
                      <thead class="sticky-thead">
                        <tr>
                          <th v-for="col in dtrColumns" :key="col.name">
                            {{ col.label }}
                          </th>
                        </tr>
                      </thead>
                    </template>
                    <template v-slot="{ item: row, Day }">
                      <q-tr :key="row.Day" :style="{ background: getRowBackground(row) }">
                        <q-td v-for="col in dtrColumns" :key="col.Day" :style="{ width: col.width || 'auto' }">
                          <q-card v-if="col.field === 'IN'" class="text-white text-center" :style="{ backgroundColor: getBackgroundColor(row.TimeIN, row.schedFrom), width: '50px', height: '25px', border: '1px solid #fff' }">
                            {{ row[col.field] }}
                          </q-card>
                          <q-card v-else-if="col.field === 'OUT'" class="text-white text-center" style="background-color: rgba(60, 180, 0); width: 50px; height: 25px; border: 1px solid #fff;">
                            {{ row[col.field] }}
                          </q-card>
                          <q-td v-else-if="col.field === 'late'" class="text-white" :style="{ backgroundColor: getLateBackgroundColor(row.late), width: '100%', height: '100%', border: '1px solid #fff' }">
                            {{ row[col.field] }}
                          </q-td>
                          <div v-else class="text-center">
                            {{ row[col.field] }}
                          </div>
                        </q-td>
                      </q-tr>
                    </template>
                  </q-virtual-scroll>
                  <div v-if="DTRDetails.length === 0" class="text-center">
                    <q-icon name="warning" style="font-size: 25px"/>
                    No data available
                  </div>
                </div>
              </div>
            </q-card>
          </div>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  data() {
    return {
      DTRDetails: [],
      dtrColumns: [
        { name: 'Day', label: 'Day', align: 'center', field: 'dayOfWeek', sortable: false, width: '80px' },
        { name: 'Date', label: 'Date', align: 'center', field: 'transDate', sortable: false, width: '80px' },
        { name: 'Calendar', label: 'Calendar', align: 'center', field: 'calendar', sortable: false, width: '100px' },
        { name: 'Schedule', label: 'Schedule', align: 'center', field: 'schedule', sortable: false, width: '100px' },
        { name: 'IN', label: 'IN', align: 'center', field: 'IN', sortable: false, width: '80px' },
        { name: 'OUT', label: 'OUT', align: 'center', field: 'OUT', sortable: false, width: '80px' },
        { name: 'OT IN', label: 'OT IN', align: 'center', field: 'OT - IN', sortable: false, width: '80px' },
        { name: 'OT OUT', label: 'OT OUT', align: 'center', field: 'OT - OUT', sortable: false, width: '80px' },
        { name: 'Late', label: 'Late', align: 'center', field: 'late', sortable: false, width: '80px' },
        { name: 'Undertime', label: 'Undertime', align: 'center', field: 'undertime', sortable: false, width: '80px' },
        { name: 'Overtime', label: 'Overtime', align: 'center', field: 'otHours', sortable: false, width: '80px' },
        { name: 'Holiday', label: 'Holiday', align: 'center', field: 'holidayPay', sortable: false, width: '80px' } ,
      ]
    }
  },


  computed: {
    getRowStyle() {
      return function(row) {
        if (row.scheduleTime && !row.calendar) {
          return {
            backgroundColor: 'rgba(255, 0, 0, 0.3)' // Translucent red background
          };
        } else {
          return {}; // No special style
        }
      };
    }
  },

  methods: {
    async fetchDTR() {
      try {
        await this.$store.dispatch('DTRModule/fetchDTR');
        this.DTRDetails = this.$store.state.DTRModule.dtrDetails;
      } catch {
        console.error(error)
      }
    },

    getBackgroundColor(TimeIN, schedFrom) {
      // Convert the strings to Date objects
      const timeINDate = new Date(TimeIN);
      const schedFromDate = new Date(schedFrom);

      const sameDayAndDate = timeINDate.toDateString() === schedFromDate.toDateString();
      const minuteDifference = (timeINDate - schedFromDate) / (1000 * 60);

      if (sameDayAndDate) {
        if (minuteDifference >= 1 && minuteDifference <= 14) {
          return 'rgba(240, 150, 0)';
        } else if (minuteDifference >= 15) {
          return 'rgba(190, 0, 0)';
        } else {
          return 'rgba(60, 180, 0)';
        }
      } else {
        return 'rgba(60, 180, 0)';
      }
    },


    getLateBackgroundColor(lateValue) {
      if (lateValue === null) {
        return 'rgba(255, 255, 255)'; // White background if late is null
      } else if (lateValue >= 1 && lateValue <= 14) {
        return 'rgba(240, 150, 0)'; // Warning color if late is between 1 and 14
      } else if (lateValue > 15) {
        return 'rgba(190, 0, 0)'; // Error color if late is greater than 15
      } else {
        return 'transparent'; // Default to transparent background
      }
    },

    getRowBackground(row) {

      if (row.calendar === null && row.schedule && !row.IN) {
        return 'rgba(200, 0, 0, 0.1)';
      } else if (row.calendar === 'REGULAR HOLIDAY' || row.calendar === 'DAY OFF') {
        return 'rgba(60, 190, 0, 0.2)'; 
      } else {
        return '';
      }
    },






  },

  created() {
    this.fetchDTR();
  }
}

</script>

<style>

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.mainCard {
  border-radius: 10px;
  margin-bottom: 50px;
  margin-top: 10px;
}

</style> 