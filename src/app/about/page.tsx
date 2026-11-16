"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

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
    if (!formData.name.trim()) errors.name = "Name is required.";
    if (!formData.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Enter a valid email address.";
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters.";
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
      setFormData({ name: "", email: "", topic: "general", message: "" });
    }, 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationErrors[name as keyof FormState]) {
      setValidationErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 space-y-6 text-white">
      <section className="justify-self-center rounded-[32px] bg-[#0d0b1a]/85 border border-white/10 p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6 space-y-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider text-white/70 bg-white/5 border border-white/10">
            Our Story
          </span>
          <h1 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
            About moovy<span className="text-[#b4b4b4]">®</span>
          </h1>
          <p className="text-sm sm:text-base text-[#d0d0dd] leading-relaxed max-w-md">
            Built to end the 40-minute streaming scroll. Everyone votes on vibes, runtime, and vetoes in parallel — Moovy finds the shared sweet spot.
          </p>
        </div>

        <div className="lg:col-span-6">
          <div className="relative h-56 sm:h-64 rounded-[24px] overflow-hidden border border-white/10 bg-[#050210]">
            <Image
              src="/moovy/yea.jpg"
              alt="moovy logo"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* <section className="rounded-[32px] bg-[#090717]/90 border border-white/10 p-6 sm:p-10">
        <div className="max-w-xl mx-auto">
          <div className="mb-8">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider text-white/70 bg-white/5 border border-white/10 mb-3">
              Contact
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
              Get in touch
            </h2>
          </div>

          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#131126] border border-[#60D394]/30 p-8 rounded-2xl flex flex-col items-center text-center"
            >
              <CheckCircle2 className="w-10 h-10 text-[#60D394] mb-3" />
              <h3 className="font-display font-semibold text-lg text-white mb-1">
                Message Sent
              </h3>
              <p className="text-xs text-[#a0a0b0]">We&apos;ll get back to you shortly.</p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-5 text-xs text-white/80 hover:text-white underline cursor-pointer"
              >
                Send another
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-[10px] font-bold text-white/50 uppercase tracking-wider">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={status === "loading"}
                    className={`bg-[#131126] border rounded-xl px-4 py-3 text-sm focus:outline-none text-white ${
                      validationErrors.name ? "border-rose-500/50" : "border-white/10 focus:border-white/40"
                    }`}
                    placeholder="Alex"
                  />
                  {validationErrors.name && (
                    <span className="text-[10px] text-rose-400 flex items-center gap-1">
                      <AlertCircle size={10} /> {validationErrors.name}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-[10px] font-bold text-white/50 uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={status === "loading"}
                    className={`bg-[#131126] border rounded-xl px-4 py-3 text-sm focus:outline-none text-white ${
                      validationErrors.email ? "border-rose-500/50" : "border-white/10 focus:border-white/40"
                    }`}
                    placeholder="alex@example.com"
                  />
                  {validationErrors.email && (
                    <span className="text-[10px] text-rose-400 flex items-center gap-1">
                      <AlertCircle size={10} /> {validationErrors.email}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="topic" className="text-[10px] font-bold text-white/50 uppercase tracking-wider">
                  Topic
                </label>
                <select
                  id="topic"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  disabled={status === "loading"}
                  className="bg-[#131126] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/40 text-white"
                >
                  <option value="general">General Inquiry</option>
                  <option value="feedback">App Feedback</option>
                  <option value="bug">Report a Bug</option>
                  <option value="partner">Partnerships</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-[10px] font-bold text-white/50 uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={status === "loading"}
                  rows={4}
                  className={`bg-[#131126] border rounded-xl px-4 py-3 text-sm focus:outline-none text-white resize-none ${
                    validationErrors.message ? "border-rose-500/50" : "border-white/10 focus:border-white/40"
                  }`}
                  placeholder="Tell us what you think..."
                />
                {validationErrors.message && (
                  <span className="text-[10px] text-rose-400 flex items-center gap-1">
                    <AlertCircle size={10} /> {validationErrors.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-[#60D394] hover:bg-[#60D394]/90 text-[#050210] font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full transition-colors flex items-center justify-center gap-2 mt-1 cursor-pointer disabled:opacity-75"
              >
                {status === "loading" ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
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
      </section> */}
    </div>
  );
}
