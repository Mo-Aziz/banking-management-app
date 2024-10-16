"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// shadcn inputs
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomInput from "./CustomInput";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/actions/user.actions";

// // 1. Define your form.
// const formSchema = z.object({
//   email: z.string().email(),
// });

const AuthForm = ({ type }: { type: string }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const formSchema = authFormSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      //  sign up with Appwrite & create plaid token
      if (type === "sign-up") {
        const newUser = await signUp(data);
        setUser(newUser);
        console.log("new user ===>", newUser);
      }
      // Sign in logic
      // if (type === "sign-in") {
      //   const response = await signIn({
      //     email: data.email,
      //     password: data.password,
      //   });
      //   if (response) {
      //     router.push("/"); // Navigate to home page or dashboard
      //   }
      // }
    } catch (error) {
      // if (type === "sign-in") {
      //   const response = await signIn({
      //     email: data.email,
      //     password: data.password,
      //   });
      //   if (response) router.push("/");
      // }
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link
          href="/"
          className=" flex mb-12 cursor-pointer items-center gap-1"
        >
          <Image
            src="/icons/logo.svg"
            width={50}
            height={40}
            alt="banker buddy logo"
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Banking Buddy
          </h1>
        </Link>
        <div className="flex-col flex gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
            <p className="text-16 font-normal text-gray-600">
              {user
                ? "Link your account to get started"
                : "Please enter your details"}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">{/* PlaidLink */}</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div></div>
                  <div className="flex gap-4">
                    {" "}
                    <CustomInput
                      control={form.control}
                      name="firstName"
                      label="First Name"
                      placeholder="Enter your first name"
                    />{" "}
                    <CustomInput
                      control={form.control}
                      name="lastName"
                      label="Last Name"
                      placeholder="Enter your last name"
                    />
                  </div>
                  <CustomInput
                    control={form.control}
                    name="address1"
                    label="Address"
                    placeholder="Enter your Address"
                  />{" "}
                  <CustomInput
                    control={form.control}
                    name="city"
                    label="City"
                    placeholder="Enter your city"
                  />{" "}
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="state"
                      label="State"
                      placeholder="Enter your state example: NY"
                    />{" "}
                    <CustomInput
                      control={form.control}
                      name="zipCode"
                      label="Zip Code"
                      placeholder="Example:78787"
                    />
                  </div>
                  <div className="flex gap-4">
                    {" "}
                    <CustomInput
                      control={form.control}
                      name="dateOfBirth"
                      label="Date of Birth"
                      placeholder="YYYY-MM-DD"
                    />
                    <CustomInput
                      control={form.control}
                      name="ssn"
                      label="SSN"
                      placeholder="Example: 1234"
                    />
                  </div>
                </>
              )}
              <CustomInput
                control={form.control}
                name="email"
                label="Email"
                placeholder="Enter your Email"
              />{" "}
              <CustomInput
                control={form.control}
                name="password"
                label="Password"
                placeholder="Enter your password"
              />
              <div className="flex flex-col  gap-4">
                <Button type="submit" className="form-btn" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      &nbsp; Loading
                    </>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <footer className="flex justify-center gap-1 ">
            <p className="text-14 font-normal text-gray-600">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="form-link"
            >
              {type === "sign-in" ? "sign-up" : "Sign in"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
