<template>
  <div class="p-2 md:p-8">
    <div>
      <p class="text-center text-7xl font-bold text-yellow-300">
        Packing List Generator
      </p>
      <div class="mx-auto flex w-5/6 flex-row space-x-4 pt-12">
        <div class="flex w-4/6 flex-col">
          <UInput
            v-model="location"
            placeholder="Where are you going?"
            icon="i-heroicons-map"
          />
        </div>
        <div class="flex w-1/6 flex-col">
          <UPopover :popper="{ placement: 'bottom-start' }">
            <UButton
              icon="i-heroicons-calendar-days-20-solid"
              :label="format(date, 'd MMM, yyy')"
            />

            <template #panel="{ close }">
              <DatePicker
                v-model="date"
                is-required
                @close="close"
              />
            </template>
          </UPopover>
        </div>
        <div class="flex w-1/6 flex-col">
          <UButton
            class="mx-auto"
            icon="i-heroicons-sparkles"
            @click="getWeather(location)"
          >
            Generate List
          </UButton>
        </div>
      </div>
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
import { format } from 'date-fns';

const date = ref(new Date());
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
