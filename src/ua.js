export function isWX() {
  const ua = navigator.userAgent.toLowerCase();
  return ua.includes('micromessenger');
}

export function isWin() {
  const { platform } = navigator
  return ['Win32', 'Windows'].includes(platform)
}