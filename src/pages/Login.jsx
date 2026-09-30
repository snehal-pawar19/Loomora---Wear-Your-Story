import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail } from 'lucide-react';
import { useShop } from '../context/ShopContext.jsx';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useShop();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const errs = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errs.email = 'Email is required';
    } else if (!emailRegex.test(email.trim())) {
      errs.email = 'Enter a valid email address';
    }
    if (!password) {
      errs.password = 'Password is required';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => {
      login('Loomora Member', email.trim());
      setSubmitting(false);
      navigate('/');
    }, 300);
  };

  const demoLogin = () => {
    setEmail('demo@loomora.com');
    setPassword('demo1234');
    setErrors({});
    setTimeout(() => {
      login('Loomora Member', 'demo@loomora.com');
      navigate('/');
    }, 300);
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <h2>Welcome Back</h2>
        <p className="auth-sub">Sign in to access your wishlist, orders, and more.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className={`form-input ${errors.email ? 'error' : ''}`}
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
            {errors.email && <p className="form-error">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <div className="password-wrap">
              <input
                id="password"
                type={show ? 'text' : 'password'}
                className={`form-input ${errors.password ? 'error' : ''}`}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="At least 6 characters"
              />
              <span
                className="password-toggle"
                onClick={() => setShow(s => !s)}
                role="button"
                aria-label={show ? 'Hide password' : 'Show password'}
              >
                {show ? <EyeOff size={16}/> : <Eye size={16}/>}
              </span>
            </div>
            {errors.password && <p className="form-error">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-full"
            disabled={submitting}
            style={{padding:'14px'}}
          >
            {submitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="form-divider"><span>or</span></div>

        <button
          type="button"
          className="btn btn-outline btn-full"
          onClick={demoLogin}
        >
          <Mail size={16}/> Continue with Demo Account
        </button>

        <p style={{textAlign:'center',fontSize:13,color:'var(--color-muted)',marginTop:'1.5rem'}}>
          New to Loomora?{' '}
          <Link to="/products" style={{color:'var(--color-accent)',fontWeight:500}}>
            Shop now
          </Link>
        </p>
      </div>
    </div>
  );
}
