import {getPersistStoreOptions} from '@/utils/getPersistStoreOptions';
import {create} from 'zustand';
import {persist} from 'zustand/middleware';

interface State {
  username: string;
  setUsername: (username: string) => void;

  avatar: string;
  setAvatar: (avatar: string) => void;

  selectedAvatarPosition: number | null;
  setSelectedAvatarPosition: (pos: number | null) => void;

  capturedDistrictIds: number[];
  addCapturedDistrictId: (id: number) => void;

  investedDistrictIds: number[];
  addInvestedDistrictId: (id: number) => void;

  isReferenceModalClosedForever: boolean;
  setIsReferenceModalClosedForever: (isClosedForever: boolean) => void;

  currentDailyIndex: number;
  addCurrentDailyIndex: () => void;

  balance: number;
  addBalance: (n: number) => void;
  spendBalance: (n: number) => void;

  clear: () => void;
  reset: () => void;
}

export const useUserStore = create(
  persist<State>(
    (set, get) => ({
      username: '',
      setUsername: (username: string) => set({username}),

      avatar: '',
      setAvatar: (avatar: string) => set({avatar}),

      selectedAvatarPosition: null,
      setSelectedAvatarPosition: selectedAvatarPosition =>
        set({selectedAvatarPosition}),

      capturedDistrictIds: [],
      addCapturedDistrictId: id =>
        set({capturedDistrictIds: [...get().capturedDistrictIds, id]}),

      investedDistrictIds: [],
      addInvestedDistrictId: id =>
        set({investedDistrictIds: [...get().investedDistrictIds, id]}),

      currentDailyIndex: 1,
      addCurrentDailyIndex: () =>
        set({currentDailyIndex: get().currentDailyIndex + 1}),

      isReferenceModalClosedForever: false,
      setIsReferenceModalClosedForever: isClosedForever =>
        set({isReferenceModalClosedForever: isClosedForever}),

      balance: 0,
      addBalance: (balance: number) => set({balance: get().balance + balance}),
      spendBalance: (balance: number) =>
        set({balance: get().balance - balance}),

      clear: () => {
        set({
          username: '',
          avatar: '',
          isReferenceModalClosedForever: false,
          currentDailyIndex: 1,
          balance: 0,
          capturedDistrictIds: [],
          investedDistrictIds: [],
        });
      },
      reset: () => {
        set({
          balance: 0,
          currentDailyIndex: 1,
          capturedDistrictIds: [],
          investedDistrictIds: [],
        });
      },
    }),

    getPersistStoreOptions('user'),
  ),
);
