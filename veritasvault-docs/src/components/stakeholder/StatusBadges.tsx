import React from 'react';
import clsx from 'clsx';
import { useRole } from './RoleContext';

// Define types for the component props based on the frontmatter schema
interface StatusBadgesProps {
  // Core required fields from the frontmatter schema
  document_type: string;
  classification: 'internal' | 'public' | 'confidential';
  status: 'draft' | 'review' | 'approved' | 'archived';
  version: string;
  last_updated: string;
  priority: 'p0' | 'p1' | 'p2' | 'p3';
  // Optional fields
  next_review?: string;
  className?: string;
  compact?: boolean; // For condensed display in sidebars or lists
}

// Color mappings for different statuses
const STATUS_COLORS = {
  draft: 'bg-amber-100 text-amber-800 border-amber-300',
  review: 'bg-blue-100 text-blue-800 border-blue-300',
  approved: 'bg-green-100 text-green-800 border-green-300',
  archived: 'bg-gray-100 text-gray-800 border-gray-300',
};

// Color mappings for priorities
const PRIORITY_COLORS = {
  p0: 'bg-red-100 text-red-800 border-red-300',
  p1: 'bg-orange-100 text-orange-800 border-orange-300',
  p2: 'bg-blue-100 text-blue-800 border-blue-300',
  p3: 'bg-gray-100 text-gray-800 border-gray-300',
};

// Color mappings for classification
const CLASSIFICATION_COLORS = {
  internal: 'bg-purple-100 text-purple-800 border-purple-300',
  public: 'bg-green-100 text-green-800 border-green-300',
  confidential: 'bg-red-100 text-red-800 border-red-300',
};

// Icons for document types (using inline SVGs for simplicity)
const DOC_TYPE_ICONS: Record<string, React.ReactNode> = {
  architecture: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
    </svg>
  ),
  'domain-overview': (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
      <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
    </svg>
  ),
  specification: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
    </svg>
  ),
  guide: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
      <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
    </svg>
  ),
  policy: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
    </svg>
  ),
  // Default icon for other document types
  default: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
    </svg>
  ),
};

/**
 * Format a date string into a human-readable format
 */
const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    // Return relative time if recent (within last 30 days)
    const daysDiff = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysDiff < 1) {
      return 'Today';
    } else if (daysDiff === 1) {
      return 'Yesterday';
    } else if (daysDiff < 30) {
      return `${daysDiff} days ago`;
    } else {
      // Otherwise return formatted date
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    }
  } catch (e) {
    return dateString; // Fallback to original string if parsing fails
  }
};

/**
 * Get priority label with appropriate formatting
 */
const getPriorityLabel = (priority: string): string => {
  switch (priority) {
    case 'p0':
      return 'Critical';
    case 'p1':
      return 'High';
    case 'p2':
      return 'Medium';
    case 'p3':
      return 'Low';
    default:
      return priority;
  }
};

/**
 * The StatusBadges component displays visual indicators based on document metadata
 */
export const StatusBadges: React.FC<StatusBadgesProps> = ({
  document_type,
  classification,
  status,
  version,
  last_updated,
  priority,
  next_review,
  className = '',
  compact = false,
}) => {
  const { activeRole } = useRole();
  
  // Base badge style
  const badgeClass = "inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium border";
  
  // Common badge classes with appropriate spacing
  const spacingClass = compact ? "mr-1 mb-1" : "mr-2 mb-2";
  
  // Get document type icon
  const docTypeIcon = DOC_TYPE_ICONS[document_type] || DOC_TYPE_ICONS.default;
  
  return (
    <div className={clsx("flex flex-wrap items-center", compact ? "gap-1" : "gap-2", className)} 
         aria-label="Document metadata">
      
      {/* Status Badge */}
      <span 
        className={clsx(badgeClass, STATUS_COLORS[status], spacingClass)}
        title={`Status: ${status}`}
        aria-label={`Status: ${status}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
      
      {/* Priority Badge */}
      <span 
        className={clsx(badgeClass, PRIORITY_COLORS[priority], spacingClass)}
        title={`Priority: ${getPriorityLabel(priority)}`}
        aria-label={`Priority: ${getPriorityLabel(priority)}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
        {getPriorityLabel(priority)}
      </span>
      
      {/* Classification Badge */}
      <span 
        className={clsx(badgeClass, CLASSIFICATION_COLORS[classification], spacingClass)}
        title={`Classification: ${classification}`}
        aria-label={`Classification: ${classification}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
        {classification.charAt(0).toUpperCase() + classification.slice(1)}
      </span>
      
      {/* Document Type Badge */}
      <span 
        className={clsx(badgeClass, "bg-gray-100 text-gray-800 border-gray-300", spacingClass)}
        title={`Document Type: ${document_type}`}
        aria-label={`Document Type: ${document_type}`}
      >
        {docTypeIcon}
        {document_type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
      </span>
      
      {/* Version Badge - only shown if not compact */}
      {!compact && (
        <span 
          className={clsx(badgeClass, "bg-indigo-100 text-indigo-800 border-indigo-300", spacingClass)}
          title={`Version: ${version}`}
          aria-label={`Version: ${version}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          v{version}
        </span>
      )}
      
      {/* Last Updated Badge - only shown if not compact */}
      {!compact && (
        <span 
          className={clsx(badgeClass, "bg-gray-100 text-gray-800 border-gray-300", spacingClass)}
          title={`Last Updated: ${last_updated}`}
          aria-label={`Last Updated: ${last_updated}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          {formatDate(last_updated)}
        </span>
      )}
      
      {/* Next Review Badge - only shown for audit role and if available */}
      {!compact && next_review && activeRole === 'audit' && (
        <span 
          className={clsx(badgeClass, "bg-yellow-100 text-yellow-800 border-yellow-300", spacingClass)}
          title={`Next Review: ${next_review}`}
          aria-label={`Next Review: ${next_review}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          Review: {formatDate(next_review)}
        </span>
      )}
    </div>
  );
};

export default StatusBadges;
