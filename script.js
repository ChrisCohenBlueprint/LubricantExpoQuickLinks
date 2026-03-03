document.addEventListener('DOMContentLoaded', () => {
    const linksList = document.getElementById('links-list');
    const API_BASE = '/api'; 

    async function fetchLinks() {
        try {
            const response = await fetch(`${API_BASE}/links`);
            const links = await response.json();
            if (links.length === 0) renderFallbackLinks();
            else renderLinks(links);
        } catch (error) {
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
            { title: 'Social: Lubricant Expo', url: 'https://www.linkedin.com/company/lubricant-expo' },
            { title: 'Social: Middle East', url: 'https://www.linkedin.com/company/lubricant-expo-middle-east' },
            { title: 'Social: North America', url: 'https://www.linkedin.com/company/lubricant-expo-north-america' }
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
