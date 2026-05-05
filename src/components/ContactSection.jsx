import { useState, useRef, useEffect } from 'react';
import './ContactSection.css';
import vector from '../asserts/Vector.png';

const GOOGLE_MAP_EMBED_URL =
  'https://www.google.com/maps?q=19430+Bruce+B+Downs+Blvd,+Tampa,+FL+33647&output=embed';

const COUNTRY_CODES = ['+1', '+44', '+91', '+61', '+81', '+86', '+971'];

const ContactSection = ({ mapUrl }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+1',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const formRef = useRef(null);
  const dropdownRef = useRef(null);

  const embedUrl = mapUrl || GOOGLE_MAP_EMBED_URL;

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const selectCountryCode = (code) => {
    setFormData((prev) => ({ ...prev, countryCode: code }));
    setDropdownOpen(false);
  };

  const validate = () => {
    const { firstName, lastName, email, phone } = formData;
    if (!firstName.trim() || !lastName.trim()) return false;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return false;
    if (!/^\d{7,15}$/.test(phone.replace(/\D/g, ''))) return false;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      setStatus('error');
      setTimeout(() => setStatus(null), 3500);
      return;
    }

    setSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        countryCode: '+1',
        phone: '',
        message: '',
      });
    } catch {
      setStatus('error');
    } finally {
      setSubmitting(false);
      setTimeout(() => setStatus(null), 4000);
    }
  };

  return (
    <section id="contact-us" className="contact-section">
      <div className="contact-section__inner">
        {/* ── Heading ── */}
        <div className="contact-section__heading-row">
          <h2 className="contact-section__heading title-with-line">Contact Us</h2>
          <img src={vector} alt="Cloche" className="contact-section__heading-icon" />
        </div>

        {/* ── 2-Column Grid ── */}
        <div className="contact-section__grid">
          {/* LEFT — Contact Info + Google Map */}
          <div className="contact-section__left-col">
            <div className="contact-section__info">
              <h3 className="contact-info__title">Contact Info</h3>
              <div className="contact-info__underline"></div>
              
              <div className="contact-info__items">
                <div className="contact-info__item">
                  <span className="contact-info__icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </span>
                  <p className="contact-info__text">
                    19430 Bruce B Downs Blvd, <br />
                    Tampa, FL 33647
                  </p>
                </div>

                <div className="contact-info__item">
                  <span className="contact-info__icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </span>
                  <p className="contact-info__text">813-667-6445</p>
                </div>

                <div className="contact-info__item">
                  <span className="contact-info__icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </span>
                  <p className="contact-info__text">hbktampa.com</p>
                </div>
              </div>
            </div>

            <div className="contact-section__map-wrapper">
              <iframe
                src={embedUrl}
                title="Restaurant Location"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>

          {/* RIGHT — Contact Form */}
          <div className="contact-section__form-wrapper">
            <h3 className="contact-section__subtitle">Get In Touch</h3>
            <p className="contact-section__description">
              Have questions about our menu, want to make a reservation, or need catering for your
              next event? We'd love to hear from you. Send us a message and we'll get back to you as
              soon as possible.
            </p>

            <form
              ref={formRef}
              className="contact-section__form"
              onSubmit={handleSubmit}
              noValidate
            >
              {/* First Name / Last Name */}
              <div className="contact-section__row">
                <input
                  className="contact-section__input"
                  type="text"
                  name="firstName"
                  placeholder="First Name *"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <input
                  className="contact-section__input"
                  type="text"
                  name="lastName"
                  placeholder="Last Name *"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email */}
              <input
                className="contact-section__input"
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />

              {/* Country code (custom dropdown) + Phone */}
              <div className="contact-section__phone-row">
                <div
                  className={`contact-section__dropdown${dropdownOpen ? ' contact-section__dropdown--open' : ''}`}
                  ref={dropdownRef}
                >
                  <button
                    type="button"
                    className="contact-section__dropdown-trigger"
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    aria-haspopup="listbox"
                    aria-expanded={dropdownOpen}
                  >
                    <span>{formData.countryCode}</span>
                    <svg
                      className="contact-section__dropdown-arrow"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>

                  {dropdownOpen && (
                    <ul className="contact-section__dropdown-menu" role="listbox">
                      {COUNTRY_CODES.map((code) => (
                        <li
                          key={code}
                          role="option"
                          aria-selected={formData.countryCode === code}
                          className={`contact-section__dropdown-item${
                            formData.countryCode === code ? ' contact-section__dropdown-item--active' : ''
                          }`}
                          onClick={() => selectCountryCode(code)}
                        >
                          {code}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <input
                  className="contact-section__input"
                  type="tel"
                  name="phone"
                  placeholder="Phone Number *"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Message */}
              <textarea
                className="contact-section__textarea"
                name="message"
                placeholder="Tell us how we can help you..."
                value={formData.message}
                onChange={handleChange}
                rows={5}
              />

              {/* Status messages */}
              {status === 'success' && (
                <div className="contact-section__message contact-section__message--success">
                  ✓ Your message has been sent successfully!
                </div>
              )}
              {status === 'error' && (
                <div className="contact-section__message contact-section__message--error">
                  Please fill in all required fields correctly.
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="contact-section__submit"
                disabled={submitting}
              >
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
