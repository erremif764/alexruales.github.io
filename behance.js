const behanceFeed = document.getElementById('behanceFeed');
const user = 'aruales7640';

async function fetchProjects() {
  try {
    const response = await fetch(`https://behance.net/${user}/projects`);
    // Behance does not offer public API without authentication.
    // We'll show a placeholder message with a direct link.
    behanceFeed.innerHTML = `
      <p>Automatic Behance feed integration requires server-side or third-party services.</p>
      <p>Meanwhile, visit my full portfolio on <a href="https://www.behance.net/${user}" target="_blank">Behance</a>.</p>
    `;
  } catch(err) {
    behanceFeed.innerHTML = `<p>Failed to load Behance projects.</p>`;
  }
}

fetchProjects();