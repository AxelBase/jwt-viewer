// Utility functions for decoding and formatting
// Supports FR-01 (Decode Header), FR-02 (Decode Payload), FR-06 (Timestamps), FR-07 (Raw Encoding)

// Base64Url decode (RFC 4648 §5)
export function base64UrlDecode(str: string): string {
  // Replace URL-safe chars with standard Base64
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  // Add padding if needed
  switch (str.length % 4) {
    case 2:
      str += '==';
      break;
    case 3:
      str += '=';
      break;
  }
  return atob(str);
}

// Safe JSON parse (returns null on failure)
export function safeJsonParse(str: string): any | null {
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
}

// Format Unix timestamp to human-readable UTC string
export function formatTimestamp(unix: number): string {
  return new Date(unix * 1000).toLocaleString('en-US', {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }) + ' UTC';
}