'use client'

import * as React from 'react'  //Imports React library.
import {
  ThemeProvider as NextThemesProvider, // Renames ThemeProvider to NextThemesProvider to avoid naming conflicts.
  type ThemeProviderProps, // Imports the type for ThemeProviderProps for TypeScript type checking.
} from 'next-themes' // Imports from next-themes package for theme management.

export function ThemeProvider({ children, ...props }: ThemeProviderProps) { // ThemeProvider component definition.
  return <NextThemesProvider {...props}>{children}</NextThemesProvider> // Renders NextThemesProvider with passed props and children.
}
