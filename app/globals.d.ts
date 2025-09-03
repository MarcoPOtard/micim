// Global types and declarations for SEO optimization

declare global {
  namespace JSX {
    interface IntrinsicElements {
      script: React.DetailedHTMLProps<React.ScriptHTMLAttributes<HTMLScriptElement>, HTMLScriptElement>;
    }
  }
}

export {};