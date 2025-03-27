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
 * @param {string} listId - The unique list ID
 * @returns {string} Formatted URL for sharing
 */
export function formatShareUrl(listId) {
  // In a real app, this would use the actual domain
  // For now we use relative URL
  return `/shared/${listId}`;
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
