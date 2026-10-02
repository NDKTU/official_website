import React from "react";
import { Bell, Lock, Moon, Eye } from "lucide-react";

function Settings() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Sozlamalar</h2>

      <div className="bg-white rounded-lg shadow divide-y">
        {/* Notifications */}
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Bell className="h-5 w-5 text-gray-500" />
            <h3 className="text-lg font-semibold text-gray-800">
              Bildirishnomalar
            </h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">E'lonlar</p>
                <p className="text-sm text-gray-500">
                  Yangi e'lonlar haqida xabar berish
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2557A7]"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Baholash</p>
                <p className="text-sm text-gray-500">
                  Yangi baholar qo'yilganda xabar berish
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2557A7]"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Theme */}
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Moon className="h-5 w-5 text-gray-500" />
            <h3 className="text-lg font-semibold text-gray-800">Ko'rinish</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 rounded-lg bg-[#2557A7] text-white">
                Yorug'
              </button>
              <button className="px-4 py-2 rounded-lg border border-gray-300">
                Qorong'i
              </button>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Lock className="h-5 w-5 text-gray-500" />
            <h3 className="text-lg font-semibold text-gray-800">Xavfsizlik</h3>
          </div>
          <div className="space-y-4">
            <div className="max-w-md">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Joriy parol
                </label>
                <div className="relative">
                  <input
                    type="password"
                    className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <button className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <Eye className="h-5 w-5 text-gray-400" />
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Yangi parol
                </label>
                <div className="relative">
                  <input
                    type="password"
                    className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <button className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <Eye className="h-5 w-5 text-gray-400" />
                  </button>
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Yangi parolni tasdiqlang
                </label>
                <div className="relative">
                  <input
                    type="password"
                    className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                  <button className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <Eye className="h-5 w-5 text-gray-400" />
                  </button>
                </div>
              </div>
              <button className="w-full btn-primary">
                Parolni o'zgartirish
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
