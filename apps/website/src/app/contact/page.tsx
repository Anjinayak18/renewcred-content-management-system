"use client";

import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    toast.success("Message sent successfully!");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  return (
    <section className="section">
      <div className="container-custom">
        <div className="mb-14 text-center">
          <h1 className="section-title">
            Contact Us
          </h1>

          <p className="section-subtitle">
            We'd love to hear from you. Send us a
            message and we'll get back to you as
            soon as possible.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="card">
            <h2 className="mb-6 text-2xl font-bold">
              Send a Message
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <input
                className="input"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
              />

              <input
                className="input"
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
              />

              <input
                className="input"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
              />

              <textarea
                className="input min-h-40 resize-none"
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
              />

              <button
                type="submit"
                className="btn-primary w-full"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="card flex items-start gap-4">
              <div className="rounded-xl bg-blue-100 p-3 text-primary dark:bg-blue-900">
                <Mail size={24} />
              </div>

              <div>
                <h3 className="font-semibold">
                  Email
                </h3>

                <p className="mt-2 text-muted">
                  support@cmsassignment.com
                </p>
              </div>
            </div>

            <div className="card flex items-start gap-4">
              <div className="rounded-xl bg-blue-100 p-3 text-primary dark:bg-blue-900">
                <Phone size={24} />
              </div>

              <div>
                <h3 className="font-semibold">
                  Phone
                </h3>

                <p className="mt-2 text-muted">
                  +91 98765 43210
                </p>
              </div>
            </div>

            <div className="card flex items-start gap-4">
              <div className="rounded-xl bg-blue-100 p-3 text-primary dark:bg-blue-900">
                <MapPin size={24} />
              </div>

              <div>
                <h3 className="font-semibold">
                  Address
                </h3>

                <p className="mt-2 text-muted">
                  Hyderabad, Telangana,
                  India
                </p>
              </div>
            </div>

            <div className="card">
              <h3 className="text-xl font-semibold">
                Business Hours
              </h3>

              <div className="mt-4 space-y-2 text-muted">
                <p>
                  Monday - Friday:
                  9:00 AM - 6:00 PM
                </p>

                <p>
                  Saturday:
                  10:00 AM - 2:00 PM
                </p>

                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}