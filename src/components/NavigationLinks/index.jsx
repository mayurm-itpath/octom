import React from "react";
import { NavLink } from "react-router-dom";
import { URLS } from "../../constants/urls";

const NavigationLinks = () => {
  return (
    <>
      <div>
        <nav>
          <ul className="flex gap-5">
            <li>
              <NavLink
                to={URLS.INITIAL}
                className={({ isActive }) =>
                  `${isActive ? "text-blue font-bold" : "font-bold"}`
                }
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to={URLS.TASKS}
                className={({ isActive }) =>
                  `${isActive ? "text-blue font-bold" : "font-bold"}`
                }
              >
                Tasks
              </NavLink>
            </li>
            
            <li>
              <NavLink
                to={URLS.USERS}
                className={({ isActive }) =>
                  `${isActive ? "text-blue font-bold" : "font-bold"}`
                }
              >
                Users
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default NavigationLinks;
