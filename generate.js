import fs from 'fs'; 

const statuses = ["Ready", "Building", "Error"];
const environments = ["Production", "Preview"];
const branches = ["main", "feat-lorem", "fix-dolor", "update-ui", "hotfix-bug"];
const authors = ["Developer One", "Developer Two", "Abhay Tiwari", "Vishesh Dubey"];

const deployments = [];

for (let i = 1; i <= 1000; i++) {
  deployments.push({
    id: `dpl_v1_${Math.random().toString(36).substring(2, 9)}`,
    project: `Project ${i % 2 === 0 ? 'Alpha' : i % 3 === 0 ? 'Beta' : 'Gamma'} - ${i}`,
    domain: `project-${i}.example.com`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    environment: environments[Math.floor(Math.random() * environments.length)],
    branch: branches[Math.floor(Math.random() * branches.length)],
    commitMessage: `Auto-generated commit message for row ${i}`,
    commitHash: Math.random().toString(16).substring(2, 8),
    author: authors[Math.floor(Math.random() * authors.length)],
    age: `${Math.floor(Math.random() * 60) + 1}m`,
    duration: `${Math.floor(Math.random() * 50) + 10}s`
  });
}

const db = { deployments };

// JSON.stringify 
fs.writeFileSync('db.json', JSON.stringify(db, null, 2));
console.log("Success! db.json file created with 1000 rows in D:/office/days/day1/hrms-ui/");