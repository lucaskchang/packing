<template :class="$colorMode.value">
  <div
    class="min-h-screen bg-sky-300 text-gray-950 transition duration-300 ease-in-out dark:bg-sky-900 dark:text-white"
  >
    <slot />
    <ColorMode />
  </div>
</template>
