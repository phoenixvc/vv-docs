/// <reference types="@docusaurus/module-type-aliases" />
/// <reference types="@docusaurus/theme-classic" />

// Additional type definitions for third-party modules

declare module 'tailwindcss-animate' {
  import { PluginAPI } from 'tailwindcss/types/config';
  
  interface AnimateOptions {
    theme?: {
      extend?: {
        animation?: Record<string, string>;
        keyframes?: Record<string, Record<string, string>>;
      };
    };
  }
  
  const animate: (options?: AnimateOptions) => ReturnType<PluginAPI['plugin']>;
  export default animate;
}

declare module '@theme/Mermaid' {
  interface MermaidProps {
    chart: string;
    caption?: string;
  }
  
  const Mermaid: React.FC<MermaidProps>;
  export default Mermaid;
}