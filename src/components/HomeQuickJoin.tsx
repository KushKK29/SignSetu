'use client';

import { useState, KeyboardEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';

function HomeQuickJoin() {
  // Use state to track if component is mounted
  const [isMounted, setIsMounted] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  
  // Set mounted state after component mounts on client
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Don't render anything during SSR or initial hydration
  if (!isMounted) {
    return (
      <div className="w-full space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <div className="relative flex-1">
            <div className="w-full h-12 bg-gray-100 rounded-lg animate-pulse"></div>
          </div>
          <div className="flex gap-3">
            <div className="w-24 h-12 bg-gray-100 rounded-lg animate-pulse"></div>
            <div className="w-24 h-12 bg-gray-100 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  async function createRoom() {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/game/create-room", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Failed to create room. Please try again."
        );
      }

      const data = await response.json();
      router.push(`/game/${data.room.id}`);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
      console.error("Error creating room:", err);
    } finally {
      setLoading(false);
    }
  }

  function joinRoom() {
    if (!roomId.trim()) {
      setError("Please enter a room ID");
      return;
    }
    setError(null);
    router.push(`/game/${roomId.trim()}`);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      joinRoom();
    }
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <div className="relative flex-1">
          <input
            type="text"
            className={`w-full px-4 py-3 rounded-lg border ${
              error ? "border-red-500" : "border-gray-300"
            } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
            placeholder="Enter room code"
            value={roomId}
            onChange={(e) => {
              setRoomId(e.target.value);
              if (error) setError(null);
            }}
            onKeyDown={handleKeyDown}
            disabled={loading}
            aria-label="Room code"
          />
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={joinRoom}
            disabled={loading || !roomId.trim()}
            className={`flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              !roomId.trim() || loading
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md transform hover:-translate-y-0.5"
            }`}
            aria-label="Join room"
          >
            {loading ? (
              <span className="inline-flex items-center">
                <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-transparent" />
                Joining...
              </span>
            ) : (
              <span>Join Room →</span>
            )}
          </button>

          <div className="relative flex items-center justify-center my-2 sm:my-0">
            <div className="h-full border-l border-gray-300"></div>
            <span className="absolute bg-white px-2 text-gray-400 text-sm">
              or
            </span>
          </div>

          <button
            onClick={createRoom}
            disabled={loading}
            className={`flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              loading
                ? "bg-indigo-500 text-white cursor-wait"
                : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 hover:shadow-md transform hover:-translate-y-0.5"
            }`}
            aria-label="Create new room"
          >
            {loading ? (
              <span className="inline-flex items-center">
                <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/70 border-t-transparent" />
                Creating...
              </span>
            ) : (
              <span>New Room</span>
            )}
          </button>
        </div>
      </div>

      <p className="text-xs text-center text-gray-500 mt-2">
        Don't have a room? Create one and share the code with friends!
      </p>
    </div>
  );
}

export default HomeQuickJoin;
