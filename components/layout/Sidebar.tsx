import { BsBellFill, BsHouseFill } from "react-icons/bs"
import { FaUser } from "react-icons/fa"
import SidebarLogo from "./SidebarLogo"
import SidebarItem from "./SidebarItem"

const Sidebar = () => {
    const items = [
        {
            label: "Home",
            icon: BsHouseFill,
            href: "/"
        },
        {
            label: "Notifications",
            icon: BsBellFill,
            href: "/notifications"
        },
        {
            label: "Profile",
            icon: FaUser,
            href: "/profile/123"
        }
    ]
    return (
        <div className="col-span-1 h-full pr-4 md:pr-6">
            <div className="felx felx-col items-end">
                <div className="space-y-2 lg:w-[230px]">
                    <SidebarLogo />
                    {items.map((item) => (
                        <SidebarItem
                            key={item.href}
                            href={item.href}
                            label={item.label}
                            icon={item.icon} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Sidebar