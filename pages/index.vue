<template>
  <div class="p-2 md:p-8">
    <div>
      <p class="text-center text-7xl font-bold">
        Packing List Generator
      </p>
      <div class="mx-auto flex w-5/6 flex-row space-x-4 pt-12">
        <div class="flex w-3/5 flex-col">
          <UInput
            v-model="location"
            placeholder="Where are you going?"
            icon="i-heroicons-map"
          />
        </div>
        <div class="flex w-1/5 flex-col">
          <UInput
            v-model="days"
            type="number"
            placeholder="Days"
            icon="i-heroicons-calendar-days"
          />
        </div>
        <div class="flex w-1/5 flex-col">
          <UButton
            class="mx-auto"
            icon="i-heroicons-sparkles"
            @click="getWeather(location)"
          >
            Generate List
          </UButton>
        </div>
      </div>
      <div
        v-if="location && days"
        class="mt-12 p-4 text-center"
      >
        <p class="text-3xl font-bold">
          Packing list
        </p>
        <div class="mt-4 flex flex-row">
          <div class="flex w-1/5 flex-col">
            <p class="text-2xl font-semibold">
              Clothes
            </p>
            <div class="mx-auto mt-2">
              <UCheckbox
                :label="`${setsOfClothes} Shirt${days > 1 ? 's': ''}`"
                required
              />
              <UCheckbox
                :label="`${setsOfClothes} Short${days > 1 ? 's': ''}`"
                required
              />
              <UCheckbox
                :label="`${setsOfClothes} Underpants`"
                required
              />
              <UCheckbox
                :label="`${setsOfClothes} Socks`"
                required
              />
              <UCheckbox
                label="1 Hoodie"
                required
              />
              <UCheckbox
                v-if="highestChanceOfRain > 25"
                label="1 Rain Jacket"
                required
              />
            </div>
          </div>
          <div class="flex w-1/5 flex-col">
            <p class="text-2xl font-semibold">
              Running Clothes
            </p>
            <div class="mx-auto mt-2">
              <UCheckbox
                :label="`${setsOfClothes} Shirt${days > 1 ? 's': ''}`"
                required
              />
              <UCheckbox
                :label="`${setsOfClothes} Short${days > 1 ? 's': ''}`"
                required
              />
              <UCheckbox
                :label="`${setsOfClothes} Socks`"
                required
              />
              <UCheckbox
                label="Trainers"
                required
              />
              <UCheckbox label="Foam Roller" />
              <UCheckbox
                label="Stretching Rope"
                required
              />
              <UCheckbox label="Exercise Band" />
              <UCheckbox label="Normatec" />
              <UCheckbox label="Trainers 2" />
              <UCheckbox label="Spikes" />
              <UCheckbox label="Vaporflies" />
            </div>
          </div>
          <div class="flex w-1/5 flex-col">
            <p class="text-2xl font-semibold">
              Toiletries
            </p>
            <div class="mx-auto mt-2">
              <UCheckbox
                label="Zyrtec"
                required
              />
              <UCheckbox
                label="Iron"
                required
              />
              <UCheckbox
                label="CeraVe"
                required
              />
              <UCheckbox
                label="Lip Balm"
                required
              />
              <UCheckbox
                label="Special Lotion"
                required
              />
              <UCheckbox
                label="Floss"
                required
              />
              <UCheckbox
                label="Toothpaste"
                required
              />
              <UCheckbox
                label="Toothbrush"
                required
              />
              <UCheckbox
                v-if="highestUV > 3"
                label="Suncreen"
                required
              />
              <UCheckbox
                label="Deodorant"
                required
              />
              <UCheckbox
                label="Lactase Pills"
                required
              />
              <UCheckbox
                label="Melatonin"
              />
              <UCheckbox
                label="Flonase"
              />
              <UCheckbox
                v-if="days > 2"
                label="Loofah"
                required
              />
            </div>
          </div>
          <div class="flex w-1/5 flex-col">
            <p class="text-2xl font-semibold">
              Entertainment
            </p>
            <div class="mx-auto mt-2">
              <UCheckbox
                label="Headphones"
              />
              <UCheckbox
                label="Book"
              />
              <UCheckbox
                label="Stuffy"
              />
            </div>
          </div>
          <div class="flex w-1/5 flex-col">
            <p class="text-2xl font-semibold">
              Other
            </p>
            <div class="mx-auto mt-2">
              <UCheckbox
                label="Eye Mask"
                required
              />
              <UCheckbox
                label="Journal"
                required
              />
              <UCheckbox
                label="Laundry Bag"
                required
              />
              <UCheckbox
                label="Clif Bar"
              />
            </div>
          </div>
        </div>
        <div
          v-if="weather"
          class="mt-8"
        >
          <p class="text-3xl font-bold">
            Weather Forecast
          </p>
          <div class="mt-4 flex flex-row justify-center space-x-8">
            <div
              v-for="forecast of weather.forecast.forecastday"
              :key="forecast.date"
              class="flex w-1/6 flex-col rounded-lg p-4 ring-4 ring-black dark:ring-white"
            >
              <p class="text-2xl font-semibold">
                {{ forecast.date }}
              </p>
              <div class="flex flex-row items-center justify-center">
                <div class="flex flex-col">
                  <img
                    :src="forecast.day.condition.icon"
                    class="size-8"
                  >
                </div>
                <p>
                  {{ forecast.day.condition.text }}
                </p>
              </div>
              <div class="mt-4 text-left text-lg">
                <p class="text-lg">
                  {{ forecast.day.mintemp_f }}°F - {{ forecast.day.maxtemp_f }}°F
                </p>
                <p class="text-lg">
                  {{ forecast.day.daily_chance_of_rain }}% chance of rain
                </p>
                <p class="text-lg">
                  UV Index: {{ forecast.day.uv }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
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
const location = ref('San Francisco');
const days = ref(1);
const highestUV = computed(() => {
  if (!weather.value) return 0;
  return weather.value.forecast.forecastday.reduce((acc, forecast) => {
    return Math.max(acc, forecast.day.uv);
  }, 0);
});
const highestChanceOfRain = computed(() => {
  if (!weather.value) return 0;
  return weather.value.forecast.forecastday.reduce((acc, forecast) => {
    return Math.max(acc, forecast.day.daily_chance_of_rain);
  }, 0);
});
const setsOfClothes = computed(() => {
  return (days.value >= 5 ? 5 : days.value).toString();
});

async function getWeather(location: string) {
  try {
    weather.value = await $fetch(`/api/main?location=${location}`);
  }
  catch (error) {
    console.error(error);
  }
}

onMounted(() => {
  getWeather(location.value);
});
</script>
