import React from 'react';
import clsx from 'clsx';
import {useWindowSize} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/theme-common/internal';
import DocItemPaginator from '@theme/DocItem/Paginator';
import DocVersionBanner from '@theme/DocVersionBanner';
import DocVersionBadge from '@theme/DocVersionBadge';
import DocItemFooter from '@theme/DocItem/Footer';
import DocItemTOCMobile from '@theme/DocItem/TOC/Mobile';
import DocItemTOCDesktop from '@theme/DocItem/TOC/Desktop';
import DocItemContent from '@theme/DocItem/Content';
import DocBreadcrumbs from '@theme/DocBreadcrumbs';
import type {Props} from '@theme/DocItem/Layout';
import StatusBadges from '@site/src/components/stakeholder/StatusBadges';
import {useRole, RoleGuard} from '@site/src/components/stakeholder/RoleContext';

import styles from './styles.module.css';

/**
 * Enhanced DocItem Layout component that integrates StatusBadges and role-based access control
 * This component reads frontmatter from the document and displays appropriate metadata
 * based on the active stakeholder role.
 */
export default function DocItemLayout({children}: Props): JSX.Element {
  const {
    metadata,
    frontMatter,
    assets,
    contentTitle,
    toc
  } = useDoc();
  const {isMobile} = useWindowSize();
  const { activeRole } = useRole();

  // Extract frontmatter fields for StatusBadges
  const {
    document_type = 'guide',
    classification = 'internal',
    status = 'draft',
    version = '1.0.0',
    last_updated = new Date().toISOString().split('T')[0],
    priority = 'p2',
    next_review,
    applies_to = []
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
                  <p><strong>Standards:</strong> {Object.keys(frontMatter.compliance_standards).join(', ')}</p>
                  {frontMatter.next_review && (
                    <p><strong>Next Review Date:</strong> {frontMatter.next_review}</p>
                  )}
                  {frontMatter.reviewers && (
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
