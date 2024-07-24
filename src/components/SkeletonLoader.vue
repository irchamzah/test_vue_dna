<template>
  <div class="animate-pulse">
    <div class="hidden xl:grid grid-cols-5 gap-4">
      <div class="h-80 bg-gray-300 rounded col-span-2"></div>
      <div class="h-80 rounded col-span-3 grid grid-cols-2 gap-4">
        <div class="bg-gray-300 rounded col-span-1"></div>
        <div class="bg-gray-300 rounded col-span-1"></div>
        <div class="bg-gray-300 rounded col-span-1"></div>
        <div class="bg-gray-300 rounded col-span-1"></div>
      </div>
      <div class="h-80 rounded col-span-3 grid grid-cols-2 gap-4">
        <div class="bg-gray-300 rounded col-span-1"></div>
        <div class="bg-gray-300 rounded col-span-1"></div>
        <div class="bg-gray-300 rounded col-span-1"></div>
        <div class="bg-gray-300 rounded col-span-1"></div>
      </div>
      <div class="h-80 bg-gray-300 rounded col-span-2"></div>
    </div>

    <div
      class="xl:hidden rounded grid sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-col"
    >
      <div class="bg-gray-300 rounded col-span-1 h-44"></div>
      <div class="bg-gray-300 rounded col-span-1 h-44"></div>
      <div class="bg-gray-300 rounded col-span-1 h-44"></div>
      <div class="bg-gray-300 rounded col-span-1 h-44"></div>
      <div class="bg-gray-300 rounded col-span-1 h-44"></div>
      <div class="bg-gray-300 rounded col-span-1 h-44"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SkeletonLoader",
};
</script>

<style scoped>
.animate-pulse {
  animation: pulse 1.5s ease-in-out infinite;
}
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
