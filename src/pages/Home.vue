<template>
  <div class="text-center">
    <!-- Display announcement data with a button -->
    <div v-for="announcement in sortedAnnouncements" :key="announcement.Id">
      <h4>{{ announcement.Name }}</h4>

      <!-- Check the file type and conditionally render an image or a PDF button -->
      <template v-if="announcement.FileType === 'img' || announcement.FileType === 'jpg'">
        <img :src="announcement.Links" alt="Announcement Image" style="max-width: 100%;" />
      </template>
      <template v-else>
        <q-btn @click="openPdfLink(announcement.Links)" label="Show PDF" />
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      announcement: [],
    };
  },
  computed: {
    // Compute a sorted version of the announcements based on DateTimeCreated
    sortedAnnouncements() {
      return this.announcement.slice().sort((a, b) => {
        // Assuming DateTimeCreated is a Date object
        const dateA = new Date(a.DateTimeCreated);
        const dateB = new Date(b.DateTimeCreated);
        return dateB - dateA; // Sort in descending order (latest first)
      });
    },
  },
  methods: {
    async getAnnouncements() {
      try {
        await this.$store.dispatch("announcementModule/fetchAnnouncements");
        this.announcement = this.$store.state.announcementModule.announcements;
      } catch (error) {
        console.error("Failed getting Leave Details");
      }
    },
    openPdfLink(link) {
      window.open(link, '_blank'); // Opens the link in a new tab or window
    },
  },
  created() {
    this.getAnnouncements();
  },
};
</script>
