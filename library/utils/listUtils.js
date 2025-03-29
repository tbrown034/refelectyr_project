// library/utils/listUtils.js

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
 * Format list share URL for a published list
 * @param {string} type - The list type ("movies" or "tv")
 * @param {string} listId - The unique list ID
 * @returns {string} Formatted URL for sharing
 */
export function formatShareUrl(type, listId) {
  return `/lists/${type}/publish/${listId}`;
}

/**
 * Get a shareable URL for a published list
 * @param {string} type - The list type ("movies" or "tv")
 * @param {string} listId - The unique list ID
 * @returns {string} Shareable URL for the list
 */
export function getShareableUrl(type, listId) {
  // Use the current domain with the list path
  return `${window.location.origin}/lists/${type}/publish/${listId}`;
}

/**
 * Format list items for display or sharing
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
