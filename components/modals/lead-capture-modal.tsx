"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/shared/icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LeadCaptureModal({ isOpen, onClose }: LeadCaptureModalProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    companyWebsite: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          company: formData.company,
          companyWebsite: formData.companyWebsite,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setIsSuccess(true);
        toast.success("Successfully joined the waitlist!", {
          description: "We'll notify you as soon as Rolto launches.",
        });
        
        // Reset form
        setFormData({
          fullName: "",
          email: "",
          company: "",
          companyWebsite: "",
        });
        
        // Close modal after a short delay
        setTimeout(() => {
          onClose();
          setIsSuccess(false);
        }, 2000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit waitlist signup");
      }
    } catch (error) {
      console.error("Error submitting waitlist signup:", error);
      toast.error("Failed to join waitlist", {
        description: error instanceof Error ? error.message : "Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
      setIsSuccess(false);
      setFormData({
        fullName: "",
        email: "",
        company: "",
        companyWebsite: "",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {isSuccess ? (
          <div className="text-center py-8">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-50 dark:bg-green-950">
              <Icons.check className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <DialogTitle className="text-2xl font-bold text-green-600 dark:text-green-400">
              Welcome to the waitlist!
            </DialogTitle>
            <DialogDescription className="text-lg text-muted-foreground mt-4">
              Thank you for joining! We'll notify you as soon as Rolto launches.
            </DialogDescription>
          </div>
        ) : (
          <>
            <DialogHeader className="text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950">
                <Icons.bot className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <DialogTitle className="text-2xl font-bold">
                Join the waitlist
              </DialogTitle>
              <DialogDescription className="text-lg text-muted-foreground">
                Be among the first to experience AI-powered customer support when we launch.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName" className="text-sm font-medium">
                    Full Name *
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    required
                    disabled={isLoading}
                    className="mt-2 h-12 rounded-xl border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    disabled={isLoading}
                    className="mt-2 h-12 rounded-xl border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <Label htmlFor="company" className="text-sm font-medium">
                    Company Name *
                  </Label>
                  <Input
                    id="company"
                    type="text"
                    placeholder="Acme Corp"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    required
                    disabled={isLoading}
                    className="mt-2 h-12 rounded-xl border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <Label htmlFor="companyWebsite" className="text-sm font-medium">
                    Company Website <span className="text-muted-foreground">(optional)</span>
                  </Label>
                  <Input
                    id="companyWebsite"
                    type="text"
                    placeholder="apple.com or https://apple.com"
                    value={formData.companyWebsite}
                    onChange={(e) => handleInputChange("companyWebsite", e.target.value)}
                    disabled={isLoading}
                    className="mt-2 h-12 rounded-xl border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg transition-all duration-200"
              >
                {isLoading ? (
                  <>
                    <Icons.spinner className="mr-2 h-5 w-5 animate-spin" />
                    Joining waitlist...
                  </>
                ) : (
                  <>
                    Join Waitlist
                    <Icons.arrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                We'll notify you as soon as Rolto launches. No spam, just updates about our launch.
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
} 