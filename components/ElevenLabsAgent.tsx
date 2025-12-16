"use client";

import { useEffect } from "react";

/**
 * ElevenLabs Agent Component
 * 
 * Embeds the ElevenLabs conversational AI agent widget into the website.
 * 
 * Setup Options:
 * 
 * Option 1: Using Agent ID (Recommended)
 * 1. Create an agent in your ElevenLabs dashboard (https://elevenlabs.io)
 * 2. Get your agent ID from the dashboard
 * 3. Add NEXT_PUBLIC_ELEVENLABS_AGENT_ID to your .env.local file
 * 
 * Option 2: Using Embed Code
 * 1. Get the embed code from ElevenLabs dashboard → Widget tab
 * 2. Add NEXT_PUBLIC_ELEVENLABS_EMBED_CODE to your .env.local file
 * 
 * Optional customization:
 * - NEXT_PUBLIC_ELEVENLABS_WIDGET_POSITION: "bottom-right" | "bottom-left" | "top-right" | "top-left" (default: "bottom-right")
 * - NEXT_PUBLIC_ELEVENLABS_WIDGET_COLOR: hex color code (e.g., "#6366f1")
 */
export default function ElevenLabsAgent() {
  useEffect(() => {
    const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID;
    const embedCode = process.env.NEXT_PUBLIC_ELEVENLABS_EMBED_CODE;
    
    // Only load if agent ID or embed code is configured
    if (!agentId && !embedCode) {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          "ElevenLabs Agent not configured. " +
          "Add NEXT_PUBLIC_ELEVENLABS_AGENT_ID or NEXT_PUBLIC_ELEVENLABS_EMBED_CODE to your environment variables."
        );
      }
      return undefined;
    }

    // Method 1: Use embed code if provided (most reliable)
    if (embedCode) {
      // Check if already loaded
      if (document.querySelector('script[data-elevenlabs-embed]') || document.querySelector('elevenlabs-convai')) {
        return undefined;
      }

      // Create a container for the embed code
      const container = document.createElement("div");
      container.innerHTML = embedCode;
      container.style.display = "none";
      document.body.appendChild(container);

      // Extract and move the custom element to body
      const convaiElement = container.querySelector('elevenlabs-convai');
      if (convaiElement) {
        document.body.appendChild(convaiElement);
      }

      // Extract and execute any scripts from the embed code
      const scripts = container.querySelectorAll("script");
      scripts.forEach((oldScript) => {
        const newScript = document.createElement("script");
        Array.from(oldScript.attributes).forEach((attr) => {
          newScript.setAttribute(attr.name, attr.value);
        });
        if (oldScript.src) {
          newScript.src = oldScript.src;
        } else {
          newScript.textContent = oldScript.textContent;
        }
        newScript.setAttribute("data-elevenlabs-embed", "true");
        if (!oldScript.hasAttribute("async")) {
          newScript.async = true;
        }
        document.body.appendChild(newScript);
      });

      // Remove the temporary container
      container.remove();

      // Cleanup
      return () => {
        document.querySelectorAll('script[data-elevenlabs-embed]').forEach((s) => s.remove());
        document.querySelectorAll('elevenlabs-convai').forEach((el) => el.remove());
      };
    }

    // Method 2: Use agent ID (creates the embed code format)
    if (agentId) {
      // Check if already loaded
      if (document.querySelector(`elevenlabs-convai[agent-id="${agentId}"]`) || document.querySelector('script[data-elevenlabs-agent]')) {
        return undefined;
      }

      // Create the custom element
      const convaiElement = document.createElement("elevenlabs-convai");
      convaiElement.setAttribute("agent-id", agentId);
      document.body.appendChild(convaiElement);

      // Load the widget script
      const script = document.createElement("script");
      script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
      script.async = true;
      script.type = "text/javascript";
      script.setAttribute("data-elevenlabs-agent", agentId);
      document.body.appendChild(script);

      // Cleanup function
      return () => {
        const existingScript = document.querySelector(`script[data-elevenlabs-agent="${agentId}"]`);
        if (existingScript) {
          existingScript.remove();
        }
        const existingElement = document.querySelector(`elevenlabs-convai[agent-id="${agentId}"]`);
        if (existingElement) {
          existingElement.remove();
        }
      };
    }

    return undefined;
  }, []);

  return null;
}

