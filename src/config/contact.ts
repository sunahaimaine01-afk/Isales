/**
 * I SALE AUTOS — Contact & Integration Configuration
 * 
 * Central configuration file for dealership contact endpoints.
 * All client details, Instagram handles, and lead capture destinations
 * are managed here in one place.
 * 
 * NOTE FOR DEALERSHIP OWNER / DEVELOPER:
 * To connect a live backend or email routing service (e.g. Formspree, Resend,
 * Webhook, or your custom CRM), set `EMAIL_FORWARDING_ENABLED` to true and
 * provide your endpoint URL below.
 */

export const DEALERSHIP_CONFIG = {
  // Brand Identity
  brandName: 'I SALE AUTOS',
  tagline: 'Curated Pre-Owned Vehicles & Direct Buyer Experience',
  
  // Official Instagram Channel (Primary contact method provided)
  instagram: {
    handle: '@isale.autos',
    username: 'isale.autos',
    url: 'https://www.instagram.com/isale.autos/',
    dmUrl: 'https://ig.me/m/isale.autos',
  },

  // Lead Routing / Backend Integration Setup
  // Set to true once an email service (Formspree, Resend, SendGrid) or API is connected
  inquiryIntegration: {
    isConfigured: false,
    endpointUrl: '', // e.g., 'https://api.isaleautos.com/leads' or 'https://formspree.io/f/your_form_id'
    providerName: 'Direct Instagram & Local Client Demo Storage',
    developerInstructions: 
      'To connect live email delivery, add your backend API endpoint or service webhook to DEALERSHIP_CONFIG.inquiryIntegration.endpointUrl.',
  },

  // Trust & Transparency Notices
  demoNotice: {
    title: 'Demonstration Inventory Notice',
    badgeText: 'Demonstration Showcase',
    description: 
      'This website is a demonstration showcase for I SALE AUTOS. Initial listings are based on publicly shared post details from @isale.autos on Instagram. Please reach out directly on Instagram to confirm current vehicle availability, pricing, and updated specifications.',
  },
} as const;
