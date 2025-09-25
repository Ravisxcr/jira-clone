import { QueryClient, useMutation } from "@tanstack/react-query";
import {InferResponseType } from "hono";

// Adjust the import to match the actual export from '@/lib/rpc'
import { client } from "@/lib/rpc";

type ResponseType = InferResponseType<typeof client.api.auth.logout["$post"]>;

export const useLogout = () => {
  const queryClient = new QueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
     const response = await client.api.auth.logout.$post();
     return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current"] });
    },
});

  return mutation;
};