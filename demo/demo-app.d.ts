declare module '*.css' {
  const content: CSSStyleSheet;
  export default content;
}

declare module '*.json' {
  const content: Record<string, string|number|string[]|number[]>
  export default content;
}
