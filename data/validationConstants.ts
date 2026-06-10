import * as Yup from "yup"
import { InferType } from "yup";
import { passwordValidation, fullNameValidation } from "@/utils/validationUtils";

export const LoginValidationSchema = Yup.object().shape({
    emailOrUsername: Yup.string()
        .required("Email or username is required")
        .test(
            'email-or-username',
            'Please enter a valid email or username',
            function (value) {
                if (!value) return false;

                // Check if it's an email
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (emailRegex.test(value)) {
                    return true;
                }

                // Check if it's a valid username (alphanumeric, underscore, hyphen, 3-20 chars)
                const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
                if (usernameRegex.test(value)) {
                    return true;
                }

                return false;
            }
        )
        .label("Email or Username"),
    password: passwordValidation(),
});
export type LoginFormValues = InferType<typeof LoginValidationSchema>

export const SignupValidationSchema = Yup.object().shape({
    username: Yup.string()
        .required("Username is required")
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username must not exceed 20 characters")
        .matches(
            /^[a-zA-Z0-9_]+$/,
            "Username can only contain letters, numbers, and underscores"
        )
        .label("Username"),
    email: Yup.string()
        .required("Email is required")
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            "Please enter a valid email address"
        )
        .label("Email"),
    password: passwordValidation(),
    confirmPassword: Yup.string()
        .required("Please confirm your password")
        .oneOf([Yup.ref("password")], "Passwords must match")
        .label("Confirm Password"),
});
export type SignupFormValues = InferType<typeof SignupValidationSchema>

// Forgot Password Validation
export const ForgotPasswordValidationSchema = Yup.object().shape({
    email: Yup.string()
        .required("Email is required")
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            "Please enter a valid email address"
        )
        .label("Email"),
});
export type ForgotPasswordFormValues = Yup.InferType<typeof ForgotPasswordValidationSchema>;

// Password Reset Validation
export const PasswordResetValidationSchema = Yup.object().shape({
    password: passwordValidation(),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Please confirm your password"),
});
export type PasswordResetFormValues = Yup.InferType<typeof PasswordResetValidationSchema>;

// Contact Form Validation
export const ContactFormGuestValidationSchema = Yup.object().shape({
    name: fullNameValidation(),
    email: Yup.string()
        .required("Email is required")
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            "Please enter a valid email address"
        )
        .label("Email"),
    phone: Yup.string()
        .required("Phone number is required")
        .matches(/^0[0-9]{9}$/, 'Phone number must be 10 digits starting with 0')
        .label("Phone"),
    subject: Yup.string()
        .required("Subject is required")
        .min(5, "Subject must be at least 5 characters")
        .max(200, "Subject must not exceed 200 characters")
        .label("Subject"),
    message: Yup.string()
        .required("Message is required")
        .min(10, "Message must be at least 10 characters")
        .max(2000, "Message must not exceed 2000 characters")
        .label("Message"),
});
export type ContactFormGuestValues = InferType<typeof ContactFormGuestValidationSchema>;