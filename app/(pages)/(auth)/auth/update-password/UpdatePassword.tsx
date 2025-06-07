"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Form, Input, Button, type FormProps } from "antd";
import toast from "react-hot-toast";
import { LockClosedIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import { setNewPassword } from "./serveractions";

const { Item } = Form;

export default function UpdatePassword() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      router.push("/auth/sign-in");
    }
  }, [token, router]);

  const handleUpdatePassword: FormProps<{
    newPassword: string;
    confirmNewPassword: string;
  }>["onFinish"] = async (values) => {
    if (values.newPassword !== values.confirmNewPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    if (!token) {
      toast.error("Invalid token");
      return;
    }

    try {
      await setNewPassword(values.newPassword, token);
      toast.success("Password updated successfully");
      router.push("/auth/sign-in");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center px-4 py-12 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-gray-100">
          {/* Header with Icon */}
          <div className="mb-8 text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100">
              <ShieldCheckIcon
                className="h-8 w-8 text-blue-600"
                aria-hidden="true"
              />
            </div>
            <h2 className="mt-6 text-2xl font-bold text-gray-900">
              Update Your Password
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Create a strong password to keep your account secure
            </p>
          </div>

          {/* Form */}
          <Form
            name="updatePassword"
            layout="vertical"
            onFinish={handleUpdatePassword}
            scrollToFirstError
            className="space-y-6"
          >
            <Item
              label="New Password"
              name="newPassword"
              rules={[
                { required: true, message: "Please enter a password" },
                { min: 8, message: "Password must be at least 8 characters" },
              ]}
            >
              <Input.Password
                prefix={
                  <LockClosedIcon className="h-5 w-5 text-gray-400 mr-1" />
                }
                placeholder="Enter your new password"
                className="rounded-md py-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full"
              />
            </Item>

            <Item
              label="Confirm New Password"
              name="confirmNewPassword"
              rules={[
                { required: true, message: "Please confirm your password" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The two passwords do not match")
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={
                  <LockClosedIcon className="h-5 w-5 text-gray-400 mr-1" />
                }
                placeholder="Confirm your new password"
                className="rounded-md py-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500 block w-full"
              />
            </Item>

            {/* Password Requirements */}
            <div className="rounded-md bg-gray-50 p-4">
              <div className="text-sm text-gray-700">
                <h4 className="font-medium mb-2">Password requirements:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>At least 8 characters</li>
                  <li>Include uppercase and lowercase letters</li>
                  <li>Include at least one number</li>
                  <li>Include at least one special character</li>
                </ul>
              </div>
            </div>

            <Item>
              <Button
                htmlType="submit"
                type="primary"
                loading={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Update Password
              </Button>
            </Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
