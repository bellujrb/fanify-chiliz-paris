import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility function to convert Oracle status numbers to readable text
export function getStatusText(status: number | string): string {
  const statusNum = typeof status === 'string' ? parseInt(status) : status;
  
  switch (statusNum) {
    case 0:
      return "Scheduled";
    case 1:
      return "Open";
    case 2:
      return "Closed";
    case 3:
      return "Finished";
    default:
      return `Unknown (${status})`;
  }
}

// Utility function to get status color for styling
export function getStatusColor(status: number | string): string {
  const statusNum = typeof status === 'string' ? parseInt(status) : status;
  
  switch (statusNum) {
    case 0:
      return "text-blue-600 bg-blue-100"; // Scheduled
    case 1:
      return "text-green-600 bg-green-100"; // Open
    case 2:
      return "text-orange-600 bg-orange-100"; // Closed
    case 3:
      return "text-red-600 bg-red-100"; // Finished
    default:
      return "text-gray-600 bg-gray-100"; // Unknown
  }
}
