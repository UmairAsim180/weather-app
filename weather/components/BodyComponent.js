"use client"
import React, { useState } from 'react'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { useWeather } from '@/app/context/WeatherContext'

export function BodyComponent({ children }) {
    const {imgPath} = useWeather()

  
    return (
      <div style={{ backgroundImage: `url('${imgPath}')` }} className="flex h-screen w-screen bg-cover bg-top">
        <SidebarProvider>
          <AppSidebar />
          <main className="p-2 flex-1 overflow-y-auto">
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>
      </div>)
  }