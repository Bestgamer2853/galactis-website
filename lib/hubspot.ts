interface HubSpotSubmission {
  name: string;
  email: string;
  company: string;
  phone?: string;
  message: string;
  source?: string;
  timestamp?: string;
}

interface HubSpotResponse {
  ok: boolean;
  error?: string;
  contactId?: string;
}

export async function submitToHubSpot(
  formData: HubSpotSubmission
): Promise<HubSpotResponse> {
  try {
    // Get HubSpot configuration from environment variables
    const portalId = process.env.HUBSPOT_PORTAL_ID;
    const formId = process.env.HUBSPOT_FORM_ID;

    // If not configured, return success (for local dev)
    if (!portalId || !formId) {
      console.warn("HubSpot not configured. Missing HUBSPOT_PORTAL_ID or HUBSPOT_FORM_ID");
      // In local dev, just log and return success
      if (process.env.NODE_ENV === "development") {
        console.log("HubSpot submission (dev mode):", formData);
        return { ok: true };
      }
      // In production, this should fail gracefully or use a fallback
      return { ok: false, error: "HubSpot not configured" };
    }

    // HubSpot Forms API v3 endpoint
    const url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;

    // Format data for HubSpot
    const hubspotData = {
      fields: [
        {
          objectTypeId: "0-1", // Contact object
          name: "firstname",
          value: formData.name.split(" ")[0] || formData.name,
        },
        {
          objectTypeId: "0-1",
          name: "lastname",
          value: formData.name.split(" ").slice(1).join(" ") || "",
        },
        {
          objectTypeId: "0-1",
          name: "email",
          value: formData.email,
        },
        {
          objectTypeId: "0-1",
          name: "company",
          value: formData.company,
        },
        {
          objectTypeId: "0-1",
          name: "phone",
          value: formData.phone || "",
        },
        {
          objectTypeId: "0-1",
          name: "message",
          value: formData.message,
        },
        {
          objectTypeId: "0-1",
          name: "lead_source",
          value: formData.source || "website",
        },
      ],
      context: {
        pageUri: formData.source || "https://galactis.ai",
        pageName: "Contact Form",
        hutk: "", // HubSpot tracking cookie (if available)
      },
      legalConsentOptions: {
        consent: {
          consentToProcess: true,
          text: "I agree to receive communications from Galactis.ai",
          communications: [
            {
              value: true,
              subscriptionTypeId: 999, // Replace with your subscription ID
              text: "Email communications",
            },
          ],
        },
      },
    };

    // Submit to HubSpot
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(hubspotData),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("HubSpot API error:", response.status, errorData);
      return {
        ok: false,
        error: `HubSpot API error: ${response.status}`,
      };
    }

    const result = await response.json();
    return {
      ok: true,
      contactId: result.contactId || result.inlineMessage,
    };
  } catch (error) {
    console.error("HubSpot submission error:", error);
    return {
      ok: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

