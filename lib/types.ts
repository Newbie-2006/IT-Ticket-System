export const categories = ["Network", "Hardware", "Software", "Account & Access"] as const;

export type Category = (typeof categories)[number];
export type Priority = "Low" | "Medium" | "High" | "Critical";
export type Status = "Open" | "Resolved" | "Escalated";

export type Ticket = {
  id: number;
  title: string;
  description: string;
  employee: string;
  device?: string;
  category: Category;
  priority: Priority;
  status: Status;
  issue: string;
  confidence: number;
  resolution: string[];
};

export type Analysis = Pick<Ticket, "category" | "priority" | "issue" | "confidence" | "resolution">;
