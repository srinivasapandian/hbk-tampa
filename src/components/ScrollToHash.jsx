import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Watches for route changes and scrolls to the element matching
 * the URL hash (e.g. /#contact-us → scrolls to id="contact-us").
 * Place this component inside <Router>.
 */
const ScrollToHash = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Small delay lets the page render first (especially on route change)
      const timer = setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      // No hash → scroll to top on route change
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToHash;
