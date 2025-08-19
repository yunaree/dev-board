import { api } from "@/lib/api";
import { UpdateUsernameDto } from "./dtos/username.dto";
import { useAuthStore } from "@/store/auth.store";

export const syncUser = async () => {
  const { refresh, fetchMe } = useAuthStore.getState();
  await refresh();
  await fetchMe();
};

export const updateUsername = async (data: UpdateUsernameDto) => {
  const token = useAuthStore.getState().tokens?.access_token;

  await api.patch<void>('/users/username', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  await syncUser();
};

export const updateAvatar = async (file: File) => {
  const token = useAuthStore.getState().tokens?.access_token;

  const formData = new FormData();
  formData.append('file', file);

  await api.patch<void>('/users/avatar', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });

  await syncUser();
};

export const updatePassword = async (oldPassword: string, newPassword: string) => {
  const token = useAuthStore.getState().tokens?.access_token;

  await api.post<void>('/users/change/password', { oldPassword, newPassword }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  await syncUser();
};

export const comparePasswords = async (password: string): Promise<boolean> => {
  const token = useAuthStore.getState().tokens?.access_token;

  const response = await api.post<boolean>('/users/compare/passwords', { password }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },  
  });

  return response.data;
}

export const changePassword = async (password: string) => {
  const token = useAuthStore.getState().tokens?.access_token;

  await api.post<void>('/users/change/password', { password }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  await syncUser();
}

