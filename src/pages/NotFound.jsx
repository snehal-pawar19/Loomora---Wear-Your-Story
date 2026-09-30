import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container not-found">
      <div className="not-found-code">404</div>
      <h1 style={{fontFamily:'var(--font-serif)',marginBottom:'1rem'}}>Page not found</h1>
      <p style={{color:'var(--color-muted)',marginBottom:'2rem'}}>
        The page you were looking for does not exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary">Back to Home</Link>
    </div>
  );
}
