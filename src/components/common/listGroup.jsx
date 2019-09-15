import React from "react";

// func names always start with capital letter
const ListGroup = props => {
  const { items, onItemSelect, selectedGenre } = props;
  return (
    <ul className="list-group">
      {items.map(i => (
        <li
          key={i._id}
          onClick={() => onItemSelect(i)}
          className={
            i === selectedGenre ? "list-group-item active" : "list-group-item"
          }
        >
          {i.name}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
