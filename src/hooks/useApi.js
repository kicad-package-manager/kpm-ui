import { useQuery } from '@tanstack/react-query';

export default function useApi(queryKey, url) {
  return useQuery({
    queryKey,
    queryFn: async () => {
      try {
        const result = await fetch(url);

        return await result.json();
      } catch (error) {
        // eslint-disable-next-line
        console.error(error);
      }
    },
    refetchOnWindowFocus: false
  });
}
