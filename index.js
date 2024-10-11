const fs = require('fs');
const fetch = require('node-fetch');
const core = require('@actions/core');
const github = require('@actions/github');

try {
  const username = core.getInput('username');
  const forked = core.getInput('forked');
  if (username) {
    (async () => {
      await importRepos(username, forked);
    });
  }
  else {
    throw new Error("Missing 'username' input");
  }
} 
catch (error) {
  console.error("Error", error);
  core.setFailed(error.message);
}

async function importRepos(username, forked) {
  console.info("importRepos", username, forked);
  let url = `https://api.github.com/users/${username}/repos`;
  console.info("url", url);
  let data = await fetchJson(url);
  for (let repo of data) {
    if (forked == 'false' && repo.fork) {
      continue;
    }
    let slug = repo.name;
    let path = `repos/${slug}.md`;
    let markdown = buildMarkdown(repo);
    writeFile(path, markdown);
  }
}

function buildMarkdown(repo) {
  let frontmatter = {
    id: repo.id,
    title: repo.name,
    url: repo.html_url,
    link: repo.homepage,
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
      repo.language ? repo.language.toLowerCase() : ""
    ].filter(String).join(",")
  }
  let markdown = `---\n`;
  for (let key in frontmatter) {
    markdown += `${key}: ${frontmatter[key]}\n`;
  }
  markdown += `description: >
    ${description||""}\n`;
  markdown += `---\n`;
  return markdown;
}

async function fetchJson(url) {
  console.info("fetchJson", url);
  const response = await fetch(url);
  const json = await response.json();
  return json;
}

function writeFile(path, content) {
  fs.writeFile(path, content, error => {
    if (error) {
      console.error("writeFile", error);
    } 
    else {
      console.info("writeFile", path);
    }
  });
}