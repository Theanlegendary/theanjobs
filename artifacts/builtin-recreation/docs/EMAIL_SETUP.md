# Email Notification System Setup

## Overview

This document outlines the email notification system for the Sandbox platform, including templates, triggers, and implementation guide.

## Email Service Providers

### Recommended Options

1. **SendGrid** (Recommended for startups)
   - Free tier: 100 emails/day
   - Paid: Starting at $15/month (40k emails)
   - Excellent deliverability
   - Easy template management

2. **Postmark** (Best for transactional emails)
   - $10/month for 10k emails
   - Industry-leading deliverability (99%+)
   - Beautiful default templates

3. **AWS SES** (Most affordable at scale)
   - $0.10 per 1,000 emails
   - Requires more setup
   - Best for high volume

## Email Types & Triggers

### 1. Authentication Emails

#### Welcome Email
**Trigger:** User completes registration
**Template:** `welcome.html`
**Variables:** `{name}`, `{verificationLink}`

```
Subject: Welcome to Sandbox! 🎉

Hi {name},

Welcome to Sandbox - your gateway to tech careers!

To get started, please verify your email:
[Verify Email Button] → {verificationLink}

Next steps:
- Complete your profile
- Upload your resume
- Start applying to jobs

Best regards,
The Sandbox Team
```

#### Email Verification
**Trigger:** User registers or requests re-verification
**Template:** `email-verification.html`
**Variables:** `{name}`, `{verificationLink}`, `{expiryTime}`

#### Password Reset
**Trigger:** User requests password reset
**Template:** `password-reset.html`
**Variables:** `{name}`, `{resetLink}`, `{expiryTime}`

```
Subject: Reset Your Password

Hi {name},

We received a request to reset your password.

[Reset Password Button] → {resetLink}

This link expires in {expiryTime}.

If you didn't request this, please ignore this email.
```

### 2. Job Application Emails

#### Application Confirmation
**Trigger:** User submits job application
**Template:** `application-confirmation.html`
**Variables:** `{name}`, `{jobTitle}`, `{companyName}`, `{applicationId}`, `{dashboardLink}`

```
Subject: Application Submitted - {jobTitle} at {companyName}

Hi {name},

Your application has been submitted successfully!

Job: {jobTitle}
Company: {companyName}
Application ID: {applicationId}

[Track Application] → {dashboardLink}

What's next?
- The employer will review your application
- You'll receive updates via email
- Track status in your dashboard

Good luck!
```

#### Application Status Update
**Trigger:** Employer updates application status
**Template:** `application-status-update.html`
**Variables:** `{name}`, `{jobTitle}`, `{companyName}`, `{newStatus}`, `{message}`

**Statuses:**
- Under Review
- Interview Scheduled
- Offer Extended
- Not Selected

### 3. Job Alerts & Recommendations

#### Daily Job Digest
**Trigger:** Daily at 9 AM (user's timezone)
**Template:** `job-digest.html`
**Frequency:** Daily (can be changed to weekly)
**Variables:** `{name}`, `{jobsList}`, `{unsubscribeLink}`

```
Subject: 🔥 {count} New Tech Jobs Match Your Profile

Hi {name},

We found {count} new jobs matching your preferences:

[Job Card 1]
- Title, Company, Location, Salary
[Apply Now Button]

[Job Card 2]
[Job Card 3]

[View All Jobs] → /jobs?recommended=true

Manage preferences: {settingsLink}
Unsubscribe: {unsubscribeLink}
```

#### Saved Search Alert
**Trigger:** New jobs match saved search criteria
**Template:** `saved-search-alert.html`
**Frequency:** Real-time or daily batch

### 4. Company & Profile Updates

#### Company Followed
**Trigger:** User follows a company
**Template:** `company-followed.html`

#### New Job from Followed Company
**Trigger:** Followed company posts new job
**Template:** `company-new-job.html`

#### Profile Viewed by Employer
**Trigger:** Employer views candidate profile
**Template:** `profile-viewed.html`

### 5. Administrative Emails

#### Account Verification Required
**Trigger:** Suspicious activity detected

#### Account Suspended
**Trigger:** Terms violation

#### Newsletter/Product Updates
**Trigger:** Manual send
**Frequency:** Monthly

## Implementation Guide

### Backend Email Service

```typescript
// src/services/email.service.ts

import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export interface EmailTemplate {
  to: string;
  templateId: string;
  dynamicData: Record<string, any>;
}

export const emailService = {
  // Send transactional email
  async sendTransactional(data: EmailTemplate) {
    const msg = {
      to: data.to,
      from: 'noreply@sandbox.com',
      templateId: data.templateId,
      dynamicTemplateData: data.dynamicData,
    };

    try {
      await sgMail.send(msg);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Email send failed:', error);
      throw error;
    }
  },

  // Welcome email
  async sendWelcomeEmail(user: { email: string; name: string; verificationToken: string }) {
    return this.sendTransactional({
      to: user.email,
      templateId: 'd-welcome123', // Your SendGrid template ID
      dynamicData: {
        name: user.name,
        verificationLink: `https://sandbox.com/verify?token=${user.verificationToken}`,
      },
    });
  },

  // Application confirmation
  async sendApplicationConfirmation(data: {
    email: string;
    name: string;
    jobTitle: string;
    companyName: string;
    applicationId: string;
  }) {
    return this.sendTransactional({
      to: data.email,
      templateId: 'd-application123',
      dynamicData: {
        name: data.name,
        jobTitle: data.jobTitle,
        companyName: data.companyName,
        applicationId: data.applicationId,
        dashboardLink: 'https://sandbox.com/candidate-dashboard',
      },
    });
  },

  // Password reset
  async sendPasswordReset(user: { email: string; name: string; resetToken: string }) {
    return this.sendTransactional({
      to: user.email,
      templateId: 'd-password-reset123',
      dynamicData: {
        name: user.name,
        resetLink: `https://sandbox.com/reset-password?token=${user.resetToken}`,
        expiryTime: '1 hour',
      },
    });
  },
};
```

### Queue System (Recommended)

For high-volume emails, use a queue system:

```typescript
// Using BullMQ
import { Queue } from 'bullmq';

const emailQueue = new Queue('emails', {
  connection: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
});

// Add to queue
await emailQueue.add('send-welcome', {
  userId: user.id,
  email: user.email,
  name: user.name,
});

// Worker processes queue
const worker = new Worker('emails', async (job) => {
  if (job.name === 'send-welcome') {
    await emailService.sendWelcomeEmail(job.data);
  }
});
```

## Email Templates

### Creating Templates

Use **React Email** for type-safe templates:

```bash
npm install @react-email/components
```

```tsx
// emails/welcome.tsx
import { Button, Html, Text } from '@react-email/components';

export default function WelcomeEmail({ name, verificationLink }: Props) {
  return (
    <Html>
      <Text>Hi {name},</Text>
      <Text>Welcome to Sandbox!</Text>
      <Button href={verificationLink}>Verify Email</Button>
    </Html>
  );
}
```

Or use **MJML** for responsive templates:

```xml
<mjml>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-text>Hi {{name}},</mj-text>
        <mj-button href="{{verificationLink}}">
          Verify Email
        </mj-button>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
```

## User Preferences

Allow users to control email frequency:

```typescript
interface EmailPreferences {
  jobAlerts: boolean;
  jobAlertsFrequency: 'realtime' | 'daily' | 'weekly';
  applicationUpdates: boolean;
  companyUpdates: boolean;
  newsletter: boolean;
  marketingEmails: boolean;
}

// Store in user profile
user.emailPreferences = {
  jobAlerts: true,
  jobAlertsFrequency: 'daily',
  applicationUpdates: true,
  companyUpdates: false,
  newsletter: true,
  marketingEmails: false,
};
```

## Unsubscribe System

**Required for compliance (CAN-SPAM, GDPR):**

1. Include unsubscribe link in every email
2. Honor unsubscribe requests immediately
3. Keep unsubscribe list
4. Allow selective unsubscribe (by type)

```typescript
// Unsubscribe endpoint
app.post('/api/email/unsubscribe', async (req, res) => {
  const { userId, token, type } = req.body;

  // Verify token
  if (!verifyUnsubscribeToken(token)) {
    return res.status(400).json({ error: 'Invalid token' });
  }

  // Update preferences
  if (type === 'all') {
    await db.users.update({
      where: { id: userId },
      data: {
        emailPreferences: {
          jobAlerts: false,
          newsletter: false,
          marketingEmails: false,
        },
      },
    });
  } else {
    // Unsubscribe from specific type
    await db.users.update({
      where: { id: userId },
      data: {
        emailPreferences: {
          [type]: false,
        },
      },
    });
  }

  res.json({ success: true });
});
```

## Testing

### Development Testing

Use **Mailtrap** or **Ethereal Email** for testing:

```typescript
// Development config
const devTransport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});
```

### Email Preview

Test all templates before sending:

```bash
# Using React Email
npm run email:dev

# Visit http://localhost:3000 to preview templates
```

## Monitoring

Track email metrics:

- **Delivery rate** (>95% is good)
- **Open rate** (15-25% for transactional)
- **Click-through rate** (2-5%)
- **Bounce rate** (<2%)
- **Unsubscribe rate** (<0.5%)

## Compliance Checklist

- [ ] Unsubscribe link in every email
- [ ] Company physical address in footer
- [ ] Honor unsubscribe within 10 days
- [ ] Clear "From" name
- [ ] Accurate subject lines
- [ ] Privacy policy link
- [ ] GDPR consent for EU users

## Cost Estimation

### SendGrid Pricing
- Free: 100/day
- Essentials: $15/month (40k emails)
- Pro: $60/month (100k emails)

### Monthly Email Volume Estimate
- Welcome: 1,000 (new users)
- Verification: 1,500
- Application confirmations: 5,000
- Job alerts: 20,000 (daily digest)
- Status updates: 2,000
- Newsletter: 10,000
- **Total:** ~40,000/month

**Recommended:** Start with SendGrid Essentials ($15/month)

## Next Steps

1. Sign up for SendGrid
2. Create email templates
3. Implement backend service
4. Set up queue system (optional)
5. Test with Mailtrap
6. Deploy and monitor

---

**Note:** Email deliverability is critical. Warm up your domain gradually, maintain good sender reputation, and monitor bounce rates closely.
