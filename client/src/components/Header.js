import {
  Header,
  HeaderContainer,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  Theme,
} from "@carbon/react";
import { UserAvatar, Notification, Search } from "@carbon/icons-react";
import { useEffect, useState, useContext } from "react";
import { AppContext } from "../App";
import { Link } from "react-router-dom";

const HeaderBar = () => {
  const context = useContext(AppContext);

  const headerStyle = {
    backgroundColor: `rgb(${context.color.r}, ${context.color.g}, ${context.color.b})`,
  };

  return (
    <Theme theme="g100">
      <HeaderContainer
        render={({ isSideNavExpanded, onClickSideNavExpand }) => (
          <>
            <Header aria-label="Carbon Design System" style={headerStyle}>
              {context.customerName === "wxFlows" ? (
                <HeaderName href="/onboard" prefix="IBM">
                  {context.customerName}
                </HeaderName>
              ) : (
                <HeaderName>{context.customerName}</HeaderName>
              )}
              <HeaderNavigation aria-label="Carbon Design System">
                <HeaderMenuItem style={headerStyle} href="#">
                  Developers
                </HeaderMenuItem>
                <HeaderMenuItem style={headerStyle} href="#">
                  Resources
                </HeaderMenuItem>
                <HeaderMenuItem style={headerStyle} href="#">
                  Pricing
                </HeaderMenuItem>
                <HeaderMenuItem style={headerStyle} href="/onboard">
                  Onboard
                </HeaderMenuItem>
              </HeaderNavigation>
              <HeaderGlobalBar>
                <HeaderGlobalAction aria-label="Search" onClick={() => {}}>
                  <Search size={20} />
                </HeaderGlobalAction>
                <HeaderGlobalAction
                  aria-label="Notifications"
                  onClick={() => {}}
                >
                  <Notification size={20} />
                </HeaderGlobalAction>
                <HeaderGlobalAction aria-label="User Avatar" onClick={() => {}}>
                  <UserAvatar size={20} />
                </HeaderGlobalAction>
              </HeaderGlobalBar>
            </Header>
          </>
        )}
      />
    </Theme>
  );
};

export default HeaderBar;
