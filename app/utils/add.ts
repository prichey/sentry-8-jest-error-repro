import "server-only";
import { captureException } from "@sentry/nextjs";

export function add(a: number, b: number) {
  try {
    return a + b;
  } catch (e) {
    captureException(e);
    throw e;
  }
}
