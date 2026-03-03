document.addEventListener('DOMContentLoaded', () => {
    const linksList = document.getElementById('links-list');
    const API_BASE = '/api'; 

    async function fetchLinks() {
        try {
            const response = await fetch(`${API_BASE}/links`);
            if (!response.ok) throw new Error('API Sync failed');
            const links = await response.json();
            if (!links || links.length === 0) renderFallbackLinks();
            else renderLinks(links);
        } catch (error) {
            console.warn('Local database sync unavailable, using default links.');
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
                img.onerror = () => img.remove();
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
            { title: 'Lubricant Expo North America', url: 'https://lubricantexpo.com/na/', icon: 'assets/logo-na.png' },
            { title: 'Lubricant Expo Europe', url: 'https://lubricantexpo.com/eu/', icon: 'assets/logo-eu.png' },
            { title: 'Lubricant Expo Middle East', url: 'https://lubricantexpo.com/me/', icon: 'assets/logo-me.png' },
            { title: 'LinkedIn: Lubricant Expo Global', url: 'https://www.linkedin.com/company/lubricant-expo', icon: 'https://cdn-icons-png.flaticon.com/512/174/174857.png' },
            { title: 'LinkedIn: Lubricant Expo Europe', url: 'https://www.linkedin.com/company/lubricant-expo-europe', icon: 'https://cdn-icons-png.flaticon.com/512/174/174857.png' },
            { title: 'LinkedIn: Lubricant Expo Middle East', url: 'https://www.linkedin.com/company/lubricant-expo-middle-east', icon: 'https://cdn-icons-png.flaticon.com/512/174/174857.png' },
            { title: 'LinkedIn: Lubricant Expo North America', url: 'https://www.linkedin.com/company/lubricant-expo-north-america', icon: 'https://cdn-icons-png.flaticon.com/512/174/174857.png' }
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
                img.onerror = () => img.remove();
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
