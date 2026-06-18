import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines standard Tailwind CSS classes with dynamic ones, resolving conflicts safely.
 * Relies on `clsx` for conditional classes and `tailwind-merge` to resolve overrides.
 * 
 * @param inputs - Array of class values (strings, objects, arrays)
 * @returns A single string of merged, deduplicated Tailwind classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
