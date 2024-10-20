"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { createLead } from "@/lib/actions";
import CreationSubmit from "@/components/CreationSubmit/CreationSubmit";
import { useToast } from "@/components/ui/use-toast";
import { categoryItems } from "@/lib/categoryItems";
import { MdOutlineDescription } from "react-icons/md";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { z } from "zod";
import { useFormStatus } from "react-dom";

const LeadZodSchema = z.object({
  category: z.string().trim(),
  city: z.string().trim(),
  neighborhood: z.string().trim().optional(),
  description: z.string().trim().optional(),
  fullName: z
    .string()
    .trim()
    .min(3, "Full name must be at least 3 characters long")
    .regex(/^[a-zA-Z\s]+$/, "Full name should only contain alphabets and spaces")
    .refine((name) => name.split(" ").length >= 2, {
      message: "Full name must include at least a first and last name",
    }),
  phoneNumber: z
    .string()
    .transform((val) => val.replace(/\s+/g, "").trim()) // Remove spaces and trim
    .refine((val) => /^\d+$/.test(val), { message: "Phone number must contain only digits" }) // Ensure it's all digits
    .refine((val) => val.length === 10, { message: "Phone number must be exactly 10 digits long" }), // Ensure exactly 10 digits
});

export default function ContactForm({ email }: { email: string | undefined }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { pending } = useFormStatus();

  const [selectedCategory, setSelectedCategory] = useState<string>("appartment");
  const [city, setCity] = useState("Deroua");

  const { toast } = useToast();

  async function formSubmitter(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    setIsSubmitting(true);

    try {
      // FORM VALIDATION
      const newLeadData = {
        category: formData.get("category"),
        city: formData.get("city"),
        neighborhood: formData.get("neighborhood"),
        description: formData.get("description"),
        fullName: formData.get("fullName"),
        phoneNumber: formData.get("phoneNumber"),
      };

      const result = LeadZodSchema.safeParse(newLeadData);

      if (!result.success) {
        return toast({
          title: result.error.errors[0].message,
          variant: "destructive",
        });
      }

      await createLead(formData, email as string);
    } catch (error) {
      toast({
        title: "Something went wrong!",
        description: "try again in a few minutes...",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <form onSubmit={formSubmitter} className="px-5 lg:px-10 mt-5">
        {/* Form Fields */}
        <div className="mt-10 sm:w-[80%] md:w-[60%]  mx-auto space-y-6 mb-36">
          {/* Contact Details */}
          <div className="flex flex-col lg:flex-row sm:gap-x-4 gap-y-4">
            {/* Full Name */}
            <div className="space-y-2 w-full">
              <label htmlFor="fullName" className="block text-xl text-[#5F5F5F] font-semibold ">
                <span className="text-[#FF5A5F] font-bold">*</span> Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Hassan Mansouri"
                className="w-full border font-medium p-3 text-base placeholder:font-light outline-[#FF5A5F] 
                rounded-lg border-[#DADBDD] "
              />
            </div>

            {/* Email */}
            <input type="text" hidden value={email} name="email" />

            {/* Phone Number */}
            <div className="space-y-2 w-full">
              <label htmlFor="phoneNumber" className="block text-xl text-[#5F5F5F] font-semibold ">
                <span className="text-[#FF5A5F] font-bold">*</span> Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="0662584634"
                className="w-full border font-medium p-3 text-base placeholder:font-light outline-[#FF5A5F] 
                rounded-lg border-[#DADBDD] "
              />
            </div>
          </div>

          {/* CATEGORY */}
          <div className="space-y-2">
            <input type="text" hidden value={selectedCategory} name="category" />
            <label htmlFor="category" className="block text-xl text-[#5F5F5F] font-semibold">
              <span className="text-[#FF5A5F] font-bold">*</span> Category
            </label>
            <div className="grid sm:grid-cols-2 sm:gap-x-4 lg:grid-cols-3 gap-y-4">
              {categoryItems.map(({ name, id }) => {
                return (
                  <div
                    key={id}
                    onClick={() => setSelectedCategory(name)}
                    className={`border font-medium px-8 py-3 flex items-center justify-center rounded-lg 
              ${selectedCategory === name && "bg-[#FF5A5F] font-semibold text-white"} cursor-pointer`}
                  >
                    {name}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="space-y-8">
            {/* CITY & NEIGHBORHOOD */}
            <div className="flex flex-col lg:flex-row sm:gap-x-4 gap-y-4">
              <div className="space-y-2 w-full">
                <label htmlFor="city" className="block text-xl text-[#5F5F5F] font-semibold ">
                  <span className="text-[#FF5A5F] font-bold">*</span> City
                </label>
                <Select onValueChange={(value) => setCity(value)}>
                  <input type="select" hidden value={city} id="city" name="city" />
                  <SelectTrigger
                    value="Deroua"
                    className="focus-visible:ring-transparent py-6 focus:ring-[#FF5A5F] "
                  >
                    <SelectValue placeholder="Deroua" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="deroua" className="cursor-pointer">
                      Deroua
                    </SelectItem>
                    <SelectItem value="berrechid" className="cursor-pointer">
                      Berrechid
                    </SelectItem>
                    <SelectItem value="nouaceur" className="cursor-pointer">
                      Nouaceur
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 w-full">
                <label htmlFor="city" className="block text-xl text-[#5F5F5F] font-semibold ">
                  Neighborhood
                </label>
                <input
                  type="text"
                  id="neighborhood"
                  name="neighborhood"
                  placeholder="Maarif"
                  className="w-full border font-medium p-3 text-base placeholder:font-light outline-[#FF5A5F] 
                  rounded-lg border-[#DADBDD] "
                />
              </div>
            </div>
            {/* DESCRIPTION */}
            <div className="space-y-2">
              <label
                htmlFor="description"
                className="text-xl text-[#5F5F5F] font-semibold flex items-center gap-x-2"
              >
                <MdOutlineDescription size={24} color="#000" />
                Description
              </label>
              <textarea
                id="description"
                placeholder="House in a great location, for a negotiable price"
                name="description"
                className="w-full border px-3 font-medium text-base placeholder:font-light outline-[#FF5A5F] 
              rounded-lg py-3 border-[#DADBDD] h-36 resize-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="bg-[#e6e6e6] font-semibold hover:bg-[#cfcfcf] transition-colors px-8 py-2 rounded-lg"
            >
              Back
            </Link>
            <CreationSubmit pending={isSubmitting} />
          </div>
        </div>
      </form>
    </>
  );
}
