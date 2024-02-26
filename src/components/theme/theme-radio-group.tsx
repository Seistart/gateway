'use client';

import {
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';
import { useTheme } from 'next-themes';

export function ThemeRadioGroup() {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
      <DropdownMenuRadioItem value='light'>Light</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value='dark'>Dark</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value='system'>System</DropdownMenuRadioItem>
    </DropdownMenuRadioGroup>
  );
}
