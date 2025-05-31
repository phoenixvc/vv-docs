/**
 * Environment detection service
 * Centralizes logic for determining the current deployment environment
 */
export const environmentService = {
  /**
   * Check if the application is running in development mode
   */
  isDevelopment: (): boolean => {
    return process.env.NODE_ENV === 'development' || 
           environmentService.isLocalhost() || 
           environmentService.isStaging() || 
           environmentService.isPreview();
  },

  /**
   * Check if running on localhost
   */
  isLocalhost: (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.location.hostname === 'localhost' || 
           window.location.hostname === '127.0.0.1' ||
           window.location.hostname.startsWith('192.168.') ||
           window.location.hostname.endsWith('.local');
  },

  /**
   * Check if running in staging environment
   */
  isStaging: (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.location.hostname.includes('staging') ||
           window.location.hostname.includes('stage') ||
           process.env.REACT_APP_ENVIRONMENT === 'staging';
  },

  /**
   * Check if running in preview environment
   */
  isPreview: (): boolean => {
    if (typeof window === 'undefined') return false;
    return window.location.hostname.includes('preview') ||
           window.location.hostname.includes('netlify') ||
           window.location.hostname.includes('vercel') ||
           process.env.REACT_APP_ENVIRONMENT === 'preview';
  },

  /**
   * Check if running in production
   */
  isProduction: (): boolean => {
    return process.env.NODE_ENV === 'production' && 
           !environmentService.isStaging() && 
           !environmentService.isPreview() &&
           !environmentService.isLocalhost();
  },

  /**
   * Get the current environment name
   */
  getEnvironmentName: (): string => {
    if (environmentService.isLocalhost()) return 'localhost';
    if (environmentService.isStaging()) return 'staging';
    if (environmentService.isPreview()) return 'preview';
    if (environmentService.isProduction()) return 'production';
    return 'development';
  }
};