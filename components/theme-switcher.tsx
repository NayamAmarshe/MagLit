'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import * as React from 'react'

import { Button } from '@/components/ui/button'

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme()

  return (
    <>
      <Button
        size="icon"
        className="fixed right-10 top-10 z-50"
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        <Sun className="stroke-text hidden h-6 w-6 w500:h-4 w500:w-4 dark:inline" />
        <Moon className="stroke-text inline h-6 w-6 w500:h-4 w500:w-4 dark:hidden" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </>
  )
}
