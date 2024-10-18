const fs = require('fs');
const core = require('@actions/core');
const github = require('@actions/github');

try {
  const username = core.getInput('username');
  const folder = core.getInput('folder') || 'repos';
  const forked = core.getInput('forked') || 'false';
  if (username) {
    makeFolder(folder);
    importRepos(username, folder, forked);
  }
  else {
    core.debug("Missing 'username' input");
    throw new Error("Missing 'username' input");
  }
} 
catch (error) {
  core.error(`Error: ${error.message}`);
  core.setFailed(error.message);
}

async function importRepos(username, folder, forked) {
  core.info(`importRepos ${username} ${folder} ${forked}`);
  let url = `https://api.github.com/users/${username}/repos`;
  let data = await fetchJson(url);
  for (let repo of data) {
    if (forked == 'false' && repo.fork) {
      continue;
    }
    let slug = repo.name;
    let path = `${folder}/${slug}.md`;
    let markdown = buildMarkdown(repo);
    writeFile(path, markdown);
  }
}

function buildMarkdown(repo) {
  let frontmatter = {
    title: repo.name,
    repo: repo.full_name,
    url: repo.html_url,
    link: repo.homepage || "",
    owner: repo.owner.login,
    stars: repo.watchers,
    forks: repo.forks,
    issues: repo.open_issues,
    language: repo.language || "",
    forked: repo.fork,
    archived: repo.archived,
    disabled: repo.disabled,
    private: repo.private,
    visibility: repo.visibility,
    license: repo.license ? repo.license.spdx_id : "",
    keywords: [
      repo.topics ? repo.topics : [],
      repo.language ? repo.language : ""
    ].filter(String).join(",").toLowerCase()
  }
  let markdown = `---\n`;
  for (let key in frontmatter) {
    markdown += `${key}: ${frontmatter[key]}\n`;
  }
  markdown += `description: >
    ${repo.description||""}\n`;
  markdown += `---\n`;
  markdown += `\n# ${repo.name}\n`;
  if (repo.description && repo.description.length > 0) {
    markdown += `#### ${repo.description}\n`;
  }
  if (repo.html_url && repo.html_url.length > 0) {
    markdown += `\n[${repo.html_url}](${repo.html_url})\n`;
  }
  if (repo.homepage && repo.homepage.length > 0) {
    markdown += `\n[${repo.homepage}](${repo.homepage})\n`;
  }
  return markdown;
}

async function fetchJson(url) {
  core.info(`fetchJson ${url}`);
  const response = await fetch(url);
  const json = await response.json();
  return json;
}

function makeFolder(path) {
  fs.mkdir(path, { recursive: true }, error => {
    if (error) {
      core.error(`makeFolder ${path} ${error.message}`);
    } 
    else {
      core.info(`makeFolder ${path}`);
    }
  });
}

function writeFile(path, content) {
  fs.writeFile(path, content, error => {
    if (error) {
      core.error(`writeFile ${path} ${error.message}`);
    } 
    else {
      core.info(`writeFile ${path}`);
    }
  });
}