/**
 * GitHub Commits Feed
 * Fetches and displays recent commits in a retro printer style
 */

document.addEventListener('DOMContentLoaded', function() {
  // Get GitHub username from Ghost settings
  const GITHUB_USERNAME = getGitHubUsername();
  const MAX_COMMITS = 10;
  
  // Function to get GitHub username from page data
  function getGitHubUsername() {
    // Try to get from a data attribute we'll add to the page
    const githubElement = document.querySelector('[data-github-username]');
    if (githubElement) {
      return githubElement.getAttribute('data-github-username');
    }
    
    // Fallback to default
    return 'yourusername';
  }
  
  // DOM elements
  const commitsOutput = document.getElementById('commits-output');
  const refreshBtn = document.getElementById('refresh-commits');
  const printBtn = document.getElementById('print-commits');
  const timestampEl = document.getElementById('printer-timestamp');
  const totalCommitsEl = document.getElementById('total-commits');
  const activeReposEl = document.getElementById('active-repos');
  const lastCommitDateEl = document.getElementById('last-commit-date');
  
  // Update timestamp
  function updateTimestamp() {
    const now = new Date();
    timestampEl.textContent = now.toLocaleString();
  }
  
  // Format commit data into printer-style output
  function formatCommitData(commits) {
    let output = '';
    
    // Header
    output += '████████████████████████████████████████████████████████\n';
    output += '█                                                      █\n';
    output += '█                 GITHUB COMMIT FEED                   █\n';
    output += '█                                                      █\n';
    output += `█  User: ${GITHUB_USERNAME.padEnd(42)} █\n`;
    output += `█  Generated: ${new Date().toLocaleDateString().padEnd(35)} █\n`;
    output += '█                                                      █\n';
    output += '████████████████████████████████████████████████████████\n\n';
    
    if (commits.length === 0) {
      output += 'No recent commits found.\n\n';
      output += 'ERROR: Unable to fetch commit data or no public activity.\n';
      return output;
    }
    
    // Process commits
    commits.forEach((commit, index) => {
      const date = new Date(commit.commit.author.date);
      const repo = commit.repo ? commit.repo.name : 'Unknown Repository';
      const message = commit.commit.message.split('\n')[0]; // First line only
      const sha = commit.sha.substring(0, 7);
      
      output += `${(index + 1).toString().padStart(2, '0')}. `;
      output += `[${sha}] ${repo}\n`;
      output += `    ${date.toLocaleDateString()} ${date.toLocaleTimeString()}\n`;
      output += `    ${message}\n`;
      output += `    Author: ${commit.commit.author.name}\n`;
      output += '\n';
      output += '    ' + '─'.repeat(50) + '\n\n';
    });
    
    // Footer
    output += '████████████████████████████████████████████████████████\n';
    output += '█                                                      █\n';
    output += `█  Total commits shown: ${commits.length.toString().padEnd(28)} █\n`;
    output += '█                                                      █\n';
    output += '█              END OF TRANSMISSION                     █\n';
    output += '█                                                      █\n';
    output += '████████████████████████████████████████████████████████\n';
    
    return output;
  }
  
  // Fetch commits from GitHub API
  async function fetchCommits() {
    try {
      // Update UI to show loading
      commitsOutput.innerHTML = `
        <div class="loading-message">
          <pre>
████████████████████████████████████████████████████████
█                                                      █
█                  FETCHING COMMITS...                 █
█                                                      █
█              [████████████████████] 100%             █
█                                                      █
████████████████████████████████████████████████████████
          </pre>
        </div>
      `;
      
      // Fetch user's public events (includes commits)
      const eventsResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public`);
      
      if (!eventsResponse.ok) {
        throw new Error(`GitHub API error: ${eventsResponse.status}`);
      }
      
      const events = await eventsResponse.json();
      
      // Filter for push events (commits)
      const commitEvents = events
        .filter(event => event.type === 'PushEvent')
        .slice(0, MAX_COMMITS);
      
      // Extract commit data from events
      const commits = [];
      commitEvents.forEach(event => {
        event.payload.commits.forEach(commit => {
          commits.push({
            sha: commit.sha,
            commit: {
              message: commit.message,
              author: {
                name: event.actor.display_login || event.actor.login,
                date: event.created_at
              }
            },
            repo: event.repo
          });
        });
      });
      
      // Take only the most recent commits
      const recentCommits = commits.slice(0, MAX_COMMITS);
      
      // Update the printer output
      const formattedOutput = formatCommitData(recentCommits);
      commitsOutput.innerHTML = `<pre>${formattedOutput}</pre>`;
      
      // Update stats
      updateStats(recentCommits, events);
      
    } catch (error) {
      console.error('Error fetching commits:', error);
      
      commitsOutput.innerHTML = `
        <pre>
████████████████████████████████████████████████████████
█                                                      █
█                     ERROR!                           █
█                                                      █
█            Unable to fetch GitHub data               █
█                                                      █
█  Please check the username in the console           █
█  Error: ${error.message.padEnd(38)} █
█                                                      █
████████████████████████████████████████████████████████
        </pre>
      `;
    }
  }
  
  // Update statistics
  function updateStats(commits, allEvents) {
    totalCommitsEl.textContent = commits.length;
    
    // Count unique repositories
    const uniqueRepos = new Set(commits.map(c => c.repo?.name).filter(Boolean));
    activeReposEl.textContent = uniqueRepos.size;
    
    // Get last commit date
    if (commits.length > 0) {
      const lastDate = new Date(commits[0].commit.author.date);
      lastCommitDateEl.textContent = lastDate.toLocaleDateString();
    } else {
      lastCommitDateEl.textContent = 'N/A';
    }
  }
  
  // Print functionality (opens print dialog)
  function printCommits() {
    const printWindow = window.open('', '_blank');
    const commitsContent = commitsOutput.innerHTML;
    
    printWindow.document.write(`
      <html>
        <head>
          <title>GitHub Commits - ${GITHUB_USERNAME}</title>
          <style>
            body { font-family: monospace; font-size: 12px; }
            pre { white-space: pre-wrap; }
          </style>
        </head>
        <body>
          ${commitsContent}
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.print();
  }
  
  // Event listeners
  if (refreshBtn) {
    refreshBtn.addEventListener('click', fetchCommits);
  }
  
  if (printBtn) {
    printBtn.addEventListener('click', printCommits);
  }
  
  // Initialize
  updateTimestamp();
  setInterval(updateTimestamp, 1000); // Update timestamp every second
  
  // Load commits on page load
  fetchCommits();
});
