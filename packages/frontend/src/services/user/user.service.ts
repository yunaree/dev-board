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

  await useAuthStore.getState().refresh();

  await useAuthStore.getState().fetchMe();
};

export const updateAvatar = async (file: File) => {
  const token = useAuthStore.getState().tokens?.access_token;

  const formData = new FormData();
  formData.append('file', file);

  const res = await api.patch<void>('/users/avatar', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  return res.data;
};