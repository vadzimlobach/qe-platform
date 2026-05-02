const activeTokens = new Set<string>();

export function addToken(token: string): void {
  activeTokens.add(token);
}

export function isActiveToken(token: string): boolean {
  return activeTokens.has(token);
}

export function clearTokens(): void {
  activeTokens.clear();
}
