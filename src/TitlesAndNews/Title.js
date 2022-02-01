import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Title = ({ title, link, linkTitle }) => {
  return (
    <div className="d-flex justify-content-between">
      <h4>{title}</h4>
      <Link exact path className="btn btn-primary" to={link}>
        {linkTitle}
      </Link>
    </div>
  );
};

Title.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  linkTitle: PropTypes.string.isRequired,
};

export default Title;