// TypeScript interfaces for JWT structure
// Supports FR-01 (Header), FR-02 (Payload), FR-04 (Standard Claims)

export interface JwtHeader {
  alg?: string;          // Algorithm (e.g., "HS256")
  typ?: string;          // Type (e.g., "JWT")
  kid?: string;          // Key ID
  [key: string]: any;    // Custom fields
}

export interface JwtPayload {
  iss?: string;          // Issuer
  sub?: string;          // Subject
  aud?: string | string[]; // Audience
  exp?: number;          // Expiration time (Unix timestamp)
  nbf?: number;          // Not before (Unix timestamp)
  iat?: number;          // Issued at (Unix timestamp)
  jti?: string;          // JWT ID
  [key: string]: any;    // Custom claims
}