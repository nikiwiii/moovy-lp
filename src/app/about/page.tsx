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

    setTimeout(() => {
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        topic: "general",
        message: "",
      });
    }, 1200);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (validationErrors[name as keyof FormState]) {
      setValidationErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="py-24 px-6 md:px-12 max-w-5xl mx-auto text-white">
      {/* Page Header */}
      <div className="text-center mt-12 mb-20">
        <span className="text-xs font-bold text-white/50 uppercase tracking-[3px] block mb-3">
          Our Story
        </span>
        <h1 className="font-display font-bold text-4xl md:text-6xl text-white tracking-tight mb-6">
          About moovy<span className="text-[#b4b4b4]">®</span>
        </h1>
        <p className="text-white/70 max-w-xl mx-auto text-base md:text-lg leading-relaxed">
          Founded to solve a simple problem: the endless debate of what to watch. We build tools that make group decisions effortless.
        </p>
      </div>
      {/* Left: Narrative */}
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <h2 className="font-display font-bold text-2xl md:text-3xl text-white">
          Ending the &ldquo;I don&apos;t care, you choose&rdquo; loops.
        </h2>
        <p className="text-sm md:text-base text-white/70 leading-relaxed">
          Every week, millions of groups sit on couches, open streaming apps, and spend 40 minutes scrolling through catalogs only to give up. The issue isn&apos;t a lack of options — it&apos;s the psychological tax of group decision making.
        </p>
        <p className="text-sm md:text-base text-white/70 leading-relaxed">
          Moovy was created as an experiment in group sync. By letting everyone vote on vibes, length, and vetoes simultaneously, we aggregate inputs and return options that represent the group&apos;s combined mood. <span className="font-bold text-white/90">Moviefinding was never this effective.</span>
        </p>
      </div>

      {/* Contact Section */}
      <div className="max-w-xl mx-auto pt-20">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-2xl md:text-4xl text-white">
            Get in touch
          </h2>
          <p className="text-xs text-white/50 mt-2 max-w-sm mx-auto">
            Have feedback on our alpha testing build? Want to report a bug or suggest a vibe? We&apos;d love to hear from you.
          </p>
        </div>

        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#0d0b1a] border border-[#60D394]/30 p-8 rounded-2xl flex flex-col items-center text-center shadow-lg"
          >
            <CheckCircle className="w-12 h-12 text-[#60D394] mb-4" />
            <h3 className="font-display font-semibold text-lg text-white mb-2">Message Sent!</h3>
            <p className="text-xs text-white/60 leading-relaxed max-w-xs">
              Thank you for reaching out. We appreciate your feedback and will get back to you shortly.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-6 text-xs text-white/80 hover:text-white underline cursor-pointer"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-[10px] font-bold text-white/50 uppercase tracking-wider pl-1">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={status === "loading"}
                className={`bg-[#050210]/60 border rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors text-white ${validationErrors.name ? "border-rose-500/50 focus:border-rose-500" : "border-white/10 focus:border-white/40"
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

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-[10px] font-bold text-white/50 uppercase tracking-wider pl-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={status === "loading"}
                className={`bg-[#050210]/60 border rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors text-white ${validationErrors.email ? "border-rose-500/50 focus:border-rose-500" : "border-white/10 focus:border-white/40"
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

            <div className="flex flex-col gap-1.5">
              <label htmlFor="topic" className="text-[10px] font-bold text-white/50 uppercase tracking-wider pl-1">
                Topic
              </label>
              <select
                id="topic"
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                disabled={status === "loading"}
                className="bg-[#050210]/60 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/40 transition-colors text-white"
              >
                <option value="general" className="bg-[#0d0b1a]">General Inquiry</option>
                <option value="feedback" className="bg-[#0d0b1a]">App Feedback</option>
                <option value="bug" className="bg-[#0d0b1a]">Report a Bug</option>
                <option value="partner" className="bg-[#0d0b1a]">Partnerships</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-[10px] font-bold text-white/50 uppercase tracking-wider pl-1">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                disabled={status === "loading"}
                rows={5}
                className={`bg-[#050210]/60 border rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors text-white resize-none ${validationErrors.message ? "border-rose-500/50 focus:border-rose-500" : "border-white/10 focus:border-white/40"
                  }`}
                placeholder="I love the concept! Can you add..."
              />
              {validationErrors.message && (
                <div className="text-[10px] text-rose-400 flex items-center gap-1 mt-0.5 pl-1">
                  <AlertCircle size={10} />
                  <span>{validationErrors.message}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-white text-black font-bold text-xs uppercase tracking-wider px-6 py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 mt-2 cursor-pointer hover:bg-white/90 disabled:opacity-75"
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
