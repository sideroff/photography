import React from "react";

import "./Contact.scss";

export default function Contacts() {
  const phone = "+359 234 567890";
  const email = "damyan.georgiev@gmail.com";
  return (
    <div className="contact">
      <img className="picture" src="/contacts.png" alt="Damyan Georgiev" />
      <div className="text">
        <h3>Damyan Georgiev</h3>
        <p>Varna, Bulgaria</p>
        <p>
          <a href={"tel:" + phone}>{phone}</a>
        </p>
        <p>
          <a href={"mailto:" + email}>{email}</a>
        </p>
      </div>
    </div>
  );
}
