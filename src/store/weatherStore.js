import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useWeatherStore = create(
  persist(
    (set, get) => ({
      data: null,
      currentWeather: null,
      forecast: null,
      
      loading: false,
      error: null,
      
      savedCities: [],
      units: 'metric',
      
      setData: (weather) => set({ data: weather }),
      setCurrentWeather: (weather) => set({ currentWeather: weather }),
      setForecast: (forecast) => set({ forecast: forecast }),
      
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      
      addSavedCity: (city) => {
        const { savedCities } = get();
        if (!savedCities.find(c => c.name === city.name)) {
          set({ savedCities: [...savedCities, city] });
        }
      },
      
      removeSavedCity: (cityName) => {
        const { savedCities } = get();
        set({ savedCities: savedCities.filter(city => city.name !== cityName) });
      },
      
      setUnits: (units) => set({ units }),
      
      clearError: () => set({ error: null }),
    }),
    {
      name: 'weather-storage',
      partialize: (state) => ({ 
        savedCities: state.savedCities, 
        units: state.units 
      }),
    }
  )
);

export default useWeatherStore;