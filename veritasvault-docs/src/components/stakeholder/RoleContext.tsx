import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the stakeholder roles
export type StakeholderRole = 'exec' | 'tech' | 'audit' | 'partner';

// Define classification levels that control access
export type ClassificationLevel = 'public' | 'internal' | 'confidential';

// Interface for the context value
export interface RoleContextType {
  // Current active role
  activeRole: StakeholderRole;
  // Function to change the active role
  setActiveRole: (role: StakeholderRole) => void;
  // Check if the current role can access content with the given classification
  canAccessClassification: (classification: ClassificationLevel) => boolean;
  // Check if the current role should see a specific document type
  isRelevantDocType: (docType: string) => boolean;
  // Get a display name for the current role
  getRoleDisplayName: () => string;
  // Check if we're in development mode (for showing role switcher)
  isDevelopment: boolean;
}

// Default role context value
const defaultRoleContext: RoleContextType = {
  activeRole: 'tech', // Default to technical team view
  setActiveRole: () => {},
  canAccessClassification: () => false,
  isRelevantDocType: () => true,
  getRoleDisplayName: () => 'Technical Team',
  isDevelopment: false,
};

// Create the context
export const RoleContext = createContext<RoleContextType>(defaultRoleContext);

// Hook for using the role context
export const useRole = () => useContext(RoleContext);

// Props for the provider component
interface RoleProviderProps {
  children: ReactNode;
  initialRole?: StakeholderRole;
}

/**
 * Maps document types to relevant stakeholder roles
 * This determines which document types are highlighted or prioritized for each role
 */
const DOC_TYPE_ROLE_MAP: Record<string, StakeholderRole[]> = {
  'architecture': ['tech', 'exec'],
  'domain-overview': ['tech', 'exec', 'partner'],
  'specification': ['tech'],
  'runbook': ['tech'],
  'guide': ['tech', 'partner'],
  'policy': ['audit', 'exec'],
  'api-standards': ['tech', 'partner'],
  'security-standard': ['audit', 'tech'],
  'settlement-protocol': ['tech', 'audit'],
  'portfolio-optimization-guide': ['tech', 'partner'],
  'audit-system-design': ['audit', 'tech'],
  'navigation-index': ['tech', 'exec', 'audit', 'partner'],
  'overview': ['exec', 'partner', 'tech', 'audit'],
  'redirect': ['tech', 'exec', 'audit', 'partner'],
};

/**
 * Maps classification levels to roles that can access them
 */
const CLASSIFICATION_ACCESS_MAP: Record<ClassificationLevel, StakeholderRole[]> = {
  'public': ['exec', 'tech', 'audit', 'partner'],
  'internal': ['exec', 'tech', 'audit'],
  'confidential': ['exec', 'audit'],
};

/**
 * Display names for each role
 */
const ROLE_DISPLAY_NAMES: Record<StakeholderRole, string> = {
  'exec': 'Executive Leadership',
  'tech': 'Technical Team',
  'audit': 'Compliance & Audit',
  'partner': 'External Partners',
};

/**
 * Provider component for the role context
 */
export const RoleProvider: React.FC<RoleProviderProps> = ({ 
  children, 
  initialRole = 'tech' 
}) => {
  // Determine if we're in development mode
  const isDevelopment = process.env.NODE_ENV === 'development' || 
                        (typeof window !== 'undefined' && (
                          window.location.hostname === 'localhost' ||
                          window.location.hostname.includes('staging') ||
                          window.location.hostname.includes('preview')
                        ));

  // Initialize state from localStorage or use default
  const [activeRole, setActiveRoleState] = useState<StakeholderRole>(() => {
    // Only use localStorage in the browser
    if (typeof window !== 'undefined') {
      const savedRole = localStorage.getItem('vv-docs-role');
      const isValidRole = (role: string): role is StakeholderRole => 
        ['exec', 'tech', 'audit', 'partner'].includes(role);
      return (savedRole && isValidRole(savedRole) ? savedRole : initialRole);
    }
    return initialRole;
  });

  // Update localStorage when role changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('vv-docs-role', activeRole);
    }
  }, [activeRole]);

  // Function to change the active role
  const setActiveRole = (role: StakeholderRole) => {
    setActiveRoleState(role);
  };

  // Check if the current role can access content with the given classification
  const canAccessClassification = (classification: ClassificationLevel): boolean => {
    return CLASSIFICATION_ACCESS_MAP[classification]?.includes(activeRole) || false;
  };

  // Check if the current role should see a specific document type
  const isRelevantDocType = (docType: string): boolean => {
    // If document type is not in the map, restrict access by default
    if (!DOC_TYPE_ROLE_MAP[docType]) {
      return false;
    }
    return DOC_TYPE_ROLE_MAP[docType]?.includes(activeRole) || false;
  };

  // Get a display name for the current role
  const getRoleDisplayName = (): string => {
    return ROLE_DISPLAY_NAMES[activeRole];
  };

  // Create the context value
  const contextValue: RoleContextType = {
    activeRole,
    setActiveRole,
    canAccessClassification,
    isRelevantDocType,
    getRoleDisplayName,
    isDevelopment,
  };

  return (
    <RoleContext.Provider value={contextValue}>
      {children}
    </RoleContext.Provider>
  );
};

/**
 * Higher-order component for role-based access control
 * Wraps a component and only renders it if the current role has access
 */
export function withRoleAccess<P extends object>(
  Component: React.ComponentType<P>,
  requiredClassification: ClassificationLevel = 'internal'
): React.FC<P> {
  const WrappedComponent: React.FC<P> = (props: P) => {
    const { canAccessClassification } = useRole();
    
    if (!canAccessClassification(requiredClassification)) {
      return null;
    }
    
    return <Component {...props} />;
  };

  WrappedComponent.displayName = `withRoleAccess(${Component.displayName || Component.name})`;
  return WrappedComponent;
}

/**
 * Component for conditionally rendering content based on role access
 */
export const RoleGuard: React.FC<{
  classification: ClassificationLevel;
  children: ReactNode;
  fallback?: ReactNode;
}> = ({ classification, children, fallback = null }) => {
  const { canAccessClassification } = useRole();
  
  if (!canAccessClassification(classification)) {
    return <>{fallback}</>;
  }
  
  return <>{children}</>;
};

export default RoleProvider;
