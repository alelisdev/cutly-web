import { BrowserOptions } from "@sentry/browser";
import { BrowserTracing } from "@sentry/tracing";

export const SentryOptions: BrowserOptions = {
  debug: false,
  tracesSampleRate: 1.0,
  integrations: [new BrowserTracing()],
  dsn: "https://0faac7905fb5452cb69769cfcbcaf5bf@o1165620.ingest.sentry.io/6255800",

}