'use client'
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { login as loginApi } from '@/utils/apihelper';
import Image from 'next/image';
import PreloaderLink from '@/components/PreloaderLink';

export default function Page() {
    const [activeTab, setActiveTab] = useState('employee');
    const [showPassword, setShowPassword] = useState(false);
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [errors, setErrors] = useState({ identifier: '', password: '', otp: '' });

    const isEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(identifier);
    const isMobile = /^\d{10}$/.test(identifier.replace(/\D/g, ''));
    const router = useRouter();

    const validate = () => {
        let valid = true;
        let newErrors = { identifier: '', password: '', otp: '' };

        if (!identifier) {
            newErrors.identifier = 'Email or mobile number is required';
            valid = false;
        } else if (!isEmail && !isMobile) {
            newErrors.identifier = 'Enter a valid email or 10-digit mobile number';
            valid = false;
        }

        if (isEmail && !password) {
            newErrors.password = 'Password is required';
            valid = false;
        }

        if (isMobile && !otp) {
            newErrors.otp = 'OTP is required';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleLogin = async () => {
        if (!validate()) return;
        let data = { identifier };

        if (isEmail) {
            data.password = password;
        } else {
            data.otp = otp;
        }

        const result = await loginApi(data);

        if (result.success) {
            toast.success('Login successful!');
            if (result.data.token) {
                localStorage.setItem('token', result.data.token);
            }
            setTimeout(() => {
                router.push('/register');
            }, 1000);
        } else {
            toast.error(result.message || 'Login failed');
        }
    };

    const handleIdentifierChange = (e) => {
        setIdentifier(e.target.value);
        if (errors.identifier) setErrors({ ...errors, identifier: '' });
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (errors.password) setErrors({ ...errors, password: '' });
    };

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
        if (errors.otp) setErrors({ ...errors, otp: '' });
    };

    return (
        <section className="bg-[url('/bg.webp')] bg-cover bg-center pt-8 flex min-h-[calc(100vh-145px)]">
            <div className="flex container relative z-10">
                <div className="hidden lg:block lg:w-1/2 relative ">
                    <Image src="/log.webp" fill alt="img" className="object-contain -ms-18" />
                </div>

                <div className="w-full lg:w-1/2 flex items-center justify-center md:p-8">
                    <div className="w-full max-w-md ">
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold mb-3">Welcome Back</h1>
                            <p className="text-sm">Please login to your account to discover latest career opportunity.</p>
                        </div>

                        <div className="bg-white rounded-xl shadow p-6">
                            <div className="flex gap-2 mb-4 bg-prime/10 p-1 rounded-full text-center">
                                <button
                                    onClick={() => setActiveTab('employee')}
                                    className={`py-1 px-3 font-medium text-sm flex-1 ${activeTab === 'employee'
                                        ? 'bg-white rounded-full shadow'
                                        : ''
                                        }`}
                                >
                                    Employee
                                </button>
                                <button
                                    onClick={() => setActiveTab('employer')}
                                    className={`py-1 px-3 font-medium text-sm flex-1 ${activeTab === 'employer'
                                        ? 'bg-white rounded-full shadow'
                                        : ''
                                        }`}
                                >
                                    Employer
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="identifier" className="block text-sm font-medium mb-2">
                                        Email ID / Mobile Number
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="identifier"
                                            value={identifier}
                                            onChange={handleIdentifierChange}
                                            placeholder="jhondoe@gmail.com or +91 98765 43210"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-prime focus:border-prime outline-none"
                                        />
                                        {isMobile && (
                                            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-prime text-sm font-medium">
                                                Send OTP
                                            </button>
                                        )}
                                    </div>
                                    {errors.identifier && <p className="text-red-500 text-xs mt-1">{errors.identifier}</p>}
                                </div>

                                {isEmail && (
                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium mb-2">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                id="password"
                                                value={password}
                                                onChange={handlePasswordChange}
                                                placeholder="••••••••••••••••"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-prime focus:border-prime outline-none pr-12"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2"
                                            >
                                                {!showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                                    </div>
                                )}

                                {isMobile && (
                                    <div>
                                        <label htmlFor="otp" className="block text-sm font-medium mb-2">
                                            Enter OTP
                                        </label>
                                        <input
                                            type="text"
                                            id="otp"
                                            value={otp}
                                            onChange={handleOtpChange}
                                            placeholder="Enter 6-digit OTP"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-prime focus:border-prime outline-none"
                                            maxLength="6"
                                        />
                                        {errors.otp && <p className="text-red-500 text-xs mt-1">{errors.otp}</p>}
                                    </div>
                                )}

                                <div className="flex items-center justify-between">
                                    <label className="flex items-center font-semibold cursor-pointer">
                                        <input type="checkbox" className="mr-2" />
                                        <span className="text-sm">Remember Me</span>
                                    </label>
                                    <PreloaderLink href="#" className="text-sm hover:text-prime underline">
                                        Forgot Password?
                                    </PreloaderLink>
                                </div>

                                <button
                                    onClick={handleLogin}
                                    className="w-full bg-prime text-white py-3 rounded-full font-medium hover:opacity-90"
                                >
                                    Login
                                </button>

                                <p className="text-center text-sm">
                                    Don't have an account?{' '}
                                    <PreloaderLink href="/register" className="text-prime font-medium">
                                        Register Now
                                    </PreloaderLink>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}