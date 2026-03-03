document.addEventListener('DOMContentLoaded', () => {
    const linksList = document.getElementById('links-list');
    const API_BASE = '/api';

    /**
     * Initial Fetch: Try the MongoDB Sync first.
     * If the server isn't running or feels slow, the fallback logic kicks in instantly.
     */
    async function fetchLinks() {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 2000); // 2 second timeout for speed

            const response = await fetch(`${API_BASE}/links`, { signal: controller.signal });
            clearTimeout(timeoutId);

            if (!response.ok) throw new Error('Sync interrupted');

            const links = await response.json();
            if (!links || links.length === 0) {
                renderFallbackLinks();
            } else {
                renderLinks(links);
            }
        } catch (error) {
            console.warn('Backend link sync unavailable. Loading local priority assets.');
            renderFallbackLinks();
        }
    }

    /**
     * Component: Server-Side Managed Links
     */
    function renderLinks(links) {
        linksList.innerHTML = '';
        links.sort((a, b) => (a.order || 0) - (b.order || 0));

        links.forEach((link, index) => {
            const a = createLinkElement(link, index, false);
            linksList.appendChild(a);
        });
    }

    /**
     * Component: High-Fidelity Fallback & Initial Assets
     * Specifically built with regional LinkedIn titles and icons.
     */
    function renderFallbackLinks() {
        const fallback = [
            { title: 'Lubricant Expo North America', url: 'https://lubricantexpo.com/na/', icon: 'assets/logo-na.png' },
            { title: 'Lubricant Expo Europe', url: 'https://lubricantexpo.com/eu/', icon: 'assets/logo-eu.png' },
            { title: 'Lubricant Expo Middle East', url: 'https://lubricantexpo.com/me/', icon: 'assets/logo-me.png' },
            { title: 'LinkedIn: Lubricant Expo Global', url: 'https://www.linkedin.com/company/lubricant-expo', icon: 'https://cdn-icons-png.flaticon.com/512/174/174857.png' },
            { title: 'LinkedIn: Lubricant Expo Europe', url: 'https://www.linkedin.com/company/lubricant-expo-europe', icon: 'https://cdn-icons-png.flaticon.com/512/174/174857.png' },
            { title: 'LinkedIn: Lubricant Expo Middle East', url: 'https://www.linkedin.com/company/lubricant-expo-middle-east', icon: 'https://cdn-icons-png.flaticon.com/512/174/174857.png' },
            { title: 'LinkedIn: Lubricant Expo North America', url: 'https://www.linkedin.com/company/lubricant-expo-north-america', icon: 'https://cdn-icons-png.flaticon.com/512/174/174857.png' }
        ];

        linksList.innerHTML = '';
        fallback.forEach((link, index) => {
            const a = createLinkElement(link, index, true);
            linksList.appendChild(a);
        });
    }

    /**
     * Component Factory: Premium Link Card
     * Handles staggered animations and icon rendering.
     */
    function createLinkElement(link, index, isExternal) {
        const a = document.createElement('a');
        a.href = isExternal ? link.url : `/l/${link._id}`;
        a.target = isExternal || link.isExternal ? '_blank' : '_self';
        a.className = 'link-item';

        // Icon Logic
        if (link.icon) {
            const img = document.createElement('img');
            img.src = link.icon;
            img.className = 'link-logo';
            img.alt = '';
            img.onerror = () => {
                // If it's a relative path, try checking one level up
                if (!link.icon.startsWith('http')) {
                    img.src = '../' + link.icon;
                } else {
                    img.remove();
                }
            };
            a.appendChild(img);
        }

        const span = document.createElement('span');
        span.textContent = link.title;
        a.appendChild(span);

        // STAGGERED ENTRANCE EFFECT
        // Gives each link a slightly delayed pop-in for that "living app" feel
        setTimeout(() => {
            a.classList.add('visible');
        }, 80 * index);

        return a;
    }

    // Initialize
    fetchLinks();
});
