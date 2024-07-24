<template>
  <div
    class="bg-white shadow-md rounded-lg overflow-hidden flex flex-col h-full min-h-60 relative"
  >
    <div className="relative  h-full">
      <img
        :src="news.urlToImage"
        alt="News Image"
        class="h-full object-cover"
      />

      <div
        :class="{
          'absolute inset-0': true,
          'bg-gradient-to-b from-black via-transparent to-transparent': textTop,
          'bg-gradient-to-t from-black via-transparent to-transparent':
            !textTop,
        }"
      ></div>
    </div>

    <div
      :class="{
        'absolute inset-0 p-4 flex flex-col': true,
        'justify-start': textTop,
        'justify-end': !textTop,
      }"
    >
      <div>
        <h2 class="font-bold text-lg mb-2 text-white truncate">
          {{ news.title }}
        </h2>
        <p
          :class="{
            'text-gray-200 mb-2 text-sm': true,
            '': textTop,
            truncate: !textTop,
          }"
        >
          {{ news.description }}
        </p>
        <p class="text-gray-300 text-xs mt-auto">
          Oleh {{ news.author }} pada {{ formattedDate }}
        </p>
        <div className="mt-2"></div>
        <a @click="openNews" class="text-blue-300 hover:underline text-sm">
          Baca Selengkapnya
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    news: {
      type: Object,
      required: true,
    },
    textTop: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    formattedDate() {
      const date = new Date(this.news.publishedAt);
      return date.toLocaleDateString("id-ID", {
        weekday: "short",
        day: "numeric",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
  methods: {
    openNews() {
      window.open(this.news.url, "_blank");
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      const readNews = JSON.parse(localStorage.getItem("readNews")) || [];
      if (!readNews.some((item) => item.title === this.news.title)) {
        readNews.push({
          title: this.news.title,
          url: this.news.url,
          urlToImage: this.news.urlToImage,
        });
        localStorage.setItem("readNews", JSON.stringify(readNews));
      }
    },
  },
};
</script>
