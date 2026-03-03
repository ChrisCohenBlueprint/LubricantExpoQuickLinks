:root {
    --primary: #ffffff;
    --primary-muted: rgba(255, 255, 255, 0.7);
    --bg-dark: #0a0c10;
    --glass-bg: rgba(255, 255, 255, 0.03);
    --glass-border: rgba(255, 255, 255, 0.1);
    --text-main: #ffffff;
    --text-muted: rgba(255, 255, 255, 0.5);
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
    font-family: 'Inter', -apple-system, sans-serif;
    background-color: var(--bg-dark);
    color: var(--text-main);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    padding: 10vh 0;
}

/* Subtle White Glow Background */
.background-blobs {
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    z-index: -1; filter: blur(100px); opacity: 0.15;
}
.blob { position: absolute; border-radius: 50%; animation: blobFloat 25s infinite alternate ease-in-out; }
.blob-1 { width: 40vw; height: 40vw; background: #ffffff; top: -10%; right: -10%; }
.blob-2 { width: 30vw; height: 30vw; background: #ffffff; bottom: -5%; left: -5%; }
@keyframes blobFloat {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(20px, -30px) scale(1.05); }
    66% { transform: translate(-15px, 20px) scale(0.95); }
}

.app-container { width: 90%; max-width: 480px; text-align: center; }

/* Clean Minimal Header */
.hero-section { margin-bottom: 4rem; }
.hero-logo { width: 100px; height: auto; margin-bottom: 1.5rem; filter: brightness(0) invert(1); opacity: 0.9; }
.logo-text { font-family: 'Outfit', sans-serif; font-size: 2rem; font-weight: 800; letter-spacing: -0.5px; }
.logo-text span { color: var(--text-muted); font-weight: 400; }
.subtitle { color: var(--text-muted); margin-top: 0.8rem; font-size: 0.95rem; letter-spacing: 0.2px; }

/* Premium Glass Links */
.links-container { display: flex; flex-direction: column; gap: 1rem; }
.glass {
    background: var(--glass-bg);
    backdrop-filter: blur(25px); -webkit-backdrop-filter: blur(25px);
    border: 1px solid var(--glass-border);
    border-radius: 12px;
    padding: 1.2rem;
    transition: all 0.2s ease;
    text-decoration: none;
    display: flex; align-items: center; justify-content: center;
    min-height: 65px;
}
.glass:hover {
    background: rgba(255, 255, 255, 0.07);
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
}

.link-item span { color: white; font-weight: 500; font-size: 1.05rem; letter-spacing: 0.2px; }

/* Image handling */
.link-logo { max-width: 90px; max-height: 25px; margin-right: 1.2rem; object-fit: contain; }
img:not([src]), img[src=""] { display: none; }
