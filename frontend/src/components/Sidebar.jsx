import { CheckCircle2, Home, ListChecks, Sparkles, User } from "lucide-react";
import { NavLink } from "react-router-dom";

function Sidebar({user}) {
  const username = user.name ? user.name : "User";
  const initial = username.charAt(0).toUpperCase();

  // console.log(user.role)

  const menuItems = [
    { text: "All Tasks", path: "/", icon: <Home className="w-5 h-5" /> },
    {
      text: "Remaining Tasks",
      path: "/remaining",
      icon: <ListChecks className="w-5 h-5" />,
    },
    {
      text: "Completed Tasks",
      path: "/complete",
      icon: <CheckCircle2 className="w-5 h-5" />,
    },
  ];

  const adminMenuItems = [
    {
      text: "All Tasks",
      path: "/admin/tasks",
      icon: <Sparkles className="w-5 h-5" />,
    },
    {
      text: "All Users",
      path: "/admin/users",
      icon: <User className="w-5 h-5" />,
    }
  ];

  const renderMenuItems = () => {
    const itemsToRender = user.role == "admin" ? adminMenuItems : menuItems
    return(
    <ul className="space-y-2">
      {itemsToRender.map(({ text, path, icon }) => (
        <li key={text}>
          <NavLink
            to={path}
            className={({ isActive }) =>
              [
                "group flex items-center px-4 py-3 rounded-xl transition-all duration-300 lg:justify-start",
                isActive
                  ? "bg-linear-to-r from-purple-50 to-fuchsia-50 border-l-4 border-purple-500 text-purple-700 font-medium shadow-sm"
                  : "hover:bg-purple-50/50 text-gray-600 hover:text-purple-700",
              ].join(" ")
            }
          >
            <span className="transition-transform duration-300 group-hover:scale-110 text-purple-500">
              {icon}
            </span>
            <span className="text-sm font-medium ml-2">{text}</span>
          </NavLink>
        </li>
      ))}
    </ul>
    )
  }

  return (
    <div className="hidden md:flex flex-col fixed h-full w-20 lg:w-64 bg-white/90 backdrop-blur-sm border-r border-purple-100 shadow-sm z-20 transition-all duration-300">
      <div className="p-5 border-b border-purple-100 lg:block hidden">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md">
            {initial}
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-800">Hey, {user && username}</h2>
            <p className="text-sm text-purple-500 font-medium flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Welcome Back!
            </p>
          </div>
        </div>
      </div>
      {renderMenuItems()}

    </div>
  );
}

export default Sidebar;
