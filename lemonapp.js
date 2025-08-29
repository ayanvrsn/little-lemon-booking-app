import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, Phone, Mail, MapPin, Star, ChefHat, Utensils } from 'lucide-react';

const LittleLemonApp = () => {
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    guests: '2',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    occasion: '',
    requests: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [availableTimes, setAvailableTimes] = useState([]);

  // Available time slots
  const timeSlots = [
    '17:00', '17:30', '18:00', '18:30', '19:00', 
    '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'
  ];

  // Initialize available times based on date
  const initializeTimes = (selectedDate) => {
    // Simulate different availability based on date
    const day = new Date(selectedDate).getDay();
    const baseSlots = [...timeSlots];
    
    // Weekend - remove some slots to simulate higher demand
    if (day === 5 || day === 6) {
      return baseSlots.filter(time => Math.random() > 0.3);
    }
    
    return baseSlots;
  };

  useEffect(() => {
    if (bookingData.date) {
      setAvailableTimes(initializeTimes(bookingData.date));
    }
  }, [bookingData.date]);

  // Validation functions
  const validateForm = () => {
    const newErrors = {};
    
    if (!bookingData.date) {
      newErrors.date = 'Выберите дату бронирования';
    } else {
      const selectedDate = new Date(bookingData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.date = 'Дата не может быть в прошлом';
      }
    }
    
    if (!bookingData.time) {
      newErrors.time = 'Выберите время';
    }
    
    if (!bookingData.firstName.trim()) {
      newErrors.firstName = 'Введите имя';
    }
    
    if (!bookingData.lastName.trim()) {
      newErrors.lastName = 'Введите фамилию';
    }
    
    if (!bookingData.email) {
      newErrors.email = 'Введите email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingData.email)) {
      newErrors.email = 'Некорректный формат email';
    }
    
    if (!bookingData.phone) {
      newErrors.phone = 'Введите телефон';
    } else if (!/^\+?[\d\s\-\(\)]+$/.test(bookingData.phone)) {
      newErrors.phone = 'Некорректный формат телефона';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitted(true);
      // Here you would normally send data to backend
      console.log('Booking submitted:', bookingData);
    }
  };

  const resetForm = () => {
    setBookingData({
      date: '',
      time: '',
      guests: '2',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      occasion: '',
      requests: ''
    });
    setErrors({});
    setIsSubmitted(false);
    setAvailableTimes([]);
  };

  // Success component
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-green-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Бронирование подтверждено!
            </h2>
            <p className="text-gray-600 mb-6">
              Спасибо, {bookingData.firstName}! Мы отправили подтверждение на {bookingData.email}
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-semibold text-gray-800 mb-2">Детали бронирования:</h3>
              <p className="text-sm text-gray-600">📅 {bookingData.date}</p>
              <p className="text-sm text-gray-600">🕐 {bookingData.time}</p>
              <p className="text-sm text-gray-600">👥 {bookingData.guests} гостей</p>
            </div>
            <button
              onClick={resetForm}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Новое бронирование
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-green-50">
      {/* Header */}
      <header className="bg-green-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ChefHat className="w-8 h-8 text-yellow-400" />
              <h1 className="text-2xl md:text-3xl font-bold">Little Lemon</h1>
            </div>
            <div className="hidden md:flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Чикаго</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
          <p className="text-yellow-200 mt-2">
            Семейный ресторан средиземноморской кухни
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Забронируйте столик
            </h2>
            <p className="text-gray-600 text-lg">
              Насладитесь незабываемым ужином в нашем уютном ресторане
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Restaurant Info */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <Utensils className="w-5 h-5 mr-2 text-green-600" />
                  О ресторане
                </h3>
                <p className="text-gray-600 mb-4">
                  Little Lemon — это семейный ресторан, где традиции средиземноморской кухни 
                  встречаются с современными кулинарными техниками. Мы гордимся нашими 
                  свежими ингредиентами и аутентичными рецептами.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-700">Часы работы:</p>
                    <p className="text-gray-600">Пн-Чт: 17:00-23:00</p>
                    <p className="text-gray-600">Пт-Сб: 17:00-24:00</p>
                    <p className="text-gray-600">Вс: 17:00-22:00</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Специализация:</p>
                    <p className="text-gray-600">• Средиземноморская кухня</p>
                    <p className="text-gray-600">• Свежие морепродукты</p>
                    <p className="text-gray-600">• Веганские опции</p>
                  </div>
                </div>
              </div>

              {/* Reviews */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Отзывы гостей</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-yellow-400 pl-4">
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">
                      "Невероятная атмосфера и восхитительная еда! Обязательно вернемся."
                    </p>
                    <p className="text-gray-500 text-xs mt-1">— Анна К.</p>
                  </div>
                  <div className="border-l-4 border-yellow-400 pl-4">
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">
                      "Лучший греческий салат в городе! Персонал очень дружелюбный."
                    </p>
                    <p className="text-gray-500 text-xs mt-1">— Михаил В.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Форма бронирования
              </h3>
              
              <div className="space-y-4">
                {/* Date and Time */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Дата *
                    </label>
                    <input
                      type="date"
                      id="date"
                      value={bookingData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        errors.date ? 'border-red-500' : 'border-gray-300'
                      }`}
                      aria-describedby={errors.date ? 'date-error' : undefined}
                      aria-invalid={!!errors.date}
                    />
                    {errors.date && (
                      <p id="date-error" className="text-red-500 text-xs mt-1" role="alert">
                        {errors.date}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                      <Clock className="w-4 h-4 inline mr-1" />
                      Время *
                    </label>
                    <select
                      id="time"
                      value={bookingData.time}
                      onChange={(e) => handleInputChange('time', e.target.value)}
                      disabled={!availableTimes.length}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        errors.time ? 'border-red-500' : 'border-gray-300'
                      } ${!availableTimes.length ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                      aria-describedby={errors.time ? 'time-error' : undefined}
                      aria-invalid={!!errors.time}
                    >
                      <option value="">
                        {availableTimes.length ? 'Выберите время' : 'Сначала выберите дату'}
                      </option>
                      {availableTimes.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                    {errors.time && (
                      <p id="time-error" className="text-red-500 text-xs mt-1" role="alert">
                        {errors.time}
                      </p>
                    )}
                  </div>
                </div>

                {/* Guests */}
                <div>
                  <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
                    <Users className="w-4 h-4 inline mr-1" />
                    Количество гостей *
                  </label>
                  <select
                    id="guests"
                    value={bookingData.guests}
                    onChange={(e) => handleInputChange('guests', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'гость' : num < 5 ? 'гостя' : 'гостей'}</option>
                    ))}
                  </select>
                </div>

                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      Имя *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      value={bookingData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        errors.firstName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                      aria-invalid={!!errors.firstName}
                    />
                    {errors.firstName && (
                      <p id="firstName-error" className="text-red-500 text-xs mt-1" role="alert">
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Фамилия *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      value={bookingData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        errors.lastName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                      aria-invalid={!!errors.lastName}
                    />
                    {errors.lastName && (
                      <p id="lastName-error" className="text-red-500 text-xs mt-1" role="alert">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    <Mail className="w-4 h-4 inline mr-1" />
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={bookingData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-red-500 text-xs mt-1" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    <Phone className="w-4 h-4 inline mr-1" />
                    Телефон *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={bookingData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="+7 (999) 123-45-67"
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                    aria-invalid={!!errors.phone}
                  />
                  {errors.phone && (
                    <p id="phone-error" className="text-red-500 text-xs mt-1" role="alert">
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Occasion */}
                <div>
                  <label htmlFor="occasion" className="block text-sm font-medium text-gray-700 mb-1">
                    Повод (необязательно)
                  </label>
                  <select
                    id="occasion"
                    value={bookingData.occasion}
                    onChange={(e) => handleInputChange('occasion', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Выберите повод</option>
                    <option value="birthday">День рождения</option>
                    <option value="anniversary">Годовщина</option>
                    <option value="business">Деловая встреча</option>
                    <option value="date">Свидание</option>
                    <option value="celebration">Праздник</option>
                    <option value="other">Другое</option>
                  </select>
                </div>

                {/* Special Requests */}
                <div>
                  <label htmlFor="requests" className="block text-sm font-medium text-gray-700 mb-1">
                    Особые пожелания (необязательно)
                  </label>
                  <textarea
                    id="requests"
                    value={bookingData.requests}
                    onChange={(e) => handleInputChange('requests', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Диетические ограничения, особые пожелания..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Забронировать столик
                </button>
              </div>
              
              <p className="text-xs text-gray-500 mt-4">
                * Обязательные поля. Мы не передаем ваши данные третьим лицам.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4 flex items-center">
                <ChefHat className="w-5 h-5 mr-2 text-yellow-400" />
                Little Lemon
              </h4>
              <p className="text-gray-400 text-sm">
                Семейный ресторан средиземноморской кухни в сердце Чикаго
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  123 Main Street, Chicago, IL
                </p>
                <p className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  +1 (555) 123-4567
                </p>
                <p className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  info@littlelemon.com
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Часы работы</h4>
              <div className="space-y-1 text-sm text-gray-400">
                <p>Понедельник - Четверг: 17:00 - 23:00</p>
                <p>Пятница - Суббота: 17:00 - 24:00</p>
                <p>Воскресенье: 17:00 - 22:00</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
            <p>&copy; 2025 Little Lemon Restaurant. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LittleLemonApp;
