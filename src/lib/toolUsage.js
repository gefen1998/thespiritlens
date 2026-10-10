import { base44 } from "@/api/base44Client";

/** Records one anonymous "this tool was opened" entry. Never blocks the practice. */
export function logToolUse(toolId, toolName) {
  if (!toolId) return;
  base44.entities.ToolUsage.create({ tool_id: toolId, tool_name: toolName || "" }).catch(() => {});
}