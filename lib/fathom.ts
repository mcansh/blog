interface Fathom {
  (...args: any[]): void;
  q?: Array<IArguments>;
}

declare global {
  interface Window {
    fathom: Fathom;
  }
}

const getFathom = (...args: any[]): Fathom =>
  (window.fathom =
    window.fathom ||
    // eslint-disable-next-line func-names
    function () {
      (window.fathom.q = window.fathom.q ?? []).push(...args);
    });

const load = (
  url = 'https://cdn.usefathom.com/3.js',
  customDomain?: string
) => {
  getFathom();

  const fathomTracker = document.createElement('script');

  const firstScript = document.getElementsByTagName('script')[0];

  fathomTracker.async = true;
  fathomTracker.src = url;
  fathomTracker.id = 'fathom-script';

  if (firstScript?.parentNode) {
    firstScript.parentNode.insertBefore(fathomTracker, firstScript);
  }

  if (customDomain) {
    const siteTracker = document.createElement('script');
    siteTracker.async = true;
    siteTracker.src = customDomain;
    if (firstScript?.parentNode) {
      firstScript.parentNode.insertBefore(siteTracker, firstScript);
    }
  }
};

const setSiteId = (siteId: string) => {
  const fathom = getFathom();
  fathom('set', 'siteId', siteId);
};

const trackPageview = () => {
  const fathom = getFathom();
  fathom('trackPageview');
};

const trackGoal = (id: string, cents: number) => {
  const fathom = getFathom();
  fathom('trackGoal', id, cents);
};

export { load, setSiteId, trackPageview, trackGoal };
