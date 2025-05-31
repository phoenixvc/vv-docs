import React, { useState } from 'react';
import { useRole, StakeholderRole } from './RoleContext';
import clsx from 'clsx';

// Define role information with descriptions and icons
const ROLE_INFO: Record<StakeholderRole, { 
  description: string; 
  icon: React.ReactNode;
  color: string;
}> = {
  'exec': {
    description: 'View documentation as an executive leader focused on project health, risk, and roadmap',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
      </svg>
    ),
    color: 'bg-blue-100 text-blue-800 border-blue-300',
  },
  'tech': {
    description: 'View documentation as a technical team member focused on implementation details and APIs',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    ),
    color: 'bg-green-100 text-green-800 border-green-300',
  },
  'audit': {
    description: 'View documentation as a compliance/audit team member focused on governance and standards',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
    color: 'bg-purple-100 text-purple-800 border-purple-300',
  },
  'partner': {
    description: 'View documentation as an external partner focused on integration and public information',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
      </svg>
    ),
    color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  },
};

/**
 * RoleSwitcher component for changing the active stakeholder role
 * Only visible in development or staging environments
 */
const RoleSwitcher: React.FC = () => {
  const { activeRole, setActiveRole, isDevelopment, getRoleDisplayName } = useRole();
  const [isOpen, setIsOpen] = useState(false);

  // Don't render in production
  if (!isDevelopment) {
    return null;
  }

  // Toggle dropdown
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Close dropdown when clicking outside
  const handleClickOutside = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  // Change the active role
  const changeRole = (role: StakeholderRole) => {
    setActiveRole(role);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Environment indicator */}
      <div className="mb-2 text-xs font-medium text-center bg-amber-100 text-amber-800 px-2 py-1 rounded-md">
        Development Environment
      </div>
      
      {/* Role switcher dropdown */}
      <div className="relative">
        {/* Current role button */}
        <button
          onClick={toggleDropdown}
          className={clsx(
            "flex items-center space-x-2 px-4 py-2 rounded-md shadow-md",
            "border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
            ROLE_INFO[activeRole].color
          )}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <span className="flex items-center">
            {ROLE_INFO[activeRole].icon}
            <span className="ml-2">View as: {getRoleDisplayName()}</span>
          </span>
          <svg 
            className={clsx("h-5 w-5 transition-transform", isOpen && "transform rotate-180")} 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        
        {/* Dropdown menu */}
        {isOpen && (
          <>
            {/* Overlay to detect clicks outside */}
            <div 
              className="fixed inset-0 z-40" 
              onClick={handleClickOutside}
              aria-hidden="true"
            />
            
            {/* Dropdown content */}
            <div 
              className="absolute right-0 bottom-full mb-2 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="role-switcher-button"
            >
              <div className="py-1" role="none">
                {Object.entries(ROLE_INFO).map(([role, info]) => (
                  <button
                    key={role}
                    onClick={() => changeRole(role as StakeholderRole)}
                    className={clsx(
                      "w-full text-left px-4 py-3 text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none",
                      activeRole === role ? "bg-gray-50" : ""
                    )}
                    role="menuitem"
                  >
                    <div className="flex items-center">
                      <div className={clsx(
                        "flex-shrink-0 p-1 rounded-full",
                        info.color
                      )}>
                        {info.icon}
                      </div>
                      <div className="ml-3">
                        <p className="font-medium">{role === 'exec' ? 'Executive Leadership' : 
                                                  role === 'tech' ? 'Technical Team' : 
                                                  role === 'audit' ? 'Compliance & Audit' : 
                                                  'External Partners'}</p>
                        <p className="text-xs text-gray-500 mt-1">{info.description}</p>
                      </div>
                      {activeRole === role && (
                        <div className="ml-auto">
                          <svg className="h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RoleSwitcher;
