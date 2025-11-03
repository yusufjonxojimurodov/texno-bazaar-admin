import { useRoute, useRouter, type LocationQueryRaw } from "vue-router";

export function useQueryParams() {
  const route = useRoute();
  const router = useRouter();

  const getQueries = (prop?: string): any => {
    const queries: Record<string, any> = { ...route.query };

    queries.page = route.query.page ? Number(route.query.page) - 1 : 0;
    queries.size = route.query.size ? Number(route.query.size) : 10;

    return prop ? queries[prop] : queries;
  };

  const setQueries = async (
    props: Record<string, any>,
    clear = false
  ): Promise<void> => {
    const currentQuery = clear ? {} : { ...route.query };

    const merged: LocationQueryRaw = {};

    Object.entries({ ...currentQuery, ...props }).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        merged[key] = String(value);
      }
    });

    await router.push({ query: merged });
  };

  return {
    getQueries,
    setQueries,
  };
}
