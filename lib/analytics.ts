type AnalyticsEvent =
  | 'click_line'
  | 'click_call'
  | 'click_email'
  | 'click_homepro'
  | 'click_shopee'
  | 'click_lazada'
  | 'click_tiktok'
  | 'view_product'
  | 'view_blog'
  | 'filter_product'
  | 'click_product_card'
  | 'click_blog_card';

export function trackEvent(eventName: AnalyticsEvent, params: Record<string, string | number | boolean | undefined> = {}) {
  if (typeof window === 'undefined') return;

  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag === 'function') {
    gtag('event', eventName, params);
    return;
  }

  const dataLayer = (window as Window & { dataLayer?: unknown[] }).dataLayer;
  if (Array.isArray(dataLayer)) {
    dataLayer.push({ event: eventName, ...params });
  }
}

export function trackPageView(pathname: string) {
  trackEvent('view_product', { pathname });
}
