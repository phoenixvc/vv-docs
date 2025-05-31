# Stakeholder Presentation Implementation Guide  
_Integrating role-based views & metadata badges into the existing Docusaurus site_

---

## 1. Prerequisites

| Item | Version / Note |
|------|----------------|
| Node | ≥ 18 |
| npm / Yarn | Latest LTS |
| Docusaurus | 3.x (already installed) |
| TailwindCSS | Configured (`tailwind.config.ts`) |

Clone/checkout **vv-docs** locally and ensure `npm install` passes.

---

## 2. New Files & Directories

```
veritasvault-docs/
├─ src/components/stakeholder/
│  ├─ RoleContext.tsx
│  ├─ StatusBadges.tsx
│  ├─ RoleSwitcher.tsx
│  └─ ExecDashboard.tsx
├─ src/theme/
│  ├─ Layout/index.tsx                 # swizzled wrapper
│  └─ DocItem/Layout/
│      ├─ index.tsx                    # swizzled Doc page
│      └─ styles.module.css
├─ docs/exec/dashboard.mdx             # sample page
└─ stakeholder-implementation-guide.md # this file
```

_All code is included in the repository: just commit & push._

---

## 3. Step-by-Step Integration

### 3.1 Install any missing dependency

```
npm add clsx        # used by badge components
```

### 3.2 Wrap the Global Layout

1. Swizzle layout if you haven’t:  
   `npx docusaurus swizzle @docusaurus/theme-classic Layout --danger`
2. Replace the generated file with `src/theme/Layout/index.tsx` provided.  
   It wraps the site in `<RoleProvider>` and adds `<RoleSwitcher>` (dev-only).

### 3.3 Enhance Doc Pages

1. Swizzle DocItem layout once:  
   `npx docusaurus swizzle @docusaurus/theme-classic DocItem/Layout --danger`
2. Overwrite with the supplied `index.tsx` and `styles.module.css`.  
   This injects `<StatusBadges>` and role-based guards.

### 3.4 Add Stakeholder Components

Copy the four `.tsx` components into  
`src/components/stakeholder/`. No extra wiring is needed.

### 3.5 Update Front-matter Schema (optional extras)

Add optional fields to `.github/workflows/frontmatter-schema.json` if desired:

```json
"executive_summary": { "type": "string" },
"custom_status":      { "type": "string" },
"custom_complexity":  { "type": "string" }
```

### 3.6 Role-Aware Paths (deep-linking)

The enhanced layout sets initial role from URL:

* `/exec/*`     → Executive  
* `/audit/*`    → Compliance  
* `/partner/*`  → External Partner  
* _(default)_   → Technical

Create landing pages under these prefixes for each persona.

### 3.7 Search Facet (Algolia)

If using Algolia, add a dynamic facet filter placeholder:

```ts
themeConfig: {
  algolia: {
    // existing keys …
    searchParameters: {
      facetFilters: ['role:$ACTIVE_ROLE']  // injected at runtime by plugin (future)
    }
  }
}
```

### 3.8 CI Quality Gates

Extend `.github/workflows/docs-quality-check.yml`:

```yaml
- name: Validate stakeholder metadata
  run: |
    python .github/workflows/validate-frontmatter.py \
      --require status --require classification --require priority
```

Build should fail if any doc lacks the three badge-critical fields.

---

## 4. Testing Checklist

| Action | Expected Result |
|--------|-----------------|
| `npm run start` | Site builds; floating “View as” switcher bottom-right. |
| Switch role to **Executive** | `/exec/dashboard` renders KPI cards. |
| Open any doc | Status & priority badges under title. |
| Switch role to **Partner** | Docs `classification: internal` show “Access Restricted”. |
| Print page | Badges hidden (per CSS). |
| Lighthouse perf/security | ≥ 90 score (no regressions). |

---

## 5. Deployment

All features are **static-only**—Netlify / Azure Static Web Apps pipelines stay the same.

Optional multi-role artifact build:

```yaml
strategy:
  matrix: { role: [exec, tech, audit, partner] }
steps:
  - run: npm run build -- --role=${{ matrix.role }}
  - uses: actions/upload-artifact
    with: { name: docs-${{ matrix.role }}, path: build/ }
```

---

## 6. Rollback Plan

1. Remove `src/components/stakeholder/` directory.  
2. Revert swizzled `Layout` & `DocItem` files.  
3. Delete new CI step.  
Site returns to vanilla Docusaurus instantly.

---

## 7. Next Steps

1. **Stakeholder feedback** – share preview links for each role.  
2. Expand dashboards (Audit, Tech) using same pattern.  
3. Auto-generate JSON metrics feed during `npm run build`.  
4. Integrate Algolia facet filters & sidebar role filters.  

You now have a **role-aware documentation portal** on top of your existing Docusaurus install—no migration, just enhancement. 🚀
