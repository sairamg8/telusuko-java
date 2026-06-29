export default {
  id: 16,
  title: "Git & GitHub Version Control",
  range: "167-189",
  concepts: [
    {
      id: 167,
      title: "Git Version Control",
      intro: "Distributed tracking. Keeping tabs on every line of code.",
      explanation: "Git is a Distributed Version Control System (DVCS). Unlike centralized systems, every developer has a full copy of the project history on their machine, allowing them to commit, branch, and view logs offline.",
      gotchas: [
        "Distributed means if a server crashes, any developer's local repository clone can be used to restore the remote server completely."
      ],
      interviewQuestions: [
        {
          question: "Explain the difference between Centralized and Distributed version control systems.",
          answer: "Centralized systems (like SVN) rely on a single central server for history. Distributed systems (like Git) store the complete copy of the repository and its history on every developer's local machine."
        }
      ],
      code: `# Checking Git version installed:
git --version`,
      visualizerType: "jvm"
    },
    {
      id: 168,
      title: "History of Git",
      intro: "Created in 2005 by Linus Torvalds for the Linux Kernel project.",
      explanation: "Linus Torvalds created Git when the Linux Kernel project lost free access to their commercial tool BitKeeper. He designed Git to prioritize speed, simplicity, robust data integrity, and support for massive non-linear branching workflows.",
      gotchas: [
        "Git is built around snapshots, not differences! Each commit records the complete state of changed files, rather than tracking delta changes."
      ],
      interviewQuestions: [
        {
          question: "How does Git's storage mechanism differ from older tools?",
          answer: "Older tools store files as a base version plus a list of incremental diffs. Git stores files as snapshots of the directory structure over time, using SHA-1 hashes to index them."
        }
      ],
      code: `# View history of project commits:
git log --oneline`,
      visualizerType: "jvm"
    },
    {
      id: 169,
      title: "Git Setup",
      intro: "Introducing yourself to the version control system.",
      explanation: "Before committing code, you must configure your global identity settings. Git attaches these credentials (username and email) to every commit you create.",
      gotchas: [
        "Failing to set global config doesn't prevent coding, but Git will generate warnings or fallback to auto-inferred system name, which pollutes commits."
      ],
      interviewQuestions: [
        {
          question: "How do you set your commit identity details globally in Git?",
          answer: "Use git config: git config --global user.name \"Name\" and git config --global user.email \"email@example.com\"."
        }
      ],
      code: `git config --global user.name "John Doe"
git config --global user.email "john@example.com"`,
      visualizerType: "jvm"
    },
    {
      id: 170,
      title: "Git Init",
      intro: "Creating local repository databases.",
      explanation: "Executing `git init` inside a folder initializes a Git repository. It creates a hidden `.git` directory containing configuration files, hook scripts, object databases, and reference logs.",
      gotchas: [
        "Do not touch or delete the hidden `.git` folder! If you delete it, you lose the entire version history of your project immediately."
      ],
      interviewQuestions: [
        {
          question: "What does the 'git init' command do under the hood?",
          answer: "It creates a hidden '.git' directory inside the root of the project. This folder holds the repository databases, history snapshots, and config variables."
        }
      ],
      code: `# Initialize a new local repository:
git init`,
      visualizerType: "jvm"
    },
    {
      id: 171,
      title: "Git Commit & Staging Area",
      intro: "Tracking files. Workspace, Staging Area, and Local Repo.",
      explanation: "Git divides files into three zones: 1. Working Directory (sandbox files), 2. Staging Area (pre-commit registry using `git add`), 3. Local Repository (immutable history snapshots using `git commit`).",
      gotchas: [
        "Modified files are not automatically tracked. You must 'git add' them first, placing them in the staging area, before running 'git commit'."
      ],
      interviewQuestions: [
        {
          question: "What is the purpose of the Git Staging Area?",
          answer: "It acts as a preparative zone where you can selectively queue specific file modifications before saving them in a commit snapshot."
        }
      ],
      code: `git add src/App.java
git commit -m "feat: Add main landing layout"`,
      visualizerType: "jvm"
    },
    {
      id: 172,
      title: "Skipping the Staging Area",
      intro: "Shorthands for quick commits.",
      explanation: "For tracked files, you can skip the explicit `git add` step by using the `-a` flag combined with your commit command: `git commit -am \"Message\"`. This stages and commits all modified files in a single step.",
      gotchas: [
        "The `-a` flag will NOT stage new, untracked files! You must always use `git add` to track new files for the first time."
      ],
      interviewQuestions: [
        {
          question: "When does 'git commit -am' fail to track modifications?",
          answer: "It fails to track new files that have not been registered in the Git database yet (untracked files)."
        }
      ],
      code: `# Stages and commits all modified tracked files:
git commit -am "refactor: Cleanup core logic"`,
      visualizerType: "jvm"
    },
    {
      id: 173,
      title: "Git Diff",
      intro: "Inspecting changes before saving them.",
      explanation: "`git diff` shows the difference between your working directory files and the staging area. `git diff --staged` shows what has been staged compared to your last commit.",
      gotchas: [
        "Running raw `git diff` shows nothing if all your modifications have already been added to the staging area. Use `git diff --staged` instead."
      ],
      interviewQuestions: [
        {
          question: "How do you inspect staged changes that are ready to commit?",
          answer: "By executing: git diff --cached or git diff --staged."
        }
      ],
      code: `# Inspect unstaged modifications:
git diff
# Inspect staged modifications:
git diff --staged`,
      visualizerType: "jvm"
    },
    {
      id: 174,
      title: "Removing Files in Git",
      intro: "Deleting files and untracking them properly.",
      explanation: "To delete a file from both the workspace and Git tracking, run `git rm filename`. To stop tracking a file but keep it in your local workspace, use `git rm --cached filename`.",
      gotchas: [
        "If you delete a file using system commands (`rm`) without using `git rm`, the deletion remains unstaged. You must still run `git add` or `git rm` to stage the deletion."
      ],
      interviewQuestions: [
        {
          question: "How do you stop tracking a file in Git while keeping it on your local hard drive?",
          answer: "Execute: git rm --cached <filename>."
        }
      ],
      code: `git rm --cached config.properties
git commit -m "remove: Stop tracking local properties file"`,
      visualizerType: "jvm"
    },
    {
      id: 175,
      title: "GitHub Repository",
      intro: "Cloud storage for collaborating and archiving code.",
      explanation: "GitHub is a hosting service for Git repositories. It provides remote repositories, authorization controls, issue trackers, pull requests, and automation pipelines (GitHub Actions).",
      gotchas: [
        "Git is the local command-line tool; GitHub is the cloud platform that hosts Git repositories. They are separate entities."
      ],
      interviewQuestions: [
        {
          question: "What is the relationship between Git and GitHub?",
          answer: "Git is the version control software tool. GitHub is a hosting service that stores Git repositories in the cloud."
        }
      ],
      code: `# Connecting a local repository to GitHub:
# git remote add origin https://github.com/user/repo.git`,
      visualizerType: "jvm"
    },
    {
      id: 176,
      title: "Adding Files to Remote Repositories",
      intro: "Pushing local commits to GitHub.",
      explanation: "Add a remote location reference using `git remote add origin <url>`. Then push your local branch commits using `git push -u origin <branch_name>`. The `-u` flag sets upstream tracking.",
      gotchas: [
        "If the remote repository contains commits that you do not have locally, pushing will fail. You must pull and merge those remote commits first."
      ],
      interviewQuestions: [
        {
          question: "What does the '-u' flag do in git push -u origin main?",
          answer: "It establishes an upstream tracking connection. In the future, you can type 'git push' or 'git pull' without specifying the remote name or branch."
        }
      ],
      code: `git remote add origin https://github.com/example/java-app.git
git branch -M main
git push -u origin main`,
      visualizerType: "jvm"
    },
    {
      id: 177,
      title: "Git Tag",
      intro: "Marking milestones and releases.",
      explanation: "Tags are reference pointers pointing to specific commits, typically used to label releases (like v1.0.0). 1. Lightweight tags (simple pointer), 2. Annotated tags (store date, author, and message, recommended).",
      gotchas: [
        "Tags are not automatically sent to remote servers when you push. You must push tags explicitly using `git push origin --tags`."
      ],
      interviewQuestions: [
        {
          question: "What is the difference between Git tags and branches?",
          answer: "Branches are mutable pointers that advance automatically with each commit. Tags are immutable bookmarks pointing to a specific commit that do not change."
        }
      ],
      code: `git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0`,
      visualizerType: "jvm"
    },
    {
      id: 178,
      title: "Cloning a Project",
      intro: "Downloading existing projects with full history databases.",
      explanation: "`git clone <url>` copies an existing remote repository to your local machine. It creates the project directory, initializes `.git`, configures the remote pointer named 'origin', and checks out the main branch.",
      gotchas: [
        "Cloning downloads the entire commit history! If a repository contains large binary assets, the download size can be massive. Use sparse or shallow clone if needed."
      ],
      interviewQuestions: [
        {
          question: "What does git clone do under the hood?",
          answer: "It creates a directory, runs 'git init' inside it, adds the remote URL as 'origin', executes 'git fetch' to download all history, and checks out the default branch."
        }
      ],
      code: `git clone https://github.com/octocat/Spoon-Knife.git`,
      visualizerType: "jvm"
    },
    {
      id: 179,
      title: "Creating a Git Branch",
      intro: "Isolated development spaces. Developing features without breaking main.",
      explanation: "Branches represent independent lines of development. `git branch <name>` creates a branch. `git checkout <name>` (or `git switch <name>`) switches your working directory to target branch. `git checkout -b <name>` does both.",
      gotchas: [
        "Uncommitted changes in your working directory will follow you to the new branch if there are no conflicts. Commit or stash them first."
      ],
      interviewQuestions: [
        {
          question: "How do you create and switch to a new branch in a single command?",
          answer: "Use: git checkout -b <branch_name> or git switch -c <branch_name>."
        }
      ],
      code: `git checkout -b feature/login
# Now editing files in isolation!`,
      visualizerType: "jvm"
    },
    {
      id: 180,
      title: "Deleting a Git Branch",
      intro: "Cleaning up code garbage.",
      explanation: "Once features are merged, clean up local branches using `git branch -d <name>`. If a branch contains unmerged changes that you want to delete, force delete it using capital `-D`.",
      gotchas: [
        "You cannot delete a branch that you are currently standing on! Switch to another branch (like main) first, then delete."
      ],
      interviewQuestions: [
        {
          question: "What is the difference between git branch -d and git branch -D?",
          answer: "-d deletes a branch only if it has been fully merged into its upstream branch. -D force deletes a branch regardless of its merge status."
        }
      ],
      code: `git checkout main
git branch -d feature/login`,
      visualizerType: "jvm"
    },
    {
      id: 181,
      title: "Pushing Branches to Remote Repositories",
      intro: "Publishing your feature branches to GitHub.",
      explanation: "1. `git push origin <branch-name>` uploads your local branch to the remote and creates a matching remote-tracking reference (origin/<branch-name>) on your machine.\n2. The -u flag (--set-upstream) links the remote branch as the upstream so future `git pull` and `git push` need no arguments: `git push -u origin feature/login`.\n3. If you renamed your local branch after it was pushed, push the new name first, then delete the old one on the remote: `git push origin new-name` followed by `git push origin --delete old-name`.\n4. To see all remote-tracking branches: `git branch -r`. To see local AND remote: `git branch -a`.\n5. Prefer `git push --force-with-lease` over `--force` when rewriting history on a shared branch — it aborts the push if someone else pushed since your last fetch, preventing you from overwriting their work.",
      gotchas: [
        "If you rename your local branch, you must push it and delete the old branch name from the remote repository separately."
      ],
      interviewQuestions: [
        {
          question: "How do you push a local branch named 'feature' to a remote for the first time?",
          answer: "Execute: git push -u origin feature (the -u flag binds it as the tracking branch)."
        }
      ],
      code: `git push -u origin feature/login`,
      visualizerType: "jvm"
    },
    {
      id: 182,
      title: "How Git Branching Works",
      intro: "Under the hood: references pointing to commit hashes.",
      explanation: "A branch in Git is simply a lightweight, mutable pointer pointing to a commit hash. When you commit, the active branch pointer (pointed to by `HEAD`) moves forward automatically to reference the new commit.",
      gotchas: [
        "Creating a branch is virtually instantaneous and consumes no disk space, as Git only writes a 40-character file containing the target commit hash."
      ],
      interviewQuestions: [
        {
          question: "What is HEAD in Git?",
          answer: "HEAD is a reference pointer pointing to the current active branch or commit in your working directory."
        }
      ],
      code: `# Inspect where HEAD and branches point:
git log --oneline --graph --all`,
      visualizerType: "jvm"
    },
    {
      id: 183,
      title: "Git Merge",
      intro: "Recombining branches. Fast-forward vs 3-Way merges.",
      explanation: "`git merge <branch>` merges the target branch into your active branch. 1. Fast-forward merge: pointer moves forward because no diverging commits exist. 2. 3-Way merge: creates a new merge commit because both branches had unique commits.",
      gotchas: [
        "Always ensure your active branch is clean and updated before running a merge command to prevent confusing merge conflicts."
      ],
      interviewQuestions: [
        {
          question: "What is a Fast-forward merge in Git?",
          answer: "It occurs when there is no divergence between the target branch and current branch. Git simply advances the current branch pointer to the target commit without creating a merge commit."
        }
      ],
      code: `git checkout main
git merge feature/login`,
      visualizerType: "jvm"
    },
    {
      id: 184,
      title: "Git Rebase",
      intro: "Rewriting history to keep commit timelines linear.",
      explanation: "`git rebase <branch>` takes all commits created on feature branch and reapplies them sequentially on top of the target base branch. It generates a perfectly linear commit tree.",
      gotchas: [
        "Never rebase commits that have been pushed to public remote repositories! Rebasing changes commit hashes, rewriting history, which breaks other contributors' workflows."
      ],
      interviewQuestions: [
        {
          question: "When should we use rebase instead of merge?",
          answer: "Use rebase on local, unpushed feature branches to keep the log history clean and linear. Never rebase shared public branches."
        }
      ],
      code: `git checkout feature/login
git rebase main`,
      visualizerType: "jvm"
    },
    {
      id: 185,
      title: "Git Merge Conflicts",
      intro: "Resolving overlapping modifications in files.",
      explanation: "Merge conflicts occur when different branches edit the same line of a file, or if one branch deletes a file that another modified. Git halts the merge and inserts conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`).",
      gotchas: [
        "You must manually open conflicted files, edit them to choose the desired code version, delete the conflict markers, run `git add`, and then `git commit` to complete the merge."
      ],
      interviewQuestions: [
        {
          question: "How do you resolve a Git merge conflict?",
          answer: "Open conflicted files, locate conflict markers, decide which code to keep, delete the markers, stage the files using git add, and finalize with git commit."
        }
      ],
      code: `<<<<<<< HEAD
System.out.println("Hello Main");
=======
System.out.println("Hello Branch");
>>>>>>> feature/login`,
      visualizerType: "jvm"
    },
    {
      id: 186,
      title: "Git Time Travel",
      intro: "Undoing mistakes. Revert, Reset, and Checkout.",
      explanation: "1. `git checkout <hash>`: inspect old commit states (detached HEAD). 2. `git revert <hash>`: creates a new commit that undoes changes of an old commit (safe for remote). 3. `git reset <hash>`: rewrites local history (soft: keeps staging; hard: deletes edits).",
      gotchas: [
        "Using `git reset --hard` deletes all uncommitted working directory edits! It is destructive and cannot be undone."
      ],
      interviewQuestions: [
        {
          question: "Compare git revert and git reset.",
          answer: "git revert creates a new commit undoing old changes, making it safe for public remote branches. git reset deletes/rewrites commit history, which should only be done locally."
        }
      ],
      code: `# Safe undo of a commit:
git revert a1b2c3d
# Dangerous local reset (deletes unstaged work):
git reset --hard HEAD~1`,
      visualizerType: "jvm"
    },
    {
      id: 187,
      title: "Git Stash",
      intro: "Shelving modifications temporarily without committing.",
      explanation: "`git stash` saves your uncommitted working files to a temporary stack and returns your working directory to clean HEAD state. Run `git stash pop` to reapply the modifications later.",
      gotchas: [
        "By default, git stash only shelves tracked files. To stash new, untracked files, you must include the `-u` or `--include-untracked` flag."
      ],
      interviewQuestions: [
        {
          question: "What is git stash and when is it useful?",
          answer: "It temporarily shelves uncommitted local modifications so you can switch branches or apply hotfixes on a clean workspace, and pop them back later."
        }
      ],
      code: `git stash -u
# Workspace is clean. Do hotfix commit...
git stash pop # re-applies work`,
      visualizerType: "jvm"
    },
    {
      id: 188,
      title: "Git Fork",
      intro: "Copying repositories to your personal account.",
      explanation: "Forking is a GitHub platform action (not a core Git command). It creates a server-side clone of someone else's repository under your personal GitHub account. This allows you to push modifications without write permissions to the source project.",
      gotchas: [
        "To stay sync with upstream changes, you must configure the original author's repository as an 'upstream' remote in your local terminal clone."
      ],
      interviewQuestions: [
        {
          question: "What is a Fork in GitHub?",
          answer: "A server-side copy of a repository hosted under your account, enabling you to experiment and submit Pull Requests to the original repository."
        }
      ],
      code: `# Adding original repo as upstream remote:
# git remote add upstream https://github.com/original-author/repo.git`,
      visualizerType: "jvm"
    },
    {
      id: 189,
      title: "Git Pull Request",
      intro: "Proposing your changes for code review.",
      explanation: "A Pull Request (PR) is a GitHub feature requesting the maintainers of a project to review and pull your commits from your fork/branch into their main codebase. It serves as a discussion board for code changes.",
      gotchas: [
        "Keep PRs small and focused on a single issue/feature. Massive PRs are difficult to review and often get rejected by open-source maintainers."
      ],
      interviewQuestions: [
        {
          question: "What is a Pull Request (PR)?",
          answer: "A GitHub mechanism to propose merging changes from your branch/fork into another repository, enabling code review and discussion before integration."
        }
      ],
      code: `# Pull Requests are opened on GitHub's web interface after pushing your branch.`,
      visualizerType: "jvm"
    }
  ]
};
