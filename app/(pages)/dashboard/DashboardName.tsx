"use client";

import { useState, useTransition, useEffect } from "react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import type { User } from "@/app/types";
import { updateUserName, getUserDetails } from "./serveractions";
import LoadingSpinner from "@/app/components/loading/LoadingSpinner";
export default function DashboardName({ name }: { name: string }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(name);
  const [details, setDetails] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentName, setCurrentName] = useState(name);
  const [isPending, startTransition] = useTransition();
  const { data: session, update } = useSession();

  useEffect(() => {
    const findAndSetUserDetails = async () => {
      if (!session?.user?.email) return;
      const userDetails = await getUserDetails(session?.user?.email);
      update({ user: { ...session?.user, name: userDetails?.name } });
      setDetails(userDetails);
      setIsLoading(false);
    };
    findAndSetUserDetails();
  }, [session?.user?.email, session?.user, update]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewName(currentName);
  };

  const handleSave = async () => {
    startTransition(async () => {
      try {
        await updateUserName(newName);
        setCurrentName(newName);
        setIsEditing(false);
        toast.success("Name updated!");
      } catch (e: any) {
        toast.error("Failed to update name.");
        console.error(e.message);
      }
    });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="mb-4">
      <label
        htmlFor="name"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Name
      </label>
      {isEditing ? (
        <div className="flex gap-2">
          <input
            id="name"
            type="text"
            value={details?.name}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            disabled={isPending}
          />
          <button
            onClick={handleSave}
            className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-300 transition-colors"
            disabled={isPending}
          >
            Save
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            disabled={isPending}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <span className="text-lg">{currentName}</span>
          <button
            onClick={handleEdit}
            className="ml-2 text-sm text-yellow-500 hover:underline"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
}
