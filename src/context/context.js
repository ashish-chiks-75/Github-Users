import React, { useState, useEffect, useContext } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import axios from "axios";

const rootUrl = "https://api.github.com";

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  const [requests, setRequests] = useState(0);
  const [error, setError] = useState({ show: false, msg: "" });
  const [loading, setLoading] = useState(false);

  const checkRequests = async () => {
    try {
      const response = await axios(`${rootUrl}/rate_limit`);
      const {
        rate: { remaining },
      } = response.data;
      setRequests(remaining);
      if (remaining === 0)
        setError({
          show: true,
          msg: "Sorry! You have already reached your hourly search limit.",
        });
    } catch (error) {
      console.log(error);
    }
  };

  const searchGithubUser = async (user) => {
    setLoading(true);
    setError({ show: false, msg: "" });
    try {
      const response = await axios(`${rootUrl}/users/${user}`);
      if (response) {
        setGithubUser(response.data);
        const { repos_url, followers_url } = response.data;
        const repos = await axios(`${repos_url}?per_page=100`);
        const followers = await axios(`${followers_url}?per_page=100`);

        await Promise.allSettled([repos, followers]).then((results) => {
          if (
            results[0].status === "rejected" ||
            results[1].status === "rejected"
          ) {
            setError({ show: true, msg: "Internal server error" });
          } else {
            setRepos(results[0].value.data);
            setFollowers(results[1].value.data);
          }
        });
      } else
        setError({ show: true, msg: "There is no user with that username" });
    } catch (error) {
      setError({ show: true, msg: "There is no user with that username" });
    }
    setLoading(false);
    checkRequests();
  };

  useEffect(() => {
    checkRequests();
  }, []);

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        error,
        searchGithubUser,
        loading,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GithubContext);
};

export { GithubContext, GithubProvider };
