import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";

import User from "./User";
import { Loader, UXBtn } from "../../components/UX";
import { makeReq, tryAgain } from "../../helpers";

const Home = () => {
  const [users, setUsers] = useState(0);
  const [imageBaseURL, setImageBaseURL] = useState("");

  useEffect(() => {
    makeReq({
      url: "get-sample-farmers?limit=20",
      successCallback: ({ status, data: { farmers, imageBaseUrl } }) => {
        if (status !== "true" && status !== true)
          return setUsers("Error getting users");

        setUsers(farmers);
        setImageBaseURL(imageBaseUrl);
      },
      noContent: () => setUsers("No users at the moment"),
      errorCallback: () =>
        setUsers("Unable to get users at this moment. " + tryAgain())
    });
  }, []);

  if (users === 0)
    return (
      <div className="mt-5 fs-48 text-center">
        <Loader />
      </div>
    );
  if (typeof users === "string")
    return <div className="mt-5 text-center text-danger">{users}</div>;

  if (!Array.isArray(users)) return <div />;

  const setShowFull = ind => {
    const newUsers = [...users];
    const newUsersLen = newUsers.length;
    for (let i = 0; i < newUsersLen; i++) newUsers[i].showFull = false;
    newUsers[ind].showFull = !newUsers[ind].showFull;
    setUsers(newUsers);
  };

  const usersList = users.map((user, ind) => {
    if (!user || typeof user !== "object") return <React.Fragment key={ind} />;

    const name = `${user.first_name} ${user.middle_name} ${user.surname}`;
    const location = `${user.address}, ${user.city}, ${user.state}. ${user.nationality}`;
    return (
      <User
        onClick={() => setShowFull(ind)}
        {...{ ...user, name, location, imageBaseURL }}
        key={ind}
      />
    );
  });

  return (
    <div>
      <section className="users-list mt-5">{usersList}</section>
      <section className="pagination mt-5">
        <UXBtn>
          <FontAwesomeIcon icon={faCaretLeft} />
        </UXBtn>
        <UXBtn>
          <FontAwesomeIcon icon={faCaretRight} />
        </UXBtn>
      </section>
    </div>
  );
};

export default Home;
