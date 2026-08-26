import { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import SettingItem from "../components/Settings/SettingItem";

export default function Settings() {

  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <div
      style={{
        display:"flex",
        background:"#F5F6FA",
        minHeight:"100vh"
      }}
    >
      <Sidebar />

      <div
        style={{
          flex:1,
          marginLeft:"250px",
          padding:"30px"
        }}
      >
        <Navbar />

        <h1>Settings</h1>

        <p
          style={{
            color:"#666",
            marginBottom:"30px"
          }}
        >
          Manage your application settings.
        </p>

        <SettingItem
          title="Dark Mode"
          description="Enable dark theme"
        >
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() =>
              setDarkMode(!darkMode)
            }
          />
        </SettingItem>

        <SettingItem
          title="Notifications"
          description="Receive trip reminders"
        >
          <input
            type="checkbox"
            checked={notifications}
            onChange={() =>
              setNotifications(!notifications)
            }
          />
        </SettingItem>

        <SettingItem
          title="Change Password"
          description="Update your account password"
        >
          <button>
            Change
          </button>
        </SettingItem>

        <SettingItem
          title="Export Data"
          description="Download all your trips"
        >
          <button>
            Export
          </button>
        </SettingItem>

        <SettingItem
          title="Logout"
          description="Sign out from your account"
        >
          <button
            style={{
              background:"#E74C3C"
            }}
          >
            Logout
          </button>
        </SettingItem>

      </div>
    </div>
  );
}