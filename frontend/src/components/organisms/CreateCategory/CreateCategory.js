import React from "react";

import { Input } from "../../atoms";

export default function CreateCategory() {
  const createCategory = (event) => {
    console.log(event);
  };

  return (
    <div>
      <h3>Create Category</h3>
      <form onsubmit={createCategory}>
        <Input type="text" name="name" placeholder="Name" />
        <Input type="text" name="description" placeholder="Description" />

        <Input type="submit" value="Submit" />
      </form>
    </div>
  );
}
