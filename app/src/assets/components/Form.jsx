/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { addPost, updatePost } from "../../ApiPost";

function Form({ data, setData, editApiData, setEditApiData }) {
  const [addData, setAddData] = useState({
    title: "",
    body: "",
  });

  let isEmpty = Object.keys(editApiData).length === 0;

  useEffect(() => {
    if (editApiData) {
      setAddData({
        title: editApiData.title || "",
        body: editApiData.body || "",
      });
    }
  }, [editApiData]);

  const addPostData = async () => {
    try {
      const res = await addPost(addData);
      console.log("res", res);
      if (res.status === 201) {
        setData([...data, res.data]);
        setAddData({ title: "", body: "" });
      }
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updatePostData = async () => {
    try {
      const res = updatePost(editApiData.id, addData);
      console.log(res);

      setData((prev) => {
        return prev.map((curElem) => {
          return curElem === editApiData.id ? res.data : curElem;
        });
      });

        setAddData({ title: "", body: "" });
        setEditApiData({});

    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const action = e.nativeEvent.submitter.value;
    if (action === "ADD") {
      addPostData();
    } else if (action === "EDIT") {
      updatePostData();
    }
  };

  return (
    <>
      <form onSubmit={handleFormSubmit} className="simple-form">
        <div className="form-group">
          <label htmlFor="name">TITLE</label>
          <input
            type="text"
            id="title"
            name="title"
            value={addData.title}
            onChange={handleInputChange}
            placeholder="Add Title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">TEXT</label>
          <input
            type="text"
            id="body"
            name="body"
            value={addData.body}
            onChange={handleInputChange}
            placeholder="Add text"
            required
          />
        </div>

        <button
          type="submit"
          className="submit-btn"
          value={isEmpty ? "ADD" : "EDIT"}
        >
          {isEmpty ? "ADD" : "EDIT"}
        </button>
      </form>
    </>
  );
}

export default Form;
