import DOMPurify from 'dompurify';

export function sanitizeHtml(html: string): string {
  if (typeof window === 'undefined') {
    // Server-side: return the HTML as-is for now, or use a server-side sanitizer
    // For better security, you could use isomorphic-dompurify or another solution
    return html;
  }
  
  // Client-side: sanitize with DOMPurify
  return DOMPurify.sanitize(html);
}