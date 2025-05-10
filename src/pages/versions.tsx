import Layout from "@theme/Layout"
import Link from "@docusaurus/Link"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"
import { useVersions, useLatestVersion } from "@docusaurus/plugin-content-docs/client"

function VersionsPage() {
  const { siteConfig } = useDocusaurusContext()
  const versions = useVersions()
  const latestVersion = useLatestVersion()

  return (
    <Layout title="Documentation Versions" description="Multi-chain Architecture Documentation Versions">
      <main className="container margin-vert--lg">
        <h1>Documentation Versions</h1>

        <div className="margin-bottom--lg">
          <h2>Current Version (Unreleased)</h2>
          <p>Development documentation for upcoming features:</p>
          <div className="card">
            <div className="card__body">
              <table>
                <tbody>
                  <tr>
                    <th>Next</th>
                    <td>
                      <Link to="/docs/next">Documentation</Link>
                    </td>
                    <td>
                      <span className="badge badge--warning">Unreleased</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="margin-bottom--lg">
          <h2>Released Versions</h2>
          <p>Documentation for official releases:</p>
          <div className="card">
            <div className="card__body">
              <table>
                <tbody>
                  {versions
                    .filter((version) => version.name !== "current")
                    .map((version) => (
                      <tr key={version.name}>
                        <th>{version.label}</th>
                        <td>
                          <Link to={version.path}>Documentation</Link>
                        </td>
                        <td>
                          {version.name === latestVersion.name ? (
                            <span className="badge badge--success">Latest</span>
                          ) : (
                            <span className="badge badge--secondary">Stable</span>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="margin-bottom--lg">
          <h2>Version Lifecycle</h2>
          <p>Our documentation follows these lifecycle stages:</p>
          <div className="card">
            <div className="card__body">
              <table>
                <thead>
                  <tr>
                    <th>Stage</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <span className="badge badge--success">Active</span>
                    </td>
                    <td>Current version, fully supported</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="badge badge--secondary">Maintained</span>
                    </td>
                    <td>Previous versions still supported (typically last 1-2 major versions)</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="badge badge--info">Legacy</span>
                    </td>
                    <td>Older versions with limited support (security fixes only)</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="badge badge--danger">Archived</span>
                    </td>
                    <td>No longer maintained, kept for historical reference</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="margin-bottom--lg">
          <h2>Migration Guides</h2>
          <p>If you're upgrading from a previous version, check out our migration guides:</p>
          <div className="card">
            <div className="card__body">
              <ul>
                <li>
                  <Link to="/docs/migration/v1-to-v2">Migrating from v1.x to v2.x</Link>
                </li>
                <li>
                  <Link to="/docs/migration/v0-to-v1">Migrating from v0.x to v1.x</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default VersionsPage
