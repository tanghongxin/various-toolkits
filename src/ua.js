export function isWX() {
  const ua = navigator.userAgent.toLowerCase();
  return ua.includes('micromessenger');
}