import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from './components/Layout';
import './index.css';

// Page Components
import { Home } from './pages/Home';
import { About } from './pages/About';
import {
  ServicesHub,
  ServiceBridal,
  ServiceReception,
  ServicePhotoshoot,
  ServiceHaldi,
  ServiceParty,
  ServiceHairstyling,
} from './pages/Services';
import { Portfolio } from './pages/Portfolio';
import { Packages } from './pages/Packages';
import { BookNow, Contact } from './pages/Forms';
import AdminUpload from './pages/Admin';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Synchronize browser history (back / forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Intercept internal navigation clicks for silky-smooth client-side SPA transitions
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      // Ignore modified clicks (ctrl, meta, shift, middle click)
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      const anchor = (e.target as HTMLElement).closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      // Ignore external or protocol links
      if (
        anchor.target === '_blank' ||
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('javascript:')
      ) {
        return;
      }

      // Handle same-page hash links smoothly
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetEl = document.querySelector(href);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
        return;
      }

      // Internal links navigation
      try {
        const url = new URL(href, window.location.origin);
        if (url.origin === window.location.origin) {
          e.preventDefault();
          if (url.pathname !== window.location.pathname || url.hash !== window.location.hash) {
            window.history.pushState(null, '', href);
            setCurrentPath(url.pathname);

            if (url.hash) {
              setTimeout(() => {
                const targetEl = document.querySelector(url.hash);
                if (targetEl) targetEl.scrollIntoView({ behavior: 'smooth' });
              }, 120);
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }
        }
      } catch {
        // Fallback to default browser navigation if URL parsing fails
      }
    };

    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  const getRouteInfo = (p: string) => {
    const path = p.toLowerCase();
    if (path.includes('about')) return { key: 'about', Component: About };
    if (path.includes('portfolio')) return { key: 'portfolio', Component: Portfolio };
    if (path.includes('packages')) return { key: 'packages', Component: Packages };
    if (path.includes('book-now')) return { key: 'book-now', Component: BookNow };
    if (path.includes('contact')) return { key: 'contact', Component: Contact };
    if (path.includes('admin')) return { key: 'admin', Component: AdminUpload };
    if (path.includes('services/bridal-makeover')) return { key: 'svc-bridal', Component: ServiceBridal };
    if (path.includes('services/reception-makeover')) return { key: 'svc-reception', Component: ServiceReception };
    if (path.includes('services/model-photoshoot')) return { key: 'svc-photoshoot', Component: ServicePhotoshoot };
    if (path.includes('services/haldi-mehendi')) return { key: 'svc-haldi', Component: ServiceHaldi };
    if (path.includes('services/evening-party')) return { key: 'svc-party', Component: ServiceParty };
    if (path.includes('services/hair-styling')) return { key: 'svc-hair', Component: ServiceHairstyling };
    if (path.includes('services')) return { key: 'svc-hub', Component: ServicesHub };
    return { key: 'home', Component: Home };
  };

  const { key: routeKey, Component: PageComponent } = getRouteInfo(currentPath);

  return (
    <React.StrictMode>
      <Layout currentPath={currentPath}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={routeKey}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{
              duration: 0.38,
              ease: [0.22, 1, 0.36, 1], // silky-smooth quintic ease-out curve
            }}
            className="w-full flex-1 flex flex-col will-change-transform"
          >
            <PageComponent />
          </motion.div>
        </AnimatePresence>
      </Layout>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
