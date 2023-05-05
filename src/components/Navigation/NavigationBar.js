import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import Logo from "../../assets/graphics/logo.png";
import "./Navigation.css";

const { Header } = Layout;
const routes = [
  { pathName: "Home", route: "/" },
  { pathName: "Create", route: "/create" },
  { pathName: "View", route: "/view" },
];

const NavigationBar = () => {
  const [selectedKey, setSelectedKey] = useState("1");

  const handleClick = (e) => {
    setSelectedKey(e.key);
  };

  return (
    <Layout className="layout">
      <Header>
        <div className="logo">
          <img src={Logo} />
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[selectedKey]}
          onClick={handleClick}
        >
          {routes.map((route, index) => (
            <Menu.Item key={index + 1}>
              <Link to={route.route}>{route.pathName}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Header>
    </Layout>
  );
};
export default NavigationBar;
