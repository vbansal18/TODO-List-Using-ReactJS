import React, { useState, useEffect } from "react";
import "./style.css";

const getLocalData = () => {
  const lists = localStorage.getItem("myTodoList");
  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};
const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [toggle, setToggle] = useState(false);
  const [beingEditItemId, setBeingEditItemId] = useState("");

  const addItemToList = () => {
    if (!inputData) {
      alert("Please fill the todo item.");
    } else {
      if (toggle === false) {
        const newDateData = {
          id: new Date().getTime().toString(),
          name: inputData,
        };
        setItems([...items, newDateData]);
      } else {
        setItems(
          items.map((curElem) => {
            if (curElem.id === beingEditItemId) {
              return { ...curElem, name: inputData };
            }
            return curElem;
          })
        );
        setInputData("");
        setToggle(false);
        setBeingEditItemId(null);
      }
      setInputData("");
    }
  };

  const editItem = (id, name) => {
    setInputData(name);
    setBeingEditItemId(id);
    setToggle(true);
  };

  const deleteItem = (index) => {
    const updatedItems = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setItems(updatedItems);
  };

  const removeAll = () => {
    setItems([]);
  };

  useEffect(() => {
    localStorage.setItem("myTodoList", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="todologo" />
            <figcaption>Add Your List Here ✌️</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍️ Add Item"
              className="form-control"
              value={inputData}
              onChange={(event) => setInputData(event.target.value)}
            />

            {toggle ? (
              <i className="far fa-edit add-btn" onClick={addItemToList}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItemToList}></i>
            )}
          </div>

          <div className="showItems">
            {items.map((curElem) => {
              return (
                <div className="eachItem" key={curElem.id}>
                  <h3>{curElem.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => editItem(curElem.id, curElem.name)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(curElem.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span>CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
