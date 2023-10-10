import Stripe from "stripe";

const stripeAPIKEY = "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";
export const stripe = new Stripe(stripeAPIKEY, {
    apiVersion: "2023-08-16",
    typescript:true
})