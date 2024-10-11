const fs = require('fs');
const core = require('@actions/core');
const github = require('@actions/github');

try {
  const username = core.getInput('username');
  const folder = core.getInput('folder') || 'repos';
  const forked = core.getInput('forked') || 'false';
  core.info(`Inputs username: ${username}, folder: ${folder}, forked: ${forked}`);
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
    url: repo.html_url,
    link: repo.homepage || "",
    path: repo.full_name,
    owner: repo.owner.login,
    private: repo.private,
    stars: repo.watchers,
    forks: repo.forks,
    issues: repo.open_issues,
    language: repo.language,
    forked: repo.fork,
    archived: repo.archived,
    disabled: repo.disabled,
    visibility: repo.visibility,
    license: repo.license ? repo.license.spdx_id : "",
    keywords: [
      repo.topics ? repo.topics : [],
      repo.language ? repo.language.toLowerCase() : "",
      repo.watchers == 1 ? "1 star" : `${repo.watchers} stars`, 
      repo.forks == 1 ? "1 fork" : `${repo.forks} forks`
    ].filter(String).join(",")
  }
  let markdown = `---\n`;
  for (let key in frontmatter) {
    markdown += `${key}: ${frontmatter[key]}\n`;
  }
  markdown += `description: >
    ${repo.description||""}\n`;
  markdown += `---\n`;
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