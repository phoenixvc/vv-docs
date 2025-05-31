import { RoleGuard, useRole } from '@/components/stakeholder/RoleContext';
import StatusBadges from '@/components/stakeholder/StatusBadges';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import DocItemContent from '@theme/DocItem/Content';
import DocItemFooter from '@theme/DocItem/Footer';
import type { Props } from '@theme/DocItem/Layout';
import DocItemPaginator from '@theme/DocItem/Paginator';
import DocItemTOCDesktop from '@theme/DocItem/TOC/Desktop';
import DocVersionBadge from '@theme/DocVersionBadge';
import DocVersionBanner from '@theme/DocVersionBanner';
import clsx from 'clsx';
import { debounce } from 'lodash';
import { JSX, useEffect, useState } from 'react';
import styles from './styles.module.css';

// Custom hook for debounced window size detection
function useWindowSizeDebounced() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = debounce(() => {
      setIsMobile(window.innerWidth < 768);
    }, 250);

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      handleResize.cancel && handleResize.cancel();
    };
  }, []);

  return { isMobile };
}

/**
 * Enhanced DocItem Layout component that integrates StatusBadges and role-based access control
 * This component reads frontmatter from the document and displays appropriate metadata
 * based on the active stakeholder role.
 */
export default function DocItemLayout({ children }: Props): JSX.Element {
  const { isMobile } = useWindowSizeDebounced();
  const { activeRole } = useRole();

  // Create fallback document data
  // In a real implementation, you would get this from a hook or context
  const frontMatter = {
    document_type: 'guide',
    classification: 'internal' as 'internal' | 'public' | 'confidential',
    status: 'draft' as 'draft' | 'review' | 'approved' | 'archived',
    version: '1.0.0',
    last_updated: '',
    priority: 'p2' as 'p0' | 'p1' | 'p2' | 'p3',
    next_review: '',
    applies_to: [],
    compliance_standards: null,
    executive_summary: '',
    reviewers: []
  };
  
  const metadata = {};
  const toc = [];

  // Get document data - in a production environment, you would replace this with:
  // 1. Use the appropriate Docusaurus hook (e.g., useDocusaurusContext)
  // 2. Or access data from a context provider
  // 3. Or modify this component to accept these values as props

  // Extract frontmatter fields for StatusBadges
  const {
    document_type,
    classification,
    status,
    version,
    last_updated,
    priority,
    next_review,
    applies_to
  } = frontMatter;

  // Determine if we should show role-specific metadata sections
  const showAuditMetadata = activeRole === 'audit' && frontMatter.compliance_standards;
  const showExecMetadata = activeRole === 'exec' && (frontMatter.priority === 'p0' || frontMatter.priority === 'p1');

  return (
    <div className={clsx('row', styles.docItemContainer)}>
      <div className={clsx('col', !isMobile && styles.docItemCol)}>
        <DocVersionBanner />
        <div className={styles.docItemContainer}>
          <article>
            <DocBreadcrumbs />
            <DocVersionBadge />

            {/* Role-based access control wrapper */}
            <RoleGuard 
              classification={classification} 
              fallback={
                <div className="alert alert--danger margin-bottom--md">
                  <h4>Access Restricted</h4>
                  <p>You don't have permission to view this document with classification: {classification}.</p>
                </div>
              }
            >
              {/* Status Badges - Display document metadata */}
              <div className="margin-bottom--md">
                <StatusBadges
                  document_type={document_type}
                  classification={classification}
                  status={status}
                  version={version}
                  last_updated={last_updated}
                  priority={priority}
                  next_review={next_review}
                />
              </div>

              {/* Executive-specific metadata section */}
              {showExecMetadata && (
                <div className="alert alert--info margin-bottom--md">
                  <h4>Executive Note</h4>
                  <p>This is a high-priority document that requires executive attention.</p>
                  {frontMatter.executive_summary && (
                    <p><strong>Summary:</strong> {frontMatter.executive_summary}</p>
                  )}
                </div>
              )}

              {/* Audit-specific metadata section */}
              {showAuditMetadata && (
                <div className="alert alert--secondary margin-bottom--md">
                  <h4>Compliance Information</h4>
                  <p><strong>Standards:</strong> {frontMatter.compliance_standards ? Object.keys(frontMatter.compliance_standards).join(', ') : 'None'}</p>
                  {frontMatter.next_review && (
                    <p><strong>Next Review Date:</strong> {frontMatter.next_review}</p>
                  )}
                  {frontMatter.reviewers && Array.isArray(frontMatter.reviewers) && (
                    <p><strong>Reviewers:</strong> {frontMatter.reviewers.join(', ')}</p>
                  )}
                </div>
              )}

              {/* Technical-specific metadata section */}
              {activeRole === 'tech' && applies_to.length > 0 && (
                <div className="margin-bottom--md">
                  <span className="badge badge--secondary">
                    Applies to: {applies_to.join(', ')}
                  </span>
                </div>
              )}

              {/* Main document content */}
              <DocItemContent>{children}</DocItemContent>
              <DocItemFooter />
            </RoleGuard>
          </article>
          <DocItemPaginator />
        </div>
      </div>
      {toc.length > 0 && (
        <div className="col col--3">
          <DocItemTOCDesktop />
        </div>
      )}
    </div>
  );
}