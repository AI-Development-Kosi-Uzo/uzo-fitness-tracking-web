### Performance Budget

- Initial JS: ≤ 180KB gzipped (route-level code splitting)
- Route chunks: ≤ 80KB each
- CSS: ≤ 30KB (Tailwind + tokens)
- LCP: ≤ 2.5s on Moto G4/Slow 4G
- TTI: ≤ 3.5s
- Images: responsive, lazy, WebP preferred; photo thumbnails ≤ 120KB
- Use `react-virtual` for large lists if needed

Code splitting plan
- Split by routes and heavy chart/photo components
- Defer editor modals and compare view


