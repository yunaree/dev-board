import { api } from "@/lib/api";
import { UpdateUsernameDto } from "./dtos/UpdateUsername.dto";
import { useAuthStore } from "@/store/auth.store";

export const updateUsername = async (data: UpdateUsernameDto) => {
  const token = useAuthStore.getState().tokens?.access_token;

  await api.patch<void>('/users/username', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  await useAuthStore.getState().fetchMe();
};