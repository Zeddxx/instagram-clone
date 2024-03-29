"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInValidation } from "@/lib/validation";
import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import Link from "next/link";
import { useSignInAccount } from "@/lib/react-query/queries-mutation";
import { useUserContext } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SignInPage = () => {
  const { checkAuthUser, isLoading: isUserLoading, user } = useUserContext();
  const { mutateAsync: signInAccount } = useSignInAccount();

  const router = useRouter();

  const form = useForm<z.infer<typeof signInValidation>>({
    resolver: zodResolver(signInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const isFieldEmpty = () => {
    const { email, password } = form.getValues();
    return !email || !password;
  };

  async function onSubmit(values: z.infer<typeof signInValidation>) {
    try {
      const session = await signInAccount({
        email: values.email,
        password: values.password,
      });

      if (session.status === "400") {
        return toast.error("Wrong credentials!");
      }

      if (!session) {
        return toast("Sign in failed! please try again later.");
      }

      const isLoggedIn = await checkAuthUser();

      if (isLoggedIn) {
        form.reset();
        toast.success("Logged in successfully ❤️");
        return router.push("/home");
      } else {
        return toast.error(
          "Sign in failed! some error occurred while signing you in!"
        );
      }
    } catch (error) {
      console.log(error);
      return toast("Sign in failed! please try again later.");
    }
  }

  const handleDemoUser = async () => {
    const loginDemoUser = await signInAccount({
      email: "demo@gmail.com",
      password: "demoaccount"
    })

    if(loginDemoUser.status === '200') {
      toast.success('Logged in Demo user successfull! 🍅')
      return router.push('/home')
    }else {
      toast.error("Login Failed! 🌋")
    }
  }

  return (
    <div className="w-full mt-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    className="w-full h-[44px] rounded-sm bg-gray-50 dark:bg-neutral-800 placeholder:text-sm"
                    placeholder="Email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl className="w-full">
                  <div className="relative">
                    <span
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      className="absolute right-3 top-1/2 text-gray-400 -translate-y-1/2 cursor-pointer w-fit"
                    >
                      {isPasswordVisible ? (
                        <IoEyeOffOutline size={22} />
                      ) : (
                        <IoEyeOutline size={22} />
                      )}
                    </span>
                    <Input
                      type={isPasswordVisible ? "text" : "password"}
                      className="w-full h-[44px] rounded-sm placeholder:text-sm bg-gray-50 dark:bg-neutral-800"
                      placeholder="Password"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-full h-auto">
            <button onClick={handleDemoUser} className="text-xs w-full text-end font-medium text-sky-400">Demo Account?</button>
          </div>
          <Button
            isLoading={isUserLoading}
            type="submit"
            disabled={form.formState.isSubmitting || isFieldEmpty()}
            className="text-sm bg-blue-400 rounded-sm mt-[54px] hover:bg-blue-500"
          >
            Log in
          </Button>
        </form>
      </Form>

      <div className="w-full text-center mt-[38.5px]">
        <p className="text-gray-500 text-sm">
          Already have an account?{" "}
          <Link href="sign-up" className="text-blue-600">
            Sign up.
          </Link>
        </p>
      </div>
    </div>
  );
};
export default SignInPage;
