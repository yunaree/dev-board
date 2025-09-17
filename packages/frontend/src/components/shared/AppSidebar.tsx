import { ChevronDown, Home, Settings, Telescope } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"

// Основні пункти
const mainItems = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Explore your boards",
    type: "collapsible",
    icon: Telescope,
    children: [
      { title: "Board1", url: "#" },
      { title: "Board2", url: "#" },
    ],
  },
]

// Нижні пункти (Settings та інші якщо треба)
const bottomItems = [
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

const headertitle = "<dev-board />"

export function AppSidebar() {
  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader
        className="my-5 ml-2 flex lg:justify-start space-x-4 font-[family-name:var(--font-geist-mono)] whitespace-nowrap"
      >
        {headertitle}
      </SidebarHeader>

      <SidebarContent className="flex flex-col h-full">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) =>
                item.type === "collapsible" ? (
                  <Collapsible key={item.title} defaultOpen className="group/collapsible">
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          <item.icon />
                          {item.title}
                          <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.children?.map((child) => (
                            <SidebarMenuSubItem key={child.title}>
                              <SidebarMenuButton asChild>
                                <a href={child.url}>{child.title}</a>
                              </SidebarMenuButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Нижній блок — Settings */}
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              {bottomItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
