import React from "react";
import { HeaderDiv } from "./styles";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

const Header = () => {
  const navigate = useNavigate();
  const handleClickMyProfile = () => {
    navigate("/my-profile");
  };
  const token = localStorage.getItem("token");
  const loggedIn = token?.length !== undefined;
  return (
    <HeaderDiv>
      {loggedIn && (
        <Button
          type="primary"
          style={{ background: "black", marginLeft: "10px" }}
          onClick={handleClickMyProfile}
        >
          My Profile
        </Button>
      )}
    </HeaderDiv>
  );
};

export default Header;
