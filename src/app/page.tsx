import { Button } from "@/components/ui/button";
import { MailOpen } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div>
      <Button size="lg">Click Me</Button>
      <Input/>
      <Button>Click Me</Button>
      <Button>Click Me</Button>
      <Button variant="teritary">Click Me</Button>
      <Button variant="ghost">Click Me</Button>
      <Button variant="muted">Click Me</Button>
      <Button>Click Me</Button>
      <Button variant="destructive">Destructive</Button>
      <Button>
      <MailOpen /> Login with Email
    </Button>

    </div>
  );
}
