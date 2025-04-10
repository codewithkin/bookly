"use client";
import { useState } from "react";
import { Button } from "../../button";
import { Link } from "lucide-react";
import { toast } from "sonner";

function ShareLink({ link }: { link: any }) {
  // Track whether or not the link was copied
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    if (!copied) {
      // Copy to clipboard
      navigator.clipboard.writeText(link);

      // Show a success toast
      toast.success("Link copied to clipboard");

      setCopied(true);
    } else {
      // Remove from clipboard
      navigator.clipboard.writeText("");

      // Show a toast
      toast("Link removed from clipboard");

      setCopied(false);
    }
  };

  return (
    <Button
      onClick={handleCopy}
      variant={copied ? "secondary" : "default"}
      size="lg"
    >
      Share Link
      <Link />
    </Button>
  );
}

export default ShareLink;
