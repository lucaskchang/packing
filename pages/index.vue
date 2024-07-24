<template>
  <div class="p-2 md:p-8">
    <div class="pt-48">
      <p class="text-center text-7xl font-bold text-yellow-300">
        Weather App
      </p>
      <UInput
        v-model="location"
        class="mx-auto w-1/2 pt-12"
        placeholder="Enter a location"
      />
      <UButton
        class="mx-auto"
        @click="getWeather(location)"
      >
        Get Weather
      </UButton>
      <pre v-if="weather">
      {{ weather }}
    </pre>
    </div>
    <p class="pt-48 text-center">
      Powered by <a
        href="https://www.weatherapi.com/"
        title="Free Weather API"
      >WeatherAPI.com</a>
    </p>
  </div>
</template>

<script setup lang="ts">
const weather = ref(null);
const location = ref('');

async function getWeather(location: string) {
  try {
    weather.value = await $fetch(`/api/main?location=${location}`);
  }
  catch (error) {
    console.error(error);
  }
}
</script>
