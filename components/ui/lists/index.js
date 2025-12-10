// Export all list theme components
export { default as ListThemeClassic } from "./ListThemeClassic";
export { default as ListThemePosterGrid } from "./ListThemePosterGrid";
export { default as ListThemeFamilyFeud } from "./ListThemeFamilyFeud";
export { default as ListThemeAwards } from "./ListThemeAwards";
export { default as ListThemeMinimalist } from "./ListThemeMinimalist";

// Theme renderer component
import ListThemeClassic from "./ListThemeClassic";
import ListThemePosterGrid from "./ListThemePosterGrid";
import ListThemeFamilyFeud from "./ListThemeFamilyFeud";
import ListThemeAwards from "./ListThemeAwards";
import ListThemeMinimalist from "./ListThemeMinimalist";

const THEME_COMPONENTS = {
  classic: ListThemeClassic,
  "poster-grid": ListThemePosterGrid,
  "family-feud": ListThemeFamilyFeud,
  awards: ListThemeAwards,
  minimalist: ListThemeMinimalist,
};

export function ListThemeRenderer({
  list,
  theme = "classic",
  accentColor,
  isEditable = false,
  onUpdateComment,
  onUpdateRating,
}) {
  const ThemeComponent = THEME_COMPONENTS[theme] || ListThemeClassic;

  return (
    <ThemeComponent
      list={list}
      accentColor={accentColor || list?.accentColor}
      isEditable={isEditable}
      onUpdateComment={onUpdateComment}
      onUpdateRating={onUpdateRating}
    />
  );
}
