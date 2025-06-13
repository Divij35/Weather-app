import { create } from 'zustand';

const useWeatherStore = create((set) => ({
  data: null,
  setData: (weather) => set({ data: weather }),
}));

export default useWeatherStore;