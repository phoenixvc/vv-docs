import Layout from "@theme/Layout"
import useDocusaurusContext from "@docusaurus/useDocusaurusContext"

function VersionsPage() {
  const { siteConfig } = useDocusaurusContext()

  return (
    <Layout title="Documentation Versions" description="Veritas Vault Documentation Versions">
      <main className="container margin-vert--lg">
        <h1>Documentation Versions</h1>

        <div className="margin-bottom--lg">
          <h2>Current Version</h2>
          <p>You are currently viewing the latest version of the Veritas Vault documentation.</p>
          <div className="card">
            <div className="card__body">
              <p>Our documentation is continuously updated as new features are developed.</p>
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
      </main>
    </Layout>
  )
}

export default VersionsPage