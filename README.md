## 📦 Release Process

This repository uses two separate release flows:

### 🔁 Development Releases

Use this to publish a development (`@dev`) version of the package for internal testing:

```bash
npm run release:dev
```

This will:

- Auto-increment the current prerelease version (e.g., `1.0.2-dev.3` → `1.0.2-dev.4`)
- Publish the current state of the code under the `dev` dist tag
- Does **not** commit or tag anything in Git

📌 Dev releases are temporary and meant for use in staging/test environments. Only the latest dev version is needed at a time.

---

### 🚀 Stable Releases

Once development is complete and tested, follow these steps:

1. **Merge `development` into `main`**
   - Ensure that the latest dev code (including dev version commits) is in the `main` branch.

2. Run:

```bash
npm run release:stable
```

This will:

- Bump the version (e.g., `1.0.2`)
- Generate/update the changelog
- Commit the version bump and changelog
- Tag the release (e.g., `v1.0.2`)
- Push to GitHub
- Publish to GitHub Packages under the `latest` dist tag

---

### ✅ Versioning Summary

| Command              | Use Case                         | Output Example       |
|----------------------|----------------------------------|----------------------|
| `release:dev`        | Internal testing/dev builds      | `1.0.2-dev.4`         |
| `release:stable`     | Production/public release        | `1.0.2`               |

> Note: Never run `release:stable` directly from the `development` branch. Always merge `development` into `main` first.
