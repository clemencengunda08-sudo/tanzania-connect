
"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import {
  BookOpen, Bus, Compass, HeartPulse, Info, Sprout, Home, 
  Landmark, Briefcase, History, Coins, Construction, 
  Binoculars, Utensils, Tv, ShieldCheck, 
  Settings, Activity, Mountain
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const navigation = {
  main: [
    { title: "Home Portal", url: "/", icon: Compass },
    { title: "Expert Manuals", url: "/guides", icon: BookOpen },
  ],
  legal: [
    { title: "Immigration & Entry", url: "/visa", icon: Landmark },
    { title: "Corporate & Compliance", url: "/corporate", icon: Briefcase },
  ],
  economic: [
    { title: "Agriculture", url: "/agriculture", icon: Sprout },
    { title: "Mining & Minerals", url: "/mining", icon: Mountain },
    { title: "Infrastructure", url: "/infrastructure", icon: Construction },
    { title: "Banking & Finance", url: "/banking", icon: Coins },
  ],
  logistics: [
    { title: "Transport", url: "/transport", icon: Bus },
    { title: "Healthcare", url: "/healthcare", icon: HeartPulse },
    { title: "Housing & Realty", url: "/housing", icon: Home },
    { title: "Phrasebook", url: "/phrasebook", icon: Info },
    { title: "Food & Drinks", url: "/food-and-drink", icon: Utensils },
  ],
  discovery: [
    { title: "History", url: "/culture", icon: History },
    { title: "Wildlife & Safaris", url: "/wildlife", icon: Binoculars },
    { title: "Entertainment", url: "/entertainment", icon: Tv },
  ]
}

export function AppSidebar() {
  const pathname = usePathname();

  const NavItem = ({ item }: { item: any }) => {
    const isActive = pathname === item.url;
    return (
      <SidebarMenuItem>
        <SidebarMenuButton asChild tooltip={item.title}>
          <Link 
            href={item.url} 
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-medium",
              isActive 
                ? "bg-primary/10 text-primary border border-primary/20 shadow-sm" 
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            <item.icon className={cn("h-4.5 w-4.5 shrink-0", isActive ? "text-primary" : "opacity-60")} />
            <span className="text-sm">{item.title}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    )
  }

  return (
    <Sidebar variant="sidebar" collapsible="icon" className="hidden md:flex border-r border-primary/5 bg-background h-screen sticky top-0">
      <SidebarHeader className="py-6 px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-tanzania text-white shadow-lg shadow-primary/20">
            <Landmark className="h-5 w-5" />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="font-headline text-lg font-black tracking-tighter leading-none text-foreground uppercase">
              TANZANIA REACH
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mt-1 opacity-70">
              Expert Portal 2026
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 space-y-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.main.map((item) => <NavItem key={item.title} item={item} />)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] uppercase font-black tracking-[0.15em] px-4 py-2 opacity-60">Legal & Status</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.legal.map((item) => <NavItem key={item.title} item={item} />)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] uppercase font-black tracking-[0.15em] px-4 py-2 opacity-60 group-data-[collapsible=icon]:hidden">Economy</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.economic.map((item) => <NavItem key={item.title} item={item} />)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] uppercase font-black tracking-[0.15em] px-4 py-2 opacity-60 group-data-[collapsible=icon]:hidden">Logistics</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.logistics.map((item) => <NavItem key={item.title} item={item} />)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-primary/5 group-data-[collapsible=icon]:hidden">
        <div className="bg-primary/5 rounded-2xl p-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <Activity className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-primary leading-none">System</p>
              <p className="text-xs font-bold text-emerald-500 mt-1 uppercase tracking-tighter">Operational</p>
            </div>
          </div>
          <Link href="/p-access/login">
            <Button variant="ghost" className="w-full justify-start text-[10px] uppercase tracking-widest font-black text-muted-foreground hover:text-primary p-0 h-auto">
              <Settings className="w-3 h-3 mr-2" /> Admin Portal
            </Button>
          </Link>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
