import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ITask } from "../Interface";
import "../App.css";
import e, { response } from "express";

const Todo = () => {
  const [inputId, setInputId] = useState<string>("");
  const [inputCategory, setInputCategory] = useState<string>("");
  const [inputDescription, setInputDescription] = useState<string>("");
  const [newInputDescription, setNewInputDescription] = useState<string[]>([]);
  const [list, setList] = useState<Array<any>>([]);

  const [temp, setTemp] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setTemp((prevTemp) => prevTemp + 1);
    }, 2000);
  }, []);
  useEffect(() => {
    const axios = require("axios");
    axios.get("http://localhost:5000/api/get").then((response: any) => {
      setList(response.data);
    });
  }, [temp]);
  const addItem = (): void => {
    const axios = require("axios");
    axios.post("http://localhost:5000/api", {
      inputCategory: inputCategory,
      inputDescription: inputDescription,
      inputId: inputId,
    });
    setList([
      ...list,
      {
        category: inputCategory,
        description: inputDescription,
        id: inputId,
      },
    ]);
    setInputId("");
    setInputCategory("");
    setInputDescription("");
  };
  const DeleteVal = (id: string, category: string) => {
    const axios = require("axios");
    axios
      .delete(`http://localhost:5000/api/delete/${id}/${category}`)
      .then(() => {
        setTemp((prevTemp) => prevTemp + 1);
      });
  };

  const update = (category: string, description: string, id: string) => {
    const axios = require("axios");
    axios.put("http://localhost:5000/api/update", {
      inputCategory: category,
      inputDescription: description,
      inputId: id,
    });
    // setNewInputDescription([]);
    setNewInputDescription([]);
    setTemp((prevTemp) => prevTemp + 1);
    console.log(temp);
  };
  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <h2>TODO App</h2>
        </div>
        <div className="addItems">
          <div className="addItem">
            <input
              type="text"
              className="form-control col-xs-3"
              placeholder="Add Id Here"
              value={inputId}
              onChange={(e) => setInputId(e.target.value)}
            />

            <input
              type="text"
              className="form-control"
              placeholder="Write Category Here"
              value={inputCategory}
              onChange={(e) => setInputCategory(e.target.value)}
            />
            <input
              className="form-control"
              type="text"
              placeholder="Add Description Here"
              value={inputDescription}
              onChange={(e) => setInputDescription(e.target.value)}
            />
            <div>
              <button
                className="btn btn-outline-primary btn-lg btn-block col-xs-3"
                onClick={addItem}
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
        {
          <div className="showItems">
            {list.map((elem, key) => {
              return (
                <div className="eachItems" key={key}>
                  <h5>{elem.description}</h5>
                  <div key={key}>
                    <input
                      type="text"
                      id="valueupdate"
                      className="form-control"
                      placeholder="Update the Description"
                      onChange={(e) => {
                        newInputDescription[key] = e.target.value;
                        setNewInputDescription(newInputDescription);
                      }}
                      value={newInputDescription[key]}
                      key={key}
                    ></input>
                    <button
                      className="btn btn-outline-success btn-sm"
                      onClick={() => {
                        update(
                          elem.category,
                          newInputDescription[key],
                          elem.id
                        );
                      }}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => DeleteVal(elem.id, elem.category)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        }
        <div className="checklist"></div>
      </div>
    </>
  );
};

export default Todo;
