'use client';
import Image from "next/image"
import Link from "next/link"

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axiosInstance from "@/config/axiosInstance";
import urlConfig from "@/config/urlConfig";
import { useToast } from "@/hooks/use-toast";

// Create a Zod schema for validation
const formSchema = z.object({
    name: z.string().min(1, 'Please enter your name.'),
    email: z.string().email('Oops! That doesn’t look like a valid email.'),
    password: z.string().min(6, 'Your password should be at least 6 characters long for better security.'),
});


const RegisterForm = () => {
    const { toast } = useToast()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const handleRegister = async (data: z.infer<typeof formSchema>) => {
        try {
            const response = await axiosInstance.post(urlConfig.auth.register, data);
            console.log("response", response)
            toast({
                description: response?.data?.message,
                variant: response?.data?.success ? "default" : "destructive"
            })

        } catch (error) {
            console.log(error)
            toast({
                variant: "destructive",
                description: error?.response?.data?.message || 'An error occurred. Please try again.',
            })

        }
    }
    return (
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Sign Up</h1>
                        <p className="text-balance text-muted-foreground">
                            Enter your information to create an account
                        </p>
                    </div>
                    <form onSubmit={handleSubmit(handleRegister)}>
                        <div className="grid gap-4">

                            <div className="grid gap-2">
                                <Label htmlFor="name" className={errors.name ? "text-red-500" : ''}>Name</Label>
                                <Input id="name"  {...register("name")} />

                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email" className={errors.email ? "text-red-500" : ''} >Email</Label>
                                <Input
                                    id="email"
                                    type="email"

                                    {...register("email")}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password" className={errors.password ? "text-red-500" : ''}>Password</Label>
                                <Input id="password" type="password" {...register("password")} />
                            </div>
                            <Button type="submit" className="w-full">
                                Create an account
                            </Button>

                        </div>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link href="/login" className="underline">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
            <div className="hidden bg-muted lg:block">
                <Image
                    src="/images/register-cover.jpg"
                    alt="Image"
                    width="1920"
                    height="1080"
                    className="h-full w-full object-cover dark:brightness-[0.6]"
                />
            </div>
        </div>
    )
}

export default RegisterForm