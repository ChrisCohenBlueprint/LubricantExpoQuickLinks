document.addEventListener('DOMContentLoaded', () => {
    const linksList = document.getElementById('links-list');

    // In a real scenario, this would be the actual API URL on Render
    const API_BASE = '/api';

    async function fetchLinks() {
        try {
            const response = await fetch(`${API_BASE}/links`);
            const links = await response.json();

            if (links.length === 0) {
                linksList.innerHTML = '<p class="subtitle" style="text-align:center">No links found.</p>';
                return;
            }

            renderLinks(links);
        } catch (error) {
            console.error('Error fetching links:', error);
            // Fallback for demonstration if API isn't live yet
            renderFallbackLinks();
        }
    }

    function renderLinks(links) {
        linksList.innerHTML = '';
        links.forEach(link => {
            const a = document.createElement('a');
            a.href = `/l/${link._id}`;
            a.className = 'link-item glass';

            if (link.icon) {
                const img = document.createElement('img');
                img.src = link.icon;
                img.className = 'link-logo';
                a.appendChild(img);
            }

            const span = document.createElement('span');
            span.textContent = link.title;
            a.appendChild(span);

            linksList.appendChild(a);
        });
    }

    function renderFallbackLinks() {
        const fallback = [
            { title: 'Lubricant Expo North America', url: 'https://lubricantexpo.com/na/', icon: 'public/assets/logo-na.png' },
            { title: 'Lubricant Expo Europe', url: 'https://lubricantexpo.com/eu/', icon: 'public/assets/logo-eu.png' },
            { title: 'Lubricant Expo Middle East', url: 'https://lubricantexpo.com/me/', icon: 'public/assets/logo-me.png' },
            { title: 'LinkedIn: Lubricant Expo', url: 'https://www.linkedin.com/company/lubricant-expo' },
            { title: 'LinkedIn: Lubricant Expo Middle East', url: 'https://www.linkedin.com/company/lubricant-expo-middle-east' },
            { title: 'LinkedIn: Lubricant Expo North America', url: 'https://www.linkedin.com/company/lubricant-expo-north-america' }
        ];

        linksList.innerHTML = '';
        fallback.forEach(link => {
            const a = document.createElement('a');
            a.href = link.url;
            a.target = '_blank';
            a.className = 'link-item glass';

            if (link.icon) {
                const img = document.createElement('img');
                img.src = link.icon;
                img.className = 'link-logo';
                a.appendChild(img);
            }

            const span = document.createElement('span');
            span.textContent = link.title;
            a.appendChild(span);

            linksList.appendChild(a);
        });
    }

    fetchLinks();
});
