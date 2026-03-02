import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register, signInWithGoogle } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await register(email, password);
            navigate('/');
        } catch (err) {
            setError('Failed to create an account. ' + err.message);
        }

        setLoading(false);
    }

    async function handleGoogleSignIn() {
        try {
            setError('');
            setLoading(true);
            await signInWithGoogle();
            navigate('/');
        } catch (err) {
            setError('Failed to sign in with Google. ' + err.message);
        }
        setLoading(false);
    }

    return (
        <div className="auth-container">
            <div className="auth-card glass-panel">
                <h2 className="title">Sign Up</h2>
                {error && <div className="error-alert">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input-field"
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-field"
                        />
                    </div>
                    <button disabled={loading} type="submit" className="button start">
                        Register for Duty
                    </button>
                    <div style={{ margin: '1rem 0', textAlign: 'center', color: 'var(--text-muted)' }}>OR</div>
                    <button
                        disabled={loading}
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="button secondary"
                        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M21.35 11.1H12.1v2.79h5.33c-.23 1.25-.94 2.31-2 3L17.8 19c2.16-2 3.4-5 3.4-7.9c0-.7-.07-1.3-.15-1.9z" />
                            <path fill="currentColor" d="M12.1 21c2.43 0 4.47-.8 5.96-2.18L15.6 16.5c-.68.46-1.55.74-2.5.74c-1.92 0-3.53-1.3-4.11-3.05L6.44 14.9c1.15 2.27 3.5 3.86 6.23 3.86z" />
                            <path fill="currentColor" d="M7.99 14.19c-.14-.43-.23-.88-.23-1.34c0-.46.09-.91.23-1.34L5.43 9.4c-.6 1.18-.94 2.51-.94 3.91s.34 2.73.94 3.91l2.56-2.03z" />
                            <path fill="currentColor" d="M12.1 6.74c1.32 0 2.5.45 3.44 1.35l2.58-2.58C16.56 4.01 14.53 3 12.1 3C9.37 3 7.02 4.59 5.87 6.86l2.56 2.03c.58-1.75 2.19-3.15 4.11-3.15z" />
                        </svg>
                        Sign in with Google
                    </button>
                </form>
                <div className="auth-link">
                    Already have an account? <Link to="/login">Log In</Link>
                </div>
            </div>
        </div>
    );
}
