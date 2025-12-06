// src/stripe.js
import { loadStripe } from "@stripe/stripe-js";

// Use the VITE_ prefixed env variable
export const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
