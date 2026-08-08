import { useEffect } from 'react';
import { adsenseClient } from './config';

const SCRIPT_ID = 'google-adsense-script';

export function AdSenseScript() {
  useEffect(() => {
    if (!adsenseClient) return;
    if (document.getElementById(SCRIPT_ID)) return;

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(adsenseClient)}`;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
  }, []);

  return null;
}
