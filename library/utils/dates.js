// library/utils/dates.js

/**
 * Formats a date string into just the year
 * @param {string} dateString - Date string in YYYY-MM-DD format
 * @param {string} defaultValue - Value to return if date is invalid
 * @returns {string} - Formatted year or default value
 */
export function formatYear(dateString, defaultValue = "Unknown") {
  if (!dateString) return defaultValue;

  try {
    return new Date(dateString).getFullYear().toString();
  } catch (error) {
    console.error("Error formatting date year:", error);
    return defaultValue;
  }
}

/**
 * Formats a date string into a readable format
 * @param {string} dateString - Date string in YYYY-MM-DD format
 * @param {string} defaultValue - Value to return if date is invalid
 * @returns {string} - Formatted date or default value
 */
export function formatDate(dateString, defaultValue = "Unknown release date") {
  if (!dateString) return defaultValue;

  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return defaultValue;
  }
}
