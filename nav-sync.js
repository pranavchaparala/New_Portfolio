/**
 * nav-sync.js — Syncs nav counts dynamically from projectsData and experimentsData
 * Load this on every page to keep nav badge counts consistent.
 */
(function () {
    function syncCounts() {
        // Update projects count
        if (typeof projectsData !== 'undefined') {
            const projCount = projectsData.length;
            document.querySelectorAll('#nav-projects-count, #projects-count, #projects-count-title').forEach(el => {
                el.textContent = projCount;
            });
        }
        // Update experiments count
        if (typeof experimentsData !== 'undefined') {
            const expCount = experimentsData.length;
            document.querySelectorAll('#nav-experiments-count, #experiments-count, #experiments-count-title').forEach(el => {
                el.textContent = expCount;
            });
        }
    }

    function updateClocks() {
        const localTimeEl = document.getElementById('nyc-local-time');
        const tzListEl = document.getElementById('other-timezones-list');
        if (!localTimeEl && !tzListEl) return;

        const now = new Date();
        if (localTimeEl) {
            localTimeEl.textContent = now.toLocaleTimeString('en-US', {
                timeZone: 'America/New_York',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            }) + ' EST';
        }
        if (tzListEl) {
            const zones = [
                { name: 'San Francisco', zone: 'America/Los_Angeles', label: 'PST' },
                { name: 'London', zone: 'Europe/London', label: 'BST' },
                { name: 'Tokyo', zone: 'Asia/Tokyo', label: 'JST' }
            ];
            tzListEl.innerHTML = zones.map(z => {
                const zTime = now.toLocaleTimeString('en-US', {
                    timeZone: z.zone,
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                });
                return `<div class="timezone-row"><span>${z.name}</span><strong>${zTime} ${z.label}</strong></div>`;
            }).join('');
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => { syncCounts(); updateClocks(); });
    } else {
        syncCounts();
        updateClocks();
    }
    setInterval(updateClocks, 1000);
})();
