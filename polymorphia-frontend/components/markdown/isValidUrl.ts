export const isValidUrl = (url: string | undefined): boolean => {
  if (!url) {
    return false;
  }
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};