# EmailJS Setup Instructions

Your contact form is now configured to send **2 automatic emails**:
1. **To you:** info@groworaindia.com (with inquiry details)
2. **To customer:** Auto-reply thank you email

## Setup Steps (Takes 5 minutes):

### 1. Create Free EmailJS Account
- Go to: https://www.emailjs.com/
- Click "Sign Up" (It's FREE - no credit card needed)
- Verify your email

### 2. Add Email Service
- In EmailJS dashboard, go to "Email Services"
- Click "Add New Service"
- Choose your email provider (Gmail recommended)
- Connect your email account (the one you'll use to SEND emails)
- Note the **Service ID** (looks like: `service_abc123`)

### 3. Create EMAIL TEMPLATE #1 (For You - Receives Inquiries)
- Go to "Email Templates"
- Click "Create New Template"
- **Template Name:** "Inquiry Notification"
- Use this template:

**Subject:**
```
New Inquiry from {{from_name}}
```

**Content:**
```
You have received a new inquiry from your website:

Name: {{from_name}}
Email: {{from_email}}
Company: {{company}}
Product Interest: {{product}}
Quantity: {{quantity}}

Message:
{{message}}

---
Reply to: {{from_email}}
```

- **To Email:** `info@groworaindia.com`
- **From Name:** `GROWORA Website`
- Save and note the **Template ID** (e.g., `template_xyz789`)

### 4. Create EMAIL TEMPLATE #2 (Auto-Reply to Customer)
- Click "Create New Template" again
- **Template Name:** "Customer Thank You"
- Use this template:

**Subject:**
```
Thank You for Your Inquiry - GROWORA
```

**Content:**
```
Dear {{to_name}},

Thank you for your inquiry with GROWORA!

We have received your message and our team will review it shortly. You can expect a response from us within 24 hours.

In the meantime, if you have any urgent questions, feel free to:
- Call us: +91 7068683737 / +91 99675 14905
- Email us: info@groworaindia.com

We look forward to serving you!

Best regards,
GROWORA Team
Your Trusted Partner for Premium Agricultural Commodity Exports
```

- **To Email:** `{{to_email}}` (this will use the customer's email)
- **From Name:** `GROWORA`
- **Reply To:** `info@groworaindia.com`
- Save and note the **Template ID** (e.g., `template_abc456`)

### 5. Get Public Key
- Go to "Account" > "General"
- Copy your **Public Key** (looks like: `user_DEF456ghi`)

### 6. Update the Code
Open `src/components/ContactSection.tsx` and replace these lines (around line 25):

```typescript
const serviceId = 'YOUR_SERVICE_ID';                    // Your Service ID
const templateId = 'YOUR_TEMPLATE_ID';                  // Template #1 ID (inquiry to you)
const autoReplyTemplateId = 'YOUR_AUTOREPLY_TEMPLATE_ID'; // Template #2 ID (thank you to customer)
const publicKey = 'YOUR_PUBLIC_KEY';                    // Your Public Key
```

### 7. Test It!
- Fill out the contact form on your website
- Click "Send Inquiry"
- **You should receive:** Email at info@groworaindia.com with inquiry details
- **Customer receives:** Thank you email at their email address

## How It Works Now

**Customer Journey:**
1. Customer fills form with their details
2. Clicks "Send Inquiry"
3. **Customer gets:** Instant "Thank You" email
4. **You get:** Email with all inquiry details at info@groworaindia.com
5. You reply to customer from your email

## Free Tier Limits
- 200 emails per month (FREE forever)
- This counts as 2 emails per form submission (one to you, one to customer)
- = 100 form submissions per month free
- Should be enough for most small businesses

## Troubleshooting
- If emails don't arrive, check your spam folder
- Verify all IDs are correct in the code (3 IDs needed now)
- Check EmailJS dashboard for error logs
- Make sure `{{to_email}}` is used in auto-reply template settings
