import axios from "axios";
import { useState } from "react";

function MyApartmens() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const get_data_fn = async () => {
    setLoading(true);

    const res = await axios.get("https://dummyjson.com/posts");
    const posts = res.data.posts;

    const updatedPosts = posts.map((item, index) => {
      return {
        ...item,
        status: index < posts.length / 2, 
      };
    });

    setList(updatedPosts);
    setLoading(false);
  };

  const delete_fn = (id) => {
    const updatedList = list.filter((item) => item.id !== id);
    setList(updatedList);
  };

  return (
    <div>
      <button onClick={get_data_fn}>click</button>

      {loading && <h2>Загрузка...</h2>}

      {list.map((item) => (
        <div key={item.id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
          <button onClick={() => delete_fn(item.id)}>Delete</button>
          {item.status ? (
            <p style={{ color: "green" }}>true</p>
          ) : (
            <p style={{ color: "red" }}>false</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default MyApartmens;
