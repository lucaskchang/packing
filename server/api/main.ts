export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const { apiKey } = useRuntimeConfig(event);
  const result = await $fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${query.location}`);
  return result;
});
