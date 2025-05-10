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