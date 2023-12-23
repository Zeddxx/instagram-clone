"use client";

import { signUpSchema } from "@/lib/validation";
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

import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useState } from "react";
import Link from "next/link";
import { useCreateAccount, useSignInAccount } from "@/lib/react-query/queries-mutation";
import { useUserContext } from "@/context/auth-context";
import { redirect, useRouter } from "next/navigation";

const SignUpPage = () => {

  const { mutateAsync: createUserAccount, isPending: isCreatingUser } = useCreateAccount();
  const { mutateAsync: signInAccount, isPending: isSigningIn } = useSignInAccount();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext()

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      username: "",
      password: "",
    },
  });

  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  // const isFieldEmpty = () => {
  //   const { name, email, username, password } = form.getValues();
  //   return !name || !email || !username || !password;
  // };

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    const newUser = await createUserAccount(values)
    
    if(!newUser) {
      return;
    }

    const session = await signInAccount({
      email: values.email,
      password: values.password
    })

    if(!session) {
      return;
    }
    const isLoggedIn = await checkAuthUser();

    if(isLoggedIn){
      form.reset();
      router.push("/")
    }else{
      return;
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="w-full h-[44px] rounded-sm bg-gray-50 placeholder:text-sm"
                    placeholder="Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="w-full h-[44px] rounded-sm bg-gray-50 placeholder:text-sm"
                    placeholder="Username"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    className="w-full h-[44px] rounded-sm placeholder:text-sm bg-gray-50"
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
                      className="w-full h-[44px] rounded-sm placeholder:text-sm bg-gray-50"
                      placeholder="Password"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            isLoading={isCreatingUser}
            className="text-sm bg-blue-400 rounded-sm mt-[54px] hover:bg-blue-500"
          >
            Sign Up
          </Button>
        </form>
      </Form>

      <div className="w-full text-center mt-[38.5px]">
        <p className="text-gray-500 text-sm">
          Already have an account?{" "}
          <Link href="sign-in" className="text-blue-600">
            Log in.
          </Link>
        </p>
      </div>
    </div>
  );
};
export default SignUpPage;
