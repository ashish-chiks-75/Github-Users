import React from "react";
import { GoRepo, GoGist } from "react-icons/go";
import { FiUsers, FiUserPlus } from "react-icons/fi";

const items = [
  {
    id: 1,
    icon: <GoRepo className="icon" />,
    label: "repos",
    color: "pink",
  },
  {
    id: 2,
    icon: <FiUsers className="icon" />,
    label: "followers",
    color: "green",
  },
  {
    id: 3,
    icon: <FiUserPlus className="icon" />,
    label: "following",
    color: "purple",
  },
  {
    id: 4,
    icon: <GoGist className="icon" />,
    label: "gists",
    color: "yellow",
  },
];

export default items;
