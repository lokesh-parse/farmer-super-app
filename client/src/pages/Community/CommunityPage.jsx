import { useEffect, useState } from "react";
import { getUser } from "../../utils/auth";
import PageHeader from "../../components/common/PageHeader"; // <-- New Import added here

function CommunityPage() {
  const currentUser = getUser();

  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("communityPosts")) || [];
    setPosts(savedPosts);
  }, []);

  const handlePostSubmit = (e) => {
    e.preventDefault();

    if (!postText.trim()) return;

    const newPost = {
      id: Date.now(),
      author: currentUser?.name || "Farmer User",
      text: postText,
      createdAt: new Date().toLocaleString(),
    };

    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem("communityPosts", JSON.stringify(updatedPosts));
    setPostText("");
  };

  return (
    <div className="community-page">
      {/* Updated Header Component */}
      <PageHeader
        title="Farmer Community"
        subtitle="Share farming problems, ideas, and practical experience."
      />

      <div className="community-grid">
        <div className="community-card">
          <h2>Create Post</h2>

          <form className="community-form" onSubmit={handlePostSubmit}>
            <textarea
              placeholder="Write your farming question or experience..."
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              rows="5"
            />
            <button type="submit">Post</button>
          </form>
        </div>

        <div className="community-card">
          <h2>Community Feed</h2>

          <div className="community-feed">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post.id} className="community-post">
                  <div className="community-post-top">
                    <strong>{post.author}</strong>
                    <span>{post.createdAt}</span>
                  </div>
                  <p>{post.text}</p>
                </div>
              ))
            ) : (
              <p>No posts yet. Be the first to share something.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityPage;