# 🌤️ WeatherApp

A modern, responsive weather application built with React, Vite, and Tailwind CSS. Get real-time weather information, forecasts, and personalized recommendations.

## ✨ Features

### 🌍 Weather Information
- **Current Weather**: Real-time temperature, humidity, wind speed, and pressure
- **5-Day Forecast**: Detailed weather predictions for the upcoming days
- **Weather Icons**: Visual representation of weather conditions
- **Location Support**: Search by city name or use current location

### 🎨 User Experience
- **Modern UI**: Beautiful gradient designs and smooth animations
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Dark/Light Theme**: Toggle between synthwave and light themes
- **Loading States**: Smooth loading animations and feedback

### 💾 Data Management
- **Saved Cities**: Save your favorite cities for quick access
- **Search History**: Recent searches for easy navigation
- **Persistent Storage**: Your preferences are saved locally
- **Error Handling**: Graceful error handling with user-friendly messages

### 🎯 Smart Features
- **Weather Tips**: Personalized recommendations based on weather conditions
- **Activity Suggestions**: Get activity ideas based on current weather
- **Unit Support**: Metric and Imperial units (expandable)
- **Geolocation**: Automatic weather for your current location

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- OpenWeatherMap API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd weather-app/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the frontend directory:
   ```env
   VITE_WEATHER_API=your_openweathermap_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🛠️ Tech Stack

- **Frontend Framework**: React
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + DaisyUI
- **State Management**: Zustand
- **Routing**: React Router DOM
- **Icons**: OpenWeatherMap Icons

## 📱 Pages

### 📊 Forecast Page (`/`)
- Search for cities by name
- Get current location weather
- View 5-day weather forecast
- Save cities to favorites
- Search history tracking

### 💡 Tips Page (`/event`)
- Personalized weather recommendations
- Activity suggestions based on weather
- Current weather summary
- Saved cities overview

### API Endpoints Used
- Current Weather: `/data/2.5/weather`
- 5-Day Forecast: `/data/2.5/forecast`
- Weather Icons: `http://openweathermap.org/img/wn/`

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- OpenWeatherMap for weather data API
- DaisyUI for beautiful components
- Tailwind CSS for utility-first styling
- React community for amazing tools and libraries

---

**Made with ❤️ and ☕ by Divij Pirankar**
