"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {

  const router = useRouter();

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {

    e.preventDefault();

    // lấy device id
      function getDeviceInfo(){

        const data = {
          userAgent: navigator.userAgent,
          language: navigator.language,
          platform: navigator.platform,
          screen: `${screen.width}x${screen.height}`,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        }

        return btoa(JSON.stringify(data))
      }
    //lưu lại thiết bị
    localStorage.setItem("device-id", getDeviceInfo())
    
    const res = await fetch("/api/admin/login",{
      method:"POST",
      headers:{ "Content-Type":"application/json"},
      body:JSON.stringify({
        username,
        password,
        deviceId: getDeviceInfo()
      })
    })

    const data = await res.json()


    if(data.success){
      router.push("/admin/dashboard")
    }else{
      setError(data.error || "Login failed")
    }
  }

return (
  <div className="flex items-center justify-center min-h-screen">

    <form
      onSubmit={handleLogin}
      className="p-8 rounded-xl shadow-md w-[350px] flex flex-col gap-4"
    >

      <h2 className="text-xl font-semibold text-center">
        Admin Login
      </h2>

      <input
        value={username}
        onChange={(e)=>setUsername(e.target.value)}
        placeholder="Username"
        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        placeholder="Password"
        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Login
      </button>

      {error && (
        <p className="text-red-500 text-sm text-center">
          {error}
        </p>
      )}

    </form>

  </div>
);
}