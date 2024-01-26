<template>
  <q-layout>
    <q-page-container>
      <div class="container">
        <div class="row" style="width: 85%;">
          <div class="col-12 q-pt-lg q-pb-lg">
            <template v-for="announcement in sortedAnnouncements" :key="announcement.ID">
              <q-card class="q-mb-lg">
                <q-card-section>
                  <div style="font-size: 15px;">{{ getMonthAndYear(announcement.ID) }}</div>
                  <div style="font-size: 20px;" class="text-bold">{{ announcement.Name }}</div>
                </q-card-section>
                <q-card-section v-if="announcement.Description">
                  <div class="text-justify" v-html="announcement.Description"></div>
                </q-card-section>
                <q-card-section class="text-center">
                  <div v-if="announcement.FileType === 'img' || announcement.FileType === 'jpg'" >
                    <img :src="announcement.Links" alt="Announcement Image" style="width: 80%;"/>
                  </div>
                  <div v-else-if="announcement.FileType === 'pdf'" class="divimgqtn" style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
                    <div class="blurred-image">
                    </div>
                    <q-btn color="white" text-color="primary" @click="openPdfLink(announcement.Links)" label="Click for more" class="center-btn"/>
                  </div>
                </q-card-section>
              </q-card>
            </template>
          </div>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>



<script>

export default {
  name: "Home",
  data() {
    return {
      announcement: [],
      carouselIndex: 1,
    };
  },

  computed: {
    sortedAnnouncements() {
      return this.announcement.slice().sort((a, b) => {
        const dateA = new Date(a.DateTimeCreated);
        const dateB = new Date(b.DateTimeCreated);
        return dateB - dateA; 
      });
    },
  },
  methods: {
    async getAnnouncements() {
      try {
        await this.$store.dispatch("announcementModule/fetchAnnouncements");
        this.announcement = this.$store.state.announcementModule.announcements;
      } catch (error) {
        console.error("Failed getting Leave Details", error);
      }
    },

    getMonthAndYear(announcementID) {
      const announcement = this.sortedAnnouncements.find(a => a.ID === announcementID);
      if (announcement && announcement.DateTimeCreated) {
        const dateTime = new Date(announcement.DateTimeCreated);
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const year = dateTime.getFullYear();
        const month = monthNames[dateTime.getMonth()];
        return `${month} ${year}`;
      }
      return '';
    },
    
    openPdfLink(link) {
      window.open(link, '_blank');
    },
    
  },
  created() {
    this.getAnnouncements();
  },
};
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.blurred-image {
  width: 80%;
  height: 400px;
  position: relative;
  margin: auto;
  background: url(../assets/images/PDFBackground.png) center/cover no-repeat;
  filter: blur(2px);
  opacity: 1.5; 
}

.center-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}


</style>