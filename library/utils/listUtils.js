/**
 * Utility functions for working with lists in the application
 */

const LOG_PREFIX = "[listUtils]";

/**
 * Generates a unique ID for published lists
 * Combines timestamp with random string for uniqueness
 * @returns {string} Unique list ID
 */
export function generateListId() {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `list_${timestamp}_${randomStr}`;
}

/**
 * Generates a short, shareable code for public lists
 * 6 character alphanumeric code that's easy to share
 * @returns {string} Share code (e.g., "X7Kp2m")
 */
export function generateShareCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  console.log(`${LOG_PREFIX} Generated share code: ${code}`);
  return code;
}

/**
 * Format list share URL for a published list
 * @param {string} type - The list type ("movies" or "tv")
 * @param {string} listId - The unique list ID
 * @returns {string} Formatted URL for sharing
 */
export function formatShareUrl(type, listId) {
  return `/lists/${type}/publish/${listId}`;
}

/**
 * Get a shareable URL for a published list (includes domain)
 * @param {string} type - The list type ("movies" or "tv")
 * @param {string} listId - The unique list ID
 * @returns {string} Shareable URL for the list
 */
export function getShareableUrl(type, listId) {
  // Use the current domain with the list path
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  return `${baseUrl}/lists/${type}/publish/${listId}`;
}

/**
 * Format list items for display or sharing as text
 * @param {Array} items - List of items to format
 * @param {string} itemType - Type of items ("movie" or "tv")
 * @returns {string} Formatted text representation of the list
 */
export function formatListText(items, itemType) {
  if (!items || items.length === 0) return "";

  return items
    .map((item, index) => {
      const title = itemType === "movie" ? item.title : item.name;
      const year =
        itemType === "movie"
          ? item.release_date
            ? new Date(item.release_date).getFullYear()
            : "Unknown"
          : item.first_air_date
          ? new Date(item.first_air_date).getFullYear()
          : "Unknown";

      return `${index + 1}. ${title} (${year})`;
    })
    .join("\n");
}

/**
 * Format date for display in lists
 * @param {string} dateString - ISO date string
 * @param {string} format - Format type ('short' or 'long')
 * @returns {string} Formatted date string
 */
export function formatListDate(dateString, format = "short") {
  if (!dateString) return "Unknown Date";

  try {
    const options =
      format === "short"
        ? { year: "numeric", month: "short", day: "numeric" }
        : {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          };

    return new Date(dateString).toLocaleDateString(undefined, options);
  } catch (e) {
    console.error("Error formatting date:", e);
    return "Invalid Date";
  }
}
