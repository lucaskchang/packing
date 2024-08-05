<template>
  <div class="p-2 md:p-8">
    <div>
      <p class="text-center text-7xl font-bold">
        Packing List Generator
      </p>
      <div class="mx-auto flex w-5/6 flex-row space-x-4 pt-12">
        <div class="flex w-3/6 flex-col">
          <UInput
            v-model="location"
            placeholder="Where are you going?"
            icon="i-heroicons-map"
          />
        </div>
        <div class="flex w-1/6 flex-col">
          <UInput
            v-model="startDate"
            type="date"
            placeholder="Days"
            icon="i-heroicons-calendar-days"
          />
        </div>
        <div class="flex w-1/6 flex-col">
          <UInput
            v-model="days"
            type="number"
            placeholder="Days"
            icon="i-heroicons-calendar-days"
          />
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
      <div
        v-if="location && startDate && days"
        class="mt-12 p-4 text-center"
      >
        <p
          class="text-3xl font-bold"
        >
          Packing list for {{ location }} from {{ useDateFormat(startDate, 'ddd MMMM D YYYY').value }} to {{ useDateFormat(endDate, 'ddd MMMM D YYYY').value }}
        </p>
        <div class="mt-8 flex flex-row">
          <div class="flex w-1/5 flex-col">
            <p class="text-2xl font-semibold">
              Clothes
            </p>
            <div class="mx-auto mt-2">
              <UCheckbox
                :label="`${days.toString()} Shirt${days > 1 ? 's': ''}`"
                required
              />
              <UCheckbox
                :label="`${days.toString()} Short${days > 1 ? 's': ''}`"
                required
              />
              <UCheckbox
                :label="`${days.toString()} Underpants`"
                required
              />
              <UCheckbox
                :label="`${days.toString()} Socks`"
                required
              />
              <UCheckbox
                label="1 Hoodie"
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
                :label="`${days.toString()} Shirt${days > 1 ? 's': ''}`"
                required
              />
              <UCheckbox
                :label="`${days.toString()} Short${days > 1 ? 's': ''}`"
                required
              />
              <UCheckbox
                :label="`${days.toString()} Socks`"
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
                label="Suncreen"
                required
              />
              <UCheckbox
                label="Deodorant"
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
              />
              <UCheckbox
                label="Journal"
              />
              <UCheckbox
                label="Laundry Bag"
              />
              <UCheckbox
                label="Clif Bar"
              />
            </div>
          </div>
        </div>
        <div class="mt-8">
          <pre
            v-if="weather"
            class="text-left"
          >
        {{ weather }}
      </pre>
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
const location = ref('');
const days = ref(1);
const startDate = ref('');
const endDate = computed(() => {
  const d = new Date(startDate.value);
  d.setDate(d.getDate() + days.value + 1);
  return d;
});

async function getWeather(location: string) {
  try {
    weather.value = await $fetch(`/api/main?location=${location}`);
  }
  catch (error) {
    console.error(error);
  }
}
</script>
