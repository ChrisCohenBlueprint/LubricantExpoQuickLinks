document.addEventListener('DOMContentLoaded', () => {
    const linksList = document.getElementById('links-list');
    const API_BASE = '/api';

    async function fetchLinks() {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500); // 3.5s timeout

        try {
            const response = await fetch(`${API_BASE}/links`, { signal: controller.signal });
            clearTimeout(timeoutId);
            const links = await response.json();

            if (!links || links.length === 0) {
                renderFallbackLinks();
            } else {
                renderLinks(links);
            }
        } catch (error) {
            clearTimeout(timeoutId);
            console.warn('API slow or unavailable, showing fallback links.');
            renderFallbackLinks();
        }
    }

    function renderLinks(links) {
        linksList.innerHTML = '';
        links.forEach((link, index) => {
            const a = document.createElement('a');
            a.href = `/l/${link._id}`;
            a.className = 'link-item glass';

            if (link.icon) {
                const img = document.createElement('img');
                img.src = link.icon;
                img.className = 'link-logo';
                // Try to find it in the same folder if assets/ path fails
                img.onerror = () => {
                    const originalSrc = img.src;
                    if (originalSrc.includes('assets/')) {
                        img.src = originalSrc.split('assets/')[1];
                    } else {
                        img.remove();
                    }
                };
                a.appendChild(img);
            }

            const span = document.createElement('span');
            span.textContent = link.title;
            a.appendChild(span);
            linksList.appendChild(a);

            setTimeout(() => a.classList.add('visible'), 100 * index);
        });
    }

    function renderFallbackLinks() {
        // Updated paths to check both the root and assets/ folder based on your GitHub screenshot
        const fallback = [
            { title: 'Lubricant Expo North America', url: 'https://lubricantexpo.com/na/', icon: 'logo-na.png' },
            { title: 'Lubricant Expo Europe', url: 'https://lubricantexpo.com/eu/', icon: 'logo-eu.png' },
            { title: 'Lubricant Expo Middle East', url: 'https://lubricantexpo.com/me/', icon: 'logo-me.png' },
            { title: 'LinkedIn: Lubricant Expo North America', url: 'https://www.linkedin.com/company/lubricant-expo-north-america', icon: 'https://cdn-icons-png.flaticon.com/512/174/174857.png' },
            { title: 'LinkedIn: Lubricant Expo Middle East', url: 'https://www.linkedin.com/company/lubricant-expo-middle-east', icon: 'https://cdn-icons-png.flaticon.com/512/174/174857.png' },
            { title: 'LinkedIn: Lubricant Expo Europe', url: 'https://www.linkedin.com/company/lubricant-expo-europe', icon: 'https://cdn-icons-png.flaticon.com/512/174/174857.png' }
        ];

        linksList.innerHTML = '';
        fallback.forEach((link, index) => {
            const a = document.createElement('a');
            a.href = link.url;
            a.target = '_blank';
            a.className = 'link-item glass';

            if (link.icon) {
                const img = document.createElement('img');
                img.src = link.icon;
                img.className = 'link-logo';
                img.onerror = () => {
                    // If it can't find it in root, try checking the assets folder
                    if (!img.src.includes('assets/')) {
                        img.src = 'assets/' + link.icon;
                    } else {
                        img.remove();
                    }
                };
                a.appendChild(img);
            }

            const span = document.createElement('span');
            span.textContent = link.title;
            a.appendChild(span);
            linksList.appendChild(a);

            setTimeout(() => a.classList.add('visible'), 100 * index);
        });
    }

    fetchLinks();
});
