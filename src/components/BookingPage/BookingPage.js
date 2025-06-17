import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FloatingParticles } from '../Effects/ScrollEffects';
import Header from '../Header/Header';
import translations from '../../translations';
import './BookingPage.css';

export default function BookingPage({ lang, setLang }) {
  const t = translations[lang] || translations['es'];
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    experience: 'kat-walk',
    participants: 1,
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envío del formulario
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      console.log('Datos del formulario:', formData);
    }, 2000);
  };

  const experiences = [
    { 
      id: 'kat-walk', 
      name: t.booking.experiences.katWalk.name, 
      duration: t.booking.experiences.katWalk.duration, 
      price: t.booking.experiences.katWalk.price,
      description: t.booking.experiences.katWalk.description
    },
    { 
      id: 'owo-vest', 
      name: t.booking.experiences.owoVest.name, 
      duration: t.booking.experiences.owoVest.duration, 
      price: t.booking.experiences.owoVest.price,
      description: t.booking.experiences.owoVest.description
    },
    { 
      id: 'combo', 
      name: t.booking.experiences.combo.name, 
      duration: t.booking.experiences.combo.duration, 
      price: t.booking.experiences.combo.price,
      description: t.booking.experiences.combo.description
    }
  ];

  const timeSlots = [
    { time: '10:00', period: t.booking.timeSlots.morning },
    { time: '10:10', period: t.booking.timeSlots.morning },
    { time: '10:20', period: t.booking.timeSlots.morning },
    { time: '10:30', period: t.booking.timeSlots.morning },
    { time: '10:40', period: t.booking.timeSlots.morning },
    { time: '10:50', period: t.booking.timeSlots.morning },
    { time: '11:00', period: t.booking.timeSlots.morning },
    { time: '11:10', period: t.booking.timeSlots.morning },
    { time: '11:20', period: t.booking.timeSlots.morning },
    { time: '11:30', period: t.booking.timeSlots.morning },
    { time: '11:40', period: t.booking.timeSlots.morning },
    { time: '11:50', period: t.booking.timeSlots.morning },
    { time: '12:00', period: t.booking.timeSlots.noon },
    { time: '12:10', period: t.booking.timeSlots.noon },
    { time: '12:20', period: t.booking.timeSlots.noon },
    { time: '12:30', period: t.booking.timeSlots.noon },
    { time: '12:40', period: t.booking.timeSlots.noon },
    { time: '12:50', period: t.booking.timeSlots.noon },
    { time: '13:00', period: t.booking.timeSlots.noon },
    { time: '13:10', period: t.booking.timeSlots.noon },
    { time: '13:20', period: t.booking.timeSlots.noon },
    { time: '13:30', period: t.booking.timeSlots.noon },
    { time: '13:40', period: t.booking.timeSlots.noon },
    { time: '13:50', period: t.booking.timeSlots.noon },
    { time: '14:00', period: t.booking.timeSlots.afternoon },
    { time: '14:10', period: t.booking.timeSlots.afternoon },
    { time: '14:20', period: t.booking.timeSlots.afternoon },
    { time: '14:30', period: t.booking.timeSlots.afternoon },
    { time: '14:40', period: t.booking.timeSlots.afternoon },
    { time: '14:50', period: t.booking.timeSlots.afternoon },
    { time: '15:00', period: t.booking.timeSlots.afternoon },
    { time: '15:10', period: t.booking.timeSlots.afternoon },
    { time: '15:20', period: t.booking.timeSlots.afternoon },
    { time: '15:30', period: t.booking.timeSlots.afternoon },
    { time: '15:40', period: t.booking.timeSlots.afternoon },
    { time: '15:50', period: t.booking.timeSlots.afternoon },
    { time: '16:00', period: t.booking.timeSlots.afternoon },
    { time: '16:10', period: t.booking.timeSlots.afternoon },
    { time: '16:20', period: t.booking.timeSlots.afternoon },
    { time: '16:30', period: t.booking.timeSlots.afternoon },
    { time: '16:40', period: t.booking.timeSlots.afternoon },
    { time: '16:50', period: t.booking.timeSlots.afternoon },
    { time: '17:00', period: t.booking.timeSlots.afternoon },
    { time: '17:10', period: t.booking.timeSlots.afternoon },
    { time: '17:20', period: t.booking.timeSlots.afternoon },
    { time: '17:30', period: t.booking.timeSlots.afternoon },
    { time: '17:40', period: t.booking.timeSlots.afternoon },
    { time: '17:50', period: t.booking.timeSlots.afternoon },
    { time: '18:00', period: t.booking.timeSlots.afternoon },
    { time: '18:10', period: t.booking.timeSlots.afternoon },
    { time: '18:20', period: t.booking.timeSlots.afternoon },
    { time: '18:30', period: t.booking.timeSlots.afternoon },
    { time: '18:40', period: t.booking.timeSlots.afternoon },
    { time: '18:50', period: t.booking.timeSlots.afternoon },
    { time: '19:00', period: t.booking.timeSlots.night },
    { time: '19:10', period: t.booking.timeSlots.night },
    { time: '19:20', period: t.booking.timeSlots.night },
    { time: '19:30', period: t.booking.timeSlots.night },
    { time: '19:40', period: t.booking.timeSlots.night },
    { time: '19:50', period: t.booking.timeSlots.night },
    { time: '20:00', period: t.booking.timeSlots.night },
    { time: '20:10', period: t.booking.timeSlots.night },
    { time: '20:20', period: t.booking.timeSlots.night },
    { time: '20:30', period: t.booking.timeSlots.night },
    { time: '20:40', period: t.booking.timeSlots.night },
    { time: '20:50', period: t.booking.timeSlots.night },
    { time: '21:00', period: t.booking.timeSlots.night }
  ];

  const participantsOptions = [
    { value: 1, label: t.booking.participants.one },
    { value: 2, label: t.booking.participants.two },
    { value: 3, label: t.booking.participants.three },
    { value: 4, label: t.booking.participants.four },
    { value: 5, label: t.booking.participants.five },
    { value: 6, label: t.booking.participants.six }
  ];

  if (submitSuccess) {
    return (
      <>
        <Header lang={lang} setLang={setLang} />
        <FloatingParticles count={30}>
          <section className="booking-success">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="success-content"
            >
              <div className="success-icon">✅</div>
              <h1>{t.booking.success.title}</h1>
              <p>{t.booking.success.message}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/'}
                className="back-home-btn"
              >
                {t.booking.success.backHome}
              </motion.button>
            </motion.div>
          </section>
        </FloatingParticles>
      </>
    );
  }

  return (
    <>
      <Header lang={lang} setLang={setLang} />
      <FloatingParticles count={30}>
        <section className="booking-page">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="booking-container"
          >
            <div className="booking-header">
              <h1>{t.booking.title}</h1>
              <p>{t.booking.subtitle}</p>
            </div>

            <div className="booking-content">
              <div className="experiences-grid">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={exp.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`experience-card ${formData.experience === exp.id ? 'selected' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, experience: exp.id }))}
                  >
                    <h3>{exp.name}</h3>
                    <div className="experience-details">
                      <span>⏱️ {exp.duration}</span>
                      <span>💰 {exp.price}</span>
                    </div>
                    <div className="experience-description">
                      {exp.description}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.form
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                onSubmit={handleSubmit}
                className="booking-form"
              >
                <div className="form-group">
                  <label htmlFor="name">{t.booking.form.name}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder={t.booking.form.namePlaceholder}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">{t.booking.form.email}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder={t.booking.form.emailPlaceholder}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">{t.booking.form.phone}</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={t.booking.form.phonePlaceholder}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group date-group">
                    <label htmlFor="date">{t.booking.form.date}</label>
                    <div className="date-input-wrapper">
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        required
                        min={new Date().toISOString().split('T')[0]}
                        placeholder={t.booking.form.selectDate}
                        className="date-input"
                      />
                      <span className="calendar-icon">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="3" y="5" width="18" height="16" rx="3" stroke="#00FFFF" strokeWidth="2"/>
                          <path d="M16 3V7" stroke="#00FFFF" strokeWidth="2" strokeLinecap="round"/>
                          <path d="M8 3V7" stroke="#00FFFF" strokeWidth="2" strokeLinecap="round"/>
                          <path d="M3 11H21" stroke="#00FFFF" strokeWidth="2" strokeLinecap="round"/>
                          <rect x="7.5" y="14" width="2" height="2" rx="1" fill="#00FFFF"/>
                          <rect x="11.5" y="14" width="2" height="2" rx="1" fill="#00FFFF"/>
                          <rect x="15.5" y="14" width="2" height="2" rx="1" fill="#00FFFF"/>
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="time">{t.booking.form.time}</label>
                    <select
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      required
                      className="time-select"
                    >
                      <option value="" disabled>{t.booking.form.selectTime}</option>
                      {timeSlots.map((slot, index) => (
                        <option key={index} value={slot.time}>
                          {slot.time} - {slot.period}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="participants">{t.booking.form.participants}</label>
                  <select
                    id="participants"
                    name="participants"
                    value={formData.participants}
                    onChange={handleInputChange}
                  >
                    {participantsOptions.map((option, index) => (
                      <option key={index} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">{t.booking.form.message}</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={t.booking.form.messagePlaceholder}
                    rows={4}
                  />
                </div>

                <motion.button
                  type="submit"
                  className="submit-btn"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? t.booking.form.submitting : t.booking.form.submit}
                </motion.button>
              </motion.form>
            </div>
          </motion.div>
        </section>
      </FloatingParticles>
    </>
  );
}
