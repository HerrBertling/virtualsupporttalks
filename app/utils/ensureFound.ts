/**
 * Narrows `T | null | undefined` to `T` by throwing a 404 Response if the
 * value is nullish. Useful in route loaders so the return type stays tight
 * and React Router's generated route types flow end-to-end.
 */
export function ensureFound<T>(value: T | null | undefined, message = "Not Found"): T {
  if (value == null) {
    throw new Response(message, { status: 404 });
  }
  return value;
}
