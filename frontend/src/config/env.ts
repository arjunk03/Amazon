/**
 * Environment configuration with validation
 */

interface EnvConfig {
    apiBaseUrl: string;
    isDevelopment: boolean;
    isProduction: boolean;
}

function getEnvVar(key: string, defaultValue?: string): string {
    const value = import.meta.env[key] || defaultValue;

    if (!value) {
        throw new Error(`Missing required environment variable: ${key}`);
    }

    return value;
}

export const env: EnvConfig = {
    apiBaseUrl: getEnvVar('VITE_API_BASE_URL', 'http://localhost:8000'),
    isDevelopment: import.meta.env.DEV,
    isProduction: import.meta.env.PROD,
};
