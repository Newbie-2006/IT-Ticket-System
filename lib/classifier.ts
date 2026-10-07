import type { Analysis, Category, Priority } from "./types";

const keywordMap: Record<Category, string[]> = {
  Network: ["wifi", "wi-fi", "internet", "vpn", "network", "connection", "router", "connectivity"],
  Hardware: ["laptop", "keyboard", "mouse", "monitor", "screen", "display", "printer"],
  Software: ["software", "application", "app", "crash", "install", "installation", "update", "browser", "chrome"],
  "Account & Access": ["password", "login", "account", "access", "permission", "credentials", "locked", "denied"],
};

const resolutions: Record<Category, string[]> = {
  Network: ["Check your internet connection.", "Restart the VPN or network client.", "Verify your credentials and network settings.", "Try connecting again.", "Contact IT support if the problem continues."],
  Hardware: ["Restart your device.", "Check all cables and connections.", "Install any pending device updates.", "Try the device again.", "Contact IT support if the issue continues."],
  Software: ["Restart the application.", "Check for available updates.", "Try the action again.", "Reinstall the application if needed.", "Contact IT support if the issue continues."],
  "Account & Access": ["Verify your account details.", "Reset your password if required.", "Sign out and sign back in.", "Try accessing the service again.", "Contact IT support if access is still unavailable."],
};

function getPriority(text: string): Priority {
  if (/(ransomware|security breach|data loss|entire system down)/.test(text)) return "Critical";
  if (/(login failure|unable to login|cannot login|vpn unavailable|\bvpn\b|access denied|critical application unavailable|locked)/.test(text)) return "High";
  if (/(crash|connectivity|connection|recurring error|disconnect|flicker)/.test(text)) return "Medium";
  return "Low";
}

function getIssue(category: Category, text: string) {
  if (category === "Network") return text.includes("vpn") ? "VPN Connectivity" : "Network Connectivity";
  if (category === "Hardware") return text.includes("keyboard") ? "Keyboard Issue" : text.includes("screen") || text.includes("display") ? "Display Issue" : "Hardware Issue";
  if (category === "Software") return text.includes("install") ? "Software Installation" : text.includes("chrome") || text.includes("browser") ? "Browser Issue" : "Application Issue";
  return text.includes("password") || text.includes("login") ? "Login Access" : "Account Access";
}

// Local MVP classifier; replace this function with an API call when an LLM is available.
export function classifyIssue(title: string, description: string): Analysis {
  const text = `${title} ${description}`.toLowerCase();
  const scores = (Object.entries(keywordMap) as [Category, string[]][]).map(([category, keywords]) => ({
    category,
    score: keywords.filter((keyword) => text.includes(keyword)).length,
  }));
  const best = scores.reduce((current, item) => (item.score > current.score ? item : current), scores[0]);
  const category = best.score > 0 ? best.category : "Software";
  const priority = getPriority(text);

  return {
    category,
    priority,
    issue: getIssue(category, text),
    confidence: category === "Network" && text.includes("vpn") ? 94 : Math.min(95, 88 + best.score * 3),
    resolution: resolutions[category],
  };
}
