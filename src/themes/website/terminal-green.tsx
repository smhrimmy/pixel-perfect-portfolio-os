import type { ThemeRendererProps } from "../types";
import { GlobalInteractiveTerminal } from "@/components/ui/global-interactive-terminal";

export default function TerminalGreen({ data }: ThemeRendererProps) {
  // We ignore content here because GlobalInteractiveTerminal fetches it directly.
  // The terminal theme just renders the interactive terminal permanently open.
  return <GlobalInteractiveTerminal forceOpen={true} />;
}
