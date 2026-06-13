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
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', syncCounts);
    } else {
        syncCounts();
    }
})();