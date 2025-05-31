import React, { useState, useEffect } from 'react';
import { useRole } from './RoleContext';
import clsx from 'clsx';

// Define types for the metrics data
interface DocumentMetrics {
  totalDocuments: number;
  byStatus: Record<string, number>;
  byPriority: Record<string, number>;
  byDocType: Record<string, number>;
  byClassification: Record<string, number>;
  recentlyUpdated: number; // Last 30 days
  needsReview: number;
  averageAge: number; // In days
  completionRate: number; // Percentage of docs not in draft
  riskScore: number; // 0-100, higher is more risk
  healthScore: number; // 0-100, higher is better health
}

// Interface for document item in recent activity
interface RecentDocumentActivity {
  title: string;
  path: string;
  status: string;
  priority: string;
  lastUpdated: string;
  updatedBy: string;
}

// Mock data for demonstration - in real implementation, this would be generated from actual frontmatter
const MOCK_METRICS: DocumentMetrics = {
  totalDocuments: 127,
  byStatus: {
    draft: 23,
    review: 18,
    approved: 82,
    archived: 4
  },
  byPriority: {
    p0: 7,
    p1: 32,
    p2: 58,
    p3: 30
  },
  byDocType: {
    architecture: 15,
    'domain-overview': 8,
    specification: 34,
    guide: 42,
    policy: 12,
    'api-standards': 8,
    'security-standard': 8
  },
  byClassification: {
    internal: 98,
    public: 22,
    confidential: 7
  },
  recentlyUpdated: 37,
  needsReview: 12,
  averageAge: 64, // days
  completionRate: 78.7, // percentage
  riskScore: 24, // 0-100
  healthScore: 82 // 0-100
};

// Mock recent activity
const MOCK_RECENT_ACTIVITY: RecentDocumentActivity[] = [
  {
    title: "Tokenomics Overview",
    path: "/docs/tokenomics",
    status: "approved",
    priority: "p1",
    lastUpdated: "2025-05-28",
    updatedBy: "Jurie Smit"
  },
  {
    title: "Security Architecture",
    path: "/docs/security/architecture",
    status: "review",
    priority: "p0",
    lastUpdated: "2025-05-26",
    updatedBy: "Alex Chen"
  },
  {
    title: "Integration API Standards",
    path: "/docs/api-standards/integration",
    status: "draft",
    priority: "p1",
    lastUpdated: "2025-05-25",
    updatedBy: "Maria Rodriguez"
  },
  {
    title: "Compliance Framework",
    path: "/docs/governance/compliance",
    status: "approved",
    priority: "p1",
    lastUpdated: "2025-05-22",
    updatedBy: "Sam Taylor"
  },
  {
    title: "DeFi Risk Assessment",
    path: "/docs/risk/defi-assessment",
    status: "review",
    priority: "p0",
    lastUpdated: "2025-05-21",
    updatedBy: "Jurie Smit"
  }
];

// Helper function to get color based on health score
const getHealthColor = (score: number): string => {
  if (score >= 80) return 'text-green-600';
  if (score >= 60) return 'text-yellow-500';
  return 'text-red-600';
};

// Helper function to get color based on risk score
const getRiskColor = (score: number): string => {
  if (score <= 20) return 'text-green-600';
  if (score <= 50) return 'text-yellow-500';
  return 'text-red-600';
};

// Helper function to get status color
const getStatusColor = (status: string): string => {
  switch (status) {
    case 'approved': return 'bg-green-100 text-green-800';
    case 'review': return 'bg-blue-100 text-blue-800';
    case 'draft': return 'bg-amber-100 text-amber-800';
    case 'archived': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

// Helper function to get priority color
const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case 'p0': return 'bg-red-100 text-red-800';
    case 'p1': return 'bg-orange-100 text-orange-800';
    case 'p2': return 'bg-blue-100 text-blue-800';
    case 'p3': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

// Helper function to format date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Invalid date';
  
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

/**
 * Executive Dashboard Component
 * Displays high-level metrics and KPIs for executive stakeholders
 */
const ExecDashboard: React.FC = () => {
  const { activeRole } = useRole();
  const [metrics, setMetrics] = useState<DocumentMetrics>(MOCK_METRICS);
  const [recentActivity, setRecentActivity] = useState<RecentDocumentActivity[]>(MOCK_RECENT_ACTIVITY);
  const [isLoading, setIsLoading] = useState(false);
  
  // In a real implementation, this would fetch data from an API or pre-generated JSON
const ExecDashboard: React.FC = () => {
  const { activeRole } = useRole();
  const [metrics, setMetrics] = useState<DocumentMetrics>(MOCK_METRICS);
  const [recentActivity, setRecentActivity] = useState<RecentDocumentActivity[]>(MOCK_RECENT_ACTIVITY);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // In a real implementation, you would fetch actual data here
        // const response = await fetch('/api/documentation-metrics');
        // const data = await response.json();
        // setMetrics(data.metrics);
        // setRecentActivity(data.recentActivity);
        
        // Using mock data for demonstration
        setMetrics(MOCK_METRICS);
        setRecentActivity(MOCK_RECENT_ACTIVITY);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Failed to load dashboard data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  // ...existing render logic
  // you can now display `error` to the user when it's non-null
};
  
  // Only render for executive role
  if (activeRole !== 'exec' && activeRole !== 'tech') { // Allow tech for development/testing
    return (
      <div
        className="p-6 bg-amber-50 rounded-lg border border-amber-200"
        role="alert"
        aria-live="polite"
      >
        <div className="flex items-center">
          <svg
            className="h-5 w-5 text-amber-400 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <h2 className="text-xl font-semibold text-amber-800">Access Restricted</h2>
        </div>
        <p className="text-amber-700 mt-2">
          This dashboard is only available to executive and technical stakeholders. Current role:{' '}
          <strong>{getRoleDisplayName()}</strong>
        </p>
      </div>
    );
  }
  
  // Loading state
  if (isLoading) {
    return (
      <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Executive Dashboard</h2>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Documentation Health Dashboard</h2>
        
        {/* Top KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Health Score */}
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-500">Documentation Health</h3>
              <span className={clsx("text-xs font-medium px-2.5 py-0.5 rounded-full", 
                metrics.healthScore >= 80 ? "bg-green-100 text-green-800" : 
                metrics.healthScore >= 60 ? "bg-yellow-100 text-yellow-800" : 
                "bg-red-100 text-red-800"
              )}>
                {metrics.healthScore >= 80 ? "Good" : 
                 metrics.healthScore >= 60 ? "Needs Attention" : 
                 "At Risk"}
              </span>
            </div>
            <div className="mt-2 flex items-baseline">
              <p className={clsx("text-3xl font-semibold", getHealthColor(metrics.healthScore))}>
                {metrics.healthScore}%
              </p>
              <span className="ml-1 text-sm text-gray-500">of target</span>
            </div>
            <div className="mt-4 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={clsx("h-full rounded-full", 
                  metrics.healthScore >= 80 ? "bg-green-500" : 
                  metrics.healthScore >= 60 ? "bg-yellow-500" : 
                  "bg-red-500"
                )} 
                style={{ width: `${metrics.healthScore}%` }}
              ></div>
            </div>
          </div>
          
          {/* Risk Score */}
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-500">Documentation Risk</h3>
              <span className={clsx("text-xs font-medium px-2.5 py-0.5 rounded-full", 
                metrics.riskScore <= 20 ? "bg-green-100 text-green-800" : 
                metrics.riskScore <= 50 ? "bg-yellow-100 text-yellow-800" : 
                "bg-red-100 text-red-800"
              )}>
                {metrics.riskScore <= 20 ? "Low" : 
                 metrics.riskScore <= 50 ? "Medium" : 
                 "High"}
              </span>
            </div>
            <div className="mt-2 flex items-baseline">
              <p className={clsx("text-3xl font-semibold", getRiskColor(metrics.riskScore))}>
                {metrics.riskScore}
              </p>
              <span className="ml-1 text-sm text-gray-500">/ 100</span>
            </div>
            <div className="mt-4 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={clsx("h-full rounded-full", 
                  metrics.riskScore <= 20 ? "bg-green-500" : 
                  metrics.riskScore <= 50 ? "bg-yellow-500" : 
                  "bg-red-500"
                )} 
                style={{ width: `${metrics.riskScore}%` }}
              ></div>
            </div>
          </div>
          
          {/* Completion Rate */}
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-500">Completion Rate</h3>
              <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full">
                {metrics.completionRate.toFixed(1)}%
              </span>
            </div>
            <div className="mt-2">
              <p className="text-3xl font-semibold text-gray-900">
                {metrics.totalDocuments - metrics.byStatus.draft}
                <span className="text-lg text-gray-500">/{metrics.totalDocuments}</span>
              </p>
              <p className="text-sm text-gray-500 mt-1">Documents completed</p>
            </div>
            <div className="mt-4 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full" 
                style={{ width: `${metrics.completionRate}%` }}
              ></div>
            </div>
          </div>
          
          {/* Documents Needing Review */}
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-500">Needs Review</h3>
              <span className={clsx("text-xs font-medium px-2.5 py-0.5 rounded-full", 
                metrics.needsReview <= 5 ? "bg-green-100 text-green-800" : 
                metrics.needsReview <= 15 ? "bg-yellow-100 text-yellow-800" : 
                "bg-red-100 text-red-800"
              )}>
                {metrics.needsReview} docs
              </span>
            </div>
            <div className="mt-2">
              <p className="text-3xl font-semibold text-gray-900">
                {metrics.needsReview}
              </p>
              <div className="flex items-center text-sm mt-1">
                <svg className="h-5 w-5 text-yellow-500 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-500">
                  {metrics.needsReview > 0 
                    ? `${Math.round(metrics.needsReview / metrics.totalDocuments * 100)}% of total` 
                    : 'All documents reviewed'}
                </span>
              </div>
            </div>
            <div className="mt-4">
              <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                View review queue →
              </button>
            </div>
          </div>
        </div>
        
        {/* Middle Section - Charts and Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Status Distribution */}
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 mb-4">Status Distribution</h3>
            <div className="space-y-4">
              {Object.entries(metrics.byStatus).map(([status, count]) => (
                <div key={status} className="flex items-center">
                  <span className={clsx("inline-block w-3 h-3 rounded-full mr-2", 
                    status === 'approved' ? 'bg-green-500' : 
                    status === 'review' ? 'bg-blue-500' : 
                    status === 'draft' ? 'bg-amber-500' : 
                    'bg-gray-500'
                  )}></span>
                  <span className="text-sm text-gray-600 capitalize">{status}</span>
                  <span className="ml-auto text-sm font-medium text-gray-900">{count}</span>
                  <span className="ml-2 text-xs text-gray-500">
                    ({Math.round(count / metrics.totalDocuments * 100)}%)
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 h-2 w-full bg-gray-200 rounded-full overflow-hidden flex">
              {Object.entries(metrics.byStatus).map(([status, count]) => (
                <div 
                  key={status}
                  className={clsx("h-full", 
                    status === 'approved' ? 'bg-green-500' : 
                    status === 'review' ? 'bg-blue-500' : 
                    status === 'draft' ? 'bg-amber-500' : 
                    'bg-gray-500'
                  )} 
                  style={{ width: `${count / metrics.totalDocuments * 100}%` }}
                ></div>
              ))}
            </div>
          </div>
          
          {/* Priority Distribution */}
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 mb-4">Priority Distribution</h3>
            <div className="space-y-4">
              {Object.entries(metrics.byPriority).map(([priority, count]) => (
                <div key={priority} className="flex items-center">
                  <span className={clsx("inline-block w-3 h-3 rounded-full mr-2", 
                    priority === 'p0' ? 'bg-red-500' : 
                    priority === 'p1' ? 'bg-orange-500' : 
                    priority === 'p2' ? 'bg-blue-500' : 
                    'bg-gray-500'
                  )}></span>
                  <span className="text-sm text-gray-600">
                    {priority === 'p0' ? 'Critical (P0)' : 
                     priority === 'p1' ? 'High (P1)' : 
                     priority === 'p2' ? 'Medium (P2)' : 
                     'Low (P3)'}
                  </span>
                  <span className="ml-auto text-sm font-medium text-gray-900">{count}</span>
                  <span className="ml-2 text-xs text-gray-500">
                    ({Math.round(count / metrics.totalDocuments * 100)}%)
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 h-2 w-full bg-gray-200 rounded-full overflow-hidden flex">
              {Object.entries(metrics.byPriority).map(([priority, count]) => (
                <div 
                  key={priority}
                  className={clsx("h-full", 
                    priority === 'p0' ? 'bg-red-500' : 
                    priority === 'p1' ? 'bg-orange-500' : 
                    priority === 'p2' ? 'bg-blue-500' : 
                    'bg-gray-500'
                  )} 
                  style={{ width: `${count / metrics.totalDocuments * 100}%` }}
                ></div>
              ))}
            </div>
          </div>
          
          {/* Document Type Distribution */}
          <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
            <h3 className="text-sm font-medium text-gray-500 mb-4">Document Types</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
              {Object.entries(metrics.byDocType)
                .sort(([, countA], [, countB]) => countB - countA) // Sort by count descending
                .map(([docType, count]) => (
                <div key={docType} className="flex items-center">
                  <span className="text-sm text-gray-600 capitalize">
                    {docType.split('-').join(' ')}
                  </span>
                  <span className="ml-auto text-sm font-medium text-gray-900">{count}</span>
                  <div className="ml-2 w-16 bg-gray-200 rounded-full h-1.5">
                    <div 
                      className="bg-indigo-500 h-1.5 rounded-full" 
                      style={{ width: `${count / Math.max(...Object.values(metrics.byDocType)) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom Section - Recent Activity */}
        <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Recent Document Activity</h3>
            <a href="#" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              View all activity →
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Document
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Updated
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    By
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentActivity.map((doc, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <a href={doc.path} className="text-sm font-medium text-blue-600 hover:text-blue-800">
                        {doc.title}
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={clsx("px-2 inline-flex text-xs leading-5 font-semibold rounded-full", getStatusColor(doc.status))}>
                        {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={clsx("px-2 inline-flex text-xs leading-5 font-semibold rounded-full", getPriorityColor(doc.priority))}>
                        {doc.priority.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(doc.lastUpdated)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {doc.updatedBy}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecDashboard;
