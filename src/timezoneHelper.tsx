export default function getTimeZone(): string | undefined {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz) {
      return tz;
    }
  } catch (err) {
    // whatever this browser dosn't support it
  }
  return undefined;
}
