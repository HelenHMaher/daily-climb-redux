import React from "react";
import { StyledNews } from "./news.styled";

export const News = () => {
  return (
    <StyledNews>
      <h2>Latest Updates</h2>
      <p name="postDate">Oct. 14, 2020</p>
      <p name="post">
        Welcome to the Beta Version of My Daily Climb. Please be aware that in
        this stage of development, user data will not be secure and may be
        deleted at any time.
      </p>
      <ul>
        <li>Here is an item</li>
        <li>Here is an item</li>
      </ul>
    </StyledNews>
  );
};
