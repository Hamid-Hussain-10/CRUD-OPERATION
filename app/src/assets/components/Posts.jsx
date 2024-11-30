import { useEffect, useState } from "react";
import { deletePost, getPost } from "../../ApiPost";
import Form from "./Form";

function Posts() {
  const [data, setData] = useState([]);
  const [editApiData, setEditApiData] = useState({});

  const getPostData = async () => {
    try {
      const res = await getPost();
      setData(res.data);
      console.log(res);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    getPostData();
  }, []);

  const handleDelPost = async (id) => {
    try {
      const res = await deletePost(id);
      if (res.status === 200) {
        const newUpdatedPost = data.filter((curPost) => {
          return curPost.id !== id;
        });
        setData(newUpdatedPost);
      }
    } catch (error) {
      alert(`You have some error: ${error.message}`);
    }
  };

  const handleUpdatePost = (curElem) => setEditApiData(curElem);
  
  return (
    <>
      <Form
        data={data}
        setData={setData}
        editApiData={editApiData}
        setEditApiData={setEditApiData}
      />
      <h2>Posts</h2>
      <section className="post-section">
        <ul>
          {data.map((curElem) => {
            const { id, title, body } = curElem;
            return (
              <li key={id}>
                <p>Title: {title}</p>
                <p>Body: {body}</p>
                <button
                  className="btn-edit"
                  onClick={() => handleUpdatePost(curElem)}
                >
                  Edit
                </button>
                <button className="btn-del" onClick={() => handleDelPost(id)}>
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}

export default Posts;
