/**
 * Form validation utilities
 */

export const validators = {
    email: (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    password: (password: string): { valid: boolean; message?: string } => {
        if (password.length < 8) {
            return { valid: false, message: 'Password must be at least 8 characters' };
        }
        return { valid: true };
    },

    phone: (phone: string): boolean => {
        if (!phone) return true; // Optional field
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
    },

    required: (value: string): boolean => {
        return value.trim().length > 0;
    },
};

export function validateForm(fields: Record<string, string>, rules: Record<string, (value: string) => boolean | { valid: boolean; message?: string }>): { valid: boolean; errors: Record<string, string> } {
    const errors: Record<string, string> = {};

    for (const [field, rule] of Object.entries(rules)) {
        const value = fields[field] || '';
        const result = rule(value);

        if (typeof result === 'boolean') {
            if (!result) {
                errors[field] = `Invalid ${field}`;
            }
        } else {
            if (!result.valid) {
                errors[field] = result.message || `Invalid ${field}`;
            }
        }
    }

    return {
        valid: Object.keys(errors).length === 0,
        errors,
    };
}
