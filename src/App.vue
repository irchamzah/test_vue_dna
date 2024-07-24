<template>
  <div class="container mx-auto p-4">
    <div class="flex w-full justify-center mt-4">
      <input
        v-model="search"
        @keyup.enter="fetchNews"
        placeholder="Search news..."
        class="border py-2 px-6 rounded-full mb-4 mr-3"
      />
      <button
        @click="fetchNews"
        class="bg-blue-500 text-white h-10 w-10 flex items-center justify-center rounded-full mb-4 hover:opacity-90 active:bg-blue-700"
      >
        <font-awesome-icon icon="search" />
      </button>
    </div>
    <h1 className="text-3xl font-bold mb-4">Berita Terbaru</h1>
    <div
      v-if="loading"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <SkeletonLoader v-for="n in 3" :key="n" />
    </div>

    <div v-else>
      <div class="hidden xl:grid grid-cols-5 gap-4">
        <div class="rounded col-span-2 overflow-hidden h-full shadow-md">
          <NewsCard v-if="newsList[0]" :key="0" :news="newsList[0]" />
        </div>
        <div class="rounded col-span-3 grid grid-cols-2 gap-4">
          <NewsCard
            v-for="(news, index) in newsList.slice(1, 5)"
            :key="index"
            :news="news"
          />
        </div>
        <div class="rounded col-span-3 grid grid-cols-2 gap-4">
          <NewsCard
            v-for="(news, index) in newsList.slice(5, 9)"
            :key="index"
            :news="news"
          />
        </div>
        <div class="rounded col-span-2">
          <NewsCard
            v-if="newsList[9]"
            :key="9"
            :news="newsList[9]"
            :textTop="true"
          />
        </div>
      </div>

      <div
        class="xl:hidden rounded grid sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-col"
      >
        <NewsCard v-for="(news, index) in newsList" :key="index" :news="news" />
      </div>
    </div>

    <div class="mt-10 flex justify-center">
      <button
        :disabled="page === 1"
        @click="prevPage"
        class="bg-blue-500 text-white h-10 w-10 flex items-center justify-center rounded-full hover:opacity-90 active:bg-blue-700"
      >
        <font-awesome-icon icon="angle-left" />
      </button>
      <span class="self-center mx-4">Page {{ page }} of {{ totalPages }}</span>
      <button
        :disabled="page === totalPages"
        @click="nextPage"
        class="bg-blue-500 text-white h-10 w-10 flex items-center justify-center rounded-full hover:opacity-90 active:bg-blue-700"
      >
        <font-awesome-icon icon="angle-right" />
      </button>
    </div>
    <!-- Histori Berita -->
    <div class="mt-20">
      <h2 class="font-bold text-2xl mb-4">Histori Berita</h2>

      <div
        v-for="(news, index) in displayedReadNews"
        :key="index"
        class="flex items-center mb-4"
      >
        <img
          :src="news.urlToImage"
          alt="News Image"
          class="w-16 h-16 object-cover rounded-lg mr-4"
        />
        <div class="flex-1">
          <h2 class="font-bold">{{ news.title }}</h2>
          <a
            :href="news.url"
            target="_blank"
            class="text-blue-500 hover:underline text-sm"
          >
            Baca Selengkapnya
          </a>
        </div>
        <button
          @click="removeReadNews(news)"
          class="ml-4 text-red-500 hover:underline text-sm"
        >
          Hapus
        </button>
      </div>
      <button
        v-if="hasMoreReadNews"
        @click="loadMoreReadNews"
        class="text-blue-500 hover:underline"
      >
        Load More...</button
      ><br />
      <button
        @click="clearReadNews"
        class="mt-5 bg-red-500 text-white py-2 px-4 rounded hover:opacity-90 active:bg-red-700"
      >
        Hapus Seluruh Histori
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import NewsCard from "./components/NewsCard.vue";
import SkeletonLoader from "./components/SkeletonLoader.vue";

export default {
  components: {
    NewsCard,
    SkeletonLoader,
  },
  data() {
    return {
      newsList: [],
      search: "Star",
      loading: false,
      page: 1,
      pageSize: 10,
      totalResults: 0,
      readNews: JSON.parse(localStorage.getItem("readNews")) || [],
      displayedReadNewsCount: 5,
    };
  },
  computed: {
    filteredNews() {
      return this.newsList;
    },
    totalPages() {
      return Math.ceil(this.totalResults / this.pageSize);
    },
    displayedReadNews() {
      return this.readNews.slice(0, this.displayedReadNewsCount);
    },
    hasMoreReadNews() {
      return this.readNews.length > this.displayedReadNewsCount;
    },
  },
  methods: {
    async fetchNews() {
      this.loading = true;
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=${this.search}&page=${this.page}&pageSize=${this.pageSize}&apiKey=e8ede967b94f42fda6dfdf572ba2a551`
        );
        this.newsList = response.data.articles;
        this.totalResults = response.data.totalResults;
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        this.loading = false;
      }
    },
    nextPage() {
      if (this.page < this.totalPages) {
        this.page++;
        this.fetchNews();
      }
    },
    prevPage() {
      if (this.page > 1) {
        this.page--;
        this.fetchNews();
      }
    },
    removeReadNews(news) {
      this.readNews = this.readNews.filter((item) => item.title !== news.title);
      localStorage.setItem("readNews", JSON.stringify(this.readNews));
    },
    clearReadNews() {
      this.readNews = [];
      localStorage.removeItem("readNews");
    },
    loadMoreReadNews() {
      this.displayedReadNewsCount += 5;
    },
  },
  mounted() {
    this.fetchNews();
  },
};
</script>
