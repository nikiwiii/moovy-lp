"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Loader2, BicepsFlexed } from "lucide-react";

interface FormState {
  name: string;
  email: string;
  topic: string;
  message: string;
}

export default function About() {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    topic: "general",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [validationErrors, setValidationErrors] = useState<Partial<FormState>>({});

  const validateForm = (): boolean => {
    const errors: Partial<FormState> = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required.";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required.";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters long.";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus("loading");

    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        topic: "general",
        message: "",
      });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear validation error when user types
    if (validationErrors[name as keyof FormState]) {
      setValidationErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const values = [
    {
      title: "Frictionless First",
      desc: "No apps to download, no accounts to register, no passwords to remember. If a tool takes more than 10 seconds to join, groups won't use it. We build for zero friction.",
    },
    {
      title: "Consensus-Driven Models",
      desc: "Traditional algorithms optimize for the individual. Moovy solves the 'group negotiation problem' by aggregating moods and identifying overlaps that make everyone happy.",
    },
    {
      title: "Respect for Preferences",
      desc: "If someone vetos a genre or has already seen a film, their inputs are absolutely respected. A group agreement shouldn't mean forcing anyone to watch what they hate.",
    },
  ];

  return (
    <div className="py-24 px-6 md:px-12 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="text-center mt-12 mb-20">
        <span className="text-xs font-semibold text-moovy-amber uppercase tracking-widest block mb-3">
          Our Story
        </span>
        <h1 className="font-display font-bold text-4xl md:text-6xl text-moovy-ink tracking-tight mb-6">
          About Moovy
        </h1>
        <p className="text-moovy-ink-dim max-w-xl mx-auto text-base md:text-lg leading-relaxed">
          Founded to solve a simple problem: the endless debate of what to watch. We build tools that make group decisions effortless.
        </p>
      </div>

      {/* Grid: Mission and Values */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-28">
        {/* Left: Narrative */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-moovy-amber uppercase tracking-widest">
            <BicepsFlexed size={12} />
            <span>The Mission</span>
          </div>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-moovy-ink">
            Ending the &ldquo;I don&apos;t care, you choose&rdquo; loops.
          </h2>
          <p className="text-sm md:text-base text-moovy-ink-dim leading-relaxed">
            Every week, millions of groups sit on couches, open streaming apps, and spend 40 minutes scrolling through catalogs only to give up. The issue isn&apos;t a lack of options — it&apos;s the psychological tax of group decision making.
          </p>
          <p className="text-sm md:text-base text-moovy-ink-dim leading-relaxed">
            Moovy was created as an experiment in group sync. By letting everyone vote on vibes, length, and vetoes simultaneously, we aggregate inputs and return options that represent the group&apos;s combined mood.
          </p>
        </div>

        {/* Right: Values */}
        <div className="lg:col-span-6 space-y-6">
          {values.map((val, idx) => (
            <div
              key={idx}
              className="bg-moovy-card/60 border border-moovy-line rounded-xl p-5 hover:border-moovy-amber/25 transition-colors"
            >
              <h3 className="font-display font-semibold text-base text-moovy-ink mb-2">
                {val.title}
              </h3>
              <p className="text-xs text-moovy-ink-dim leading-relaxed">
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-xl mx-auto border-t border-moovy-line pt-20">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-2xl md:text-4xl text-moovy-ink">
            Get in touch
          </h2>
          <p className="text-xs text-moovy-ink-dim mt-2 max-w-sm mx-auto">
            Have feedback on our private testing build? Want to report a bug or suggest a vibe? We&apos;d love to hear from you.
          </p>
        </div>

        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-moovy-card/70 border border-moovy-green/30 p-8 rounded-2xl flex flex-col items-center text-center shadow-lg"
          >
            <CheckCircle className="w-12 h-12 text-moovy-green mb-4" />
            <h3 className="font-display font-semibold text-lg text-moovy-ink mb-2">Message Sent!</h3>
            <p className="text-xs text-moovy-ink-dim leading-relaxed max-w-xs">
              Thank you for reaching out. We appreciate your feedback and will get back to you shortly.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-6 text-xs text-moovy-amber hover:text-moovy-amber-bright underline cursor-pointer"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 bg-moovy-card/70 border border-moovy-line p-6 rounded-2xl shadow-xl">
            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-[10px] font-bold text-moovy-ink-dim uppercase tracking-wider pl-1">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={status === "loading"}
                className={`bg-moovy-bg/50 border rounded-lg px-4 py-3 text-sm focus:outline-none transition-colors text-moovy-ink ${validationErrors.name ? "border-rose-500/50 focus:border-rose-500" : "border-moovy-line focus:border-moovy-amber"
                  }`}
                placeholder="Marek Kowalski"
              />
              {validationErrors.name && (
                <div className="text-[10px] text-rose-400 flex items-center gap-1 mt-0.5 pl-1">
                  <AlertCircle size={10} />
                  <span>{validationErrors.name}</span>
                </div>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-[10px] font-bold text-moovy-ink-dim uppercase tracking-wider pl-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={status === "loading"}
                className={`bg-moovy-bg/50 border rounded-lg px-4 py-3 text-sm focus:outline-none transition-colors text-moovy-ink ${validationErrors.email ? "border-rose-500/50 focus:border-rose-500" : "border-moovy-line focus:border-moovy-amber"
                  }`}
                placeholder="marek@example.com"
              />
              {validationErrors.email && (
                <div className="text-[10px] text-rose-400 flex items-center gap-1 mt-0.5 pl-1">
                  <AlertCircle size={10} />
                  <span>{validationErrors.email}</span>
                </div>
              )}
            </div>

            {/* Topic dropdown */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="topic" className="text-[10px] font-bold text-moovy-ink-dim uppercase tracking-wider pl-1">
                Topic
              </label>
              <select
                id="topic"
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                disabled={status === "loading"}
                className="bg-moovy-bg/50 border border-moovy-line rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-moovy-amber transition-colors text-moovy-ink"
              >
                <option value="general" className="bg-moovy-card">General Inquiry</option>
                <option value="feedback" className="bg-moovy-card">App Feedback</option>
                <option value="bug" className="bg-moovy-card">Report a Bug</option>
                <option value="partner" className="bg-moovy-card">Partnerships</option>
              </select>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-[10px] font-bold text-moovy-ink-dim uppercase tracking-wider pl-1">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                disabled={status === "loading"}
                rows={5}
                className={`bg-moovy-bg/50 border rounded-lg px-4 py-3 text-sm focus:outline-none transition-colors text-moovy-ink resize-none ${validationErrors.message ? "border-rose-500/50 focus:border-rose-500" : "border-moovy-line focus:border-moovy-amber"
                  }`}
                placeholder="I love the idea! Can you add a filter for..."
              />
              {validationErrors.message && (
                <div className="text-[10px] text-rose-400 flex items-center gap-1 mt-0.5 pl-1">
                  <AlertCircle size={10} />
                  <span>{validationErrors.message}</span>
                </div>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-moovy-amber hover:bg-moovy-amber-bright text-moovy-bg font-semibold text-sm px-6 py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 mt-2 disabled:opacity-75"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sending Message...</span>
                </>
              ) : (
                <>
                  <Send size={14} />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
