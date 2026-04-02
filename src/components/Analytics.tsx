"use client";

import { GoogleAnalytics } from "nextjs-google-analytics";

export default function Analytics() {
  return (
    <GoogleAnalytics gaMeasurementId="G-C4Y99PY5C0" trackPageViews={true} />
  );
}
