import { BsBellFill, BsHouseFill } from "react-icons/bs"
import { FaUser } from "react-icons/fa"
import { BiLogOut } from "react-icons/bi"
import SidebarLogo from "./SidebarLogo"
import SidebarItem from "./SidebarItem"
import SidebarTweetButton from "./SidebarTweetButton"
import useCurrentUser from "@/hooks/useCurrentUser"
import { signOut } from "next-auth/react"

const Sidebar = () => {
    const { data: currentUser } = useCurrentUser()

    const items = [
        {
            label: "Home",
            icon: BsHouseFill,
            href: "/"
        },
        {
            label: "Notifications",
            icon: BsBellFill,
            href: "/notifications",
            auth: true,
            alert: true
        },
        {
            label: "Profile",
            icon: FaUser,
            href: `/users/${currentUser?.id}`,
            auth: true
        }
    ]
    return (
        <div className="col-span-1 h-full pr-4 md:pr-6">
            <div className="flex flex-col items-end">
                <div className="space-y-2 lg:w-[230px]">
                    <SidebarLogo />
                    {items.map((item) => (
                        <SidebarItem
                            key={item.href}
                            href={item.href}
                            label={item.label}
                            icon={item.icon}
                            auth={item.auth}
                            alert={item.alert}
                        />
                    ))}
                    {currentUser && (
                        <SidebarItem href="" onClick={() => signOut()} icon={BiLogOut} label="Logout" />
                    )}
                    <SidebarTweetButton />
                </div>
            </div>
        </div>
    )
}

export default Sidebar