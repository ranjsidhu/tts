"use client";

import { useState, useTransition } from "react";
import { updateUserProfile } from "./serveractions";
import toast from "react-hot-toast";

type ProfileFormProps = {
  user: {
    first_name: string | null;
    last_name: string | null;
    email: string | null;
    phone: string | null;
    first_line_address: string | null;
    town: string | null;
    city: string | null;
    postcode: string | null;
  } | null;
};

export default function ProfileForm({ user }: Readonly<ProfileFormProps>) {
  const [isPending, startTransition] = useTransition();
  const [formValues, setFormValues] = useState({
    first_name: user?.first_name ?? "",
    last_name: user?.last_name ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
    first_line_address: user?.first_line_address ?? "",
    town: user?.town ?? "",
    city: user?.city ?? "",
    postcode: user?.postcode ?? "",
  });
  const [errors, setErrors] = useState<{ email?: string; phone?: string }>({});

  const validateEmail = (value: string) => {
    if (!value) return "Email is required";
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(value) ? "" : "Enter a valid email address";
  };

  const validatePhone = (value: string) => {
    if (!value) return ""; // optional
    // UK mobile numbers: +44 7XXXXXXXXX or 07XXXXXXXXX
    const normalized = value.trim().replace(/[\s\-().]/g, "");
    const isPlus44Mobile = /^\+447\d{9}$/.test(normalized);
    const isZeroSevenMobile = /^07\d{9}$/.test(normalized);
    return isPlus44Mobile || isZeroSevenMobile
      ? ""
      : "Enter a valid UK mobile number (+44 7... or 07...)";
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    if (name === "email") {
      const err = validateEmail(value);
      setErrors((prev) => ({ ...prev, email: err || undefined }));
    }
    if (name === "phone") {
      const err = validatePhone(value);
      setErrors((prev) => ({ ...prev, phone: err || undefined }));
    }
  };

  const onReset = () => {
    setFormValues({
      first_name: user?.first_name ?? "",
      last_name: user?.last_name ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
      first_line_address: user?.first_line_address ?? "",
      town: user?.town ?? "",
      city: user?.city ?? "",
      postcode: user?.postcode ?? "",
    });
    setErrors({});
  };

  const onSubmit = (formData: FormData) => {
    const emailErr = validateEmail(formValues.email);
    const phoneErr = validatePhone(formValues.phone);
    if (emailErr || phoneErr) {
      setErrors({ email: emailErr || undefined, phone: phoneErr || undefined });
      toast.error("Please fix validation errors");
      return;
    }
    startTransition(async () => {
      try {
        await updateUserProfile(formData);
        toast.success("Profile updated");
      } catch (e: any) {
        toast.error("Failed to update profile");
        console.error(e?.message);
      }
    });
  };

  return (
    <form action={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm text-gray-500">First name</label>
        <input
          name="first_name"
          value={formValues.first_name}
          onChange={onChange}
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          placeholder="First name"
          disabled={isPending}
        />
      </div>
      <div>
        <label className="block text-sm text-gray-500">Last name</label>
        <input
          name="last_name"
          value={formValues.last_name}
          onChange={onChange}
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          placeholder="Last name"
          disabled={isPending}
        />
      </div>
      <div>
        <label className="block text-sm text-gray-500">Email</label>
        <input
          name="email"
          value={formValues.email}
          onChange={onChange}
          onBlur={() =>
            setErrors((prev) => ({
              ...prev,
              email: validateEmail(formValues.email) || undefined,
            }))
          }
          inputMode="email"
          className={`mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="you@example.com"
          disabled={isPending}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>
      <div>
        <label className="block text-sm text-gray-500">Phone</label>
        <input
          name="phone"
          value={formValues.phone}
          onChange={onChange}
          onBlur={() =>
            setErrors((prev) => ({
              ...prev,
              phone: validatePhone(formValues.phone) || undefined,
            }))
          }
          inputMode="tel"
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          placeholder="Phone"
          disabled={isPending}
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
        )}
      </div>
      <div className="md:col-span-2">
        <label className="block text-sm text-gray-500">Address line</label>
        <input
          name="first_line_address"
          value={formValues.first_line_address}
          onChange={onChange}
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          placeholder="Street and number"
          disabled={isPending}
        />
      </div>
      <div>
        <label className="block text-sm text-gray-500">Town</label>
        <input
          name="town"
          value={formValues.town}
          onChange={onChange}
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          placeholder="Town"
          disabled={isPending}
        />
      </div>
      <div>
        <label className="block text-sm text-gray-500">City</label>
        <input
          name="city"
          value={formValues.city}
          onChange={onChange}
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          placeholder="City"
          disabled={isPending}
        />
      </div>
      <div>
        <label className="block text-sm text-gray-500">Postcode</label>
        <input
          name="postcode"
          value={formValues.postcode}
          onChange={onChange}
          className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          placeholder="Postcode"
          disabled={isPending}
        />
      </div>

      <div className="md:col-span-2 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={onReset}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          disabled={isPending}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-300 transition-colors"
          disabled={isPending}
        >
          Save changes
        </button>
      </div>
    </form>
  );
}
