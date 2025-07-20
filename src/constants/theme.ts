// Theme constants for Pallenote app

export const lightTheme = {
  background: "#FFFFFF",
  surface: "#F8F9FA",
  text: "#1F2937",
  textSecondary: "#6B7280",
  primary: "#007AFF",
  accent: "#F3F4F6",
  border: "#E5E7EB",
  notification: "#FF3B30",
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
  // Additional colors for better theming
  card: "#FFFFFF", // For backward compatibility
  disabled: "#9CA3AF",
  placeholder: "#D1D5DB",
  shadow: "#000000",
} as const

export const darkTheme = {
  background: "#111827",
  surface: "#1F2937",
  text: "#F9FAFB",
  textSecondary: "#9CA3AF",
  primary: "#3B82F6",
  accent: "#374151",
  border: "#4B5563",
  notification: "#FF453A",
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
  // Additional colors for better theming
  card: "#1F2937", // For backward compatibility
  disabled: "#6B7280",
  placeholder: "#6B7280",
  shadow: "#000000",
} as const

export type ThemeColors = typeof lightTheme

// Theme configuration
export const theme = {
  light: lightTheme,
  dark: darkTheme,
  // Theme spacing
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  // Border radius
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  // Typography
  typography: {
    sizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
      xxxl: 32,
    },
    weights: {
      normal: "400" as const,
      medium: "500" as const,
      semibold: "600" as const,
      bold: "700" as const,
    },
    lineHeights: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  // Shadows
  shadows: {
    sm: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    lg: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 5,
    },
  },
  // Animation durations
  animations: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
} as const

// Helper functions for theme usage
export const getThemeColors = (isDark: boolean): ThemeColors => {
  return isDark ? darkTheme : lightTheme
}

// Color utility functions
export const hexToRgba = (hex: string, alpha: number): string => {
  const r = Number.parseInt(hex.slice(1, 3), 16)
  const g = Number.parseInt(hex.slice(3, 5), 16)
  const b = Number.parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

// Theme-aware color functions
export const getContrastColor = (backgroundColor: string): string => {
  // Simple contrast calculation - in a real app you might want a more sophisticated algorithm
  const hex = backgroundColor.replace("#", "")
  const r = Number.parseInt(hex.substr(0, 2), 16)
  const g = Number.parseInt(hex.substr(2, 2), 16)
  const b = Number.parseInt(hex.substr(4, 2), 16)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness > 128 ? "#000000" : "#FFFFFF"
}

// Status bar style helper
export const getStatusBarStyle = (isDark: boolean): "light-content" | "dark-content" => {
  return isDark ? "light-content" : "dark-content"
}

// Common component styles that use theme
export const createThemedStyles = (colors: ThemeColors) => ({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  surface: {
    backgroundColor: colors.surface,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.sm,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    ...theme.shadows.md,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  buttonText: {
    color: colors.background,
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.semibold,
  },
  input: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    fontSize: theme.typography.sizes.md,
    color: colors.text,
  },
  text: {
    color: colors.text,
    fontSize: theme.typography.sizes.md,
  },
  textSecondary: {
    color: colors.textSecondary,
    fontSize: theme.typography.sizes.sm,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
})

export default theme
