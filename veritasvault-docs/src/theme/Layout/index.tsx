import React from 'react';
import OriginalLayout from '@theme-original/Layout';
import type {Props} from '@theme/Layout';
import RoleProvider from '@site/src/components/stakeholder/RoleContext';
import RoleSwitcher from '@site/src/components/stakeholder/RoleSwitcher';
import {useLocation} from '@docusaurus/router';

/**
 * Enhanced Layout component that wraps the original Docusaurus Layout
 * with the RoleProvider to enable stakeholder-specific presentation formats
 */
export default function Layout(props: Props): JSX.Element {
  const location = useLocation();
  
  // Determine initial role based on URL path (optional enhancement)
  // This allows deep-linking to specific stakeholder views
  const getInitialRoleFromPath = (): 'exec' | 'tech' | 'audit' | 'partner' => {
    if (location.pathname.startsWith('/exec')) {
      return 'exec';
    } else if (location.pathname.startsWith('/audit')) {
      return 'audit';
    } else if (location.pathname.startsWith('/partner')) {
      return 'partner';
    }
    // Default to technical team view
    return 'tech';
  };

  return (
    <RoleProvider initialRole={getInitialRoleFromPath()}>
      <OriginalLayout {...props}>
        {props.children}
        <RoleSwitcher />
      </OriginalLayout>
    </RoleProvider>
  );
}
