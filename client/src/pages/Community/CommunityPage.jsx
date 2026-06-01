import { useEffect, useState } from "react";
import { getUser } from "../../utils/auth";
import PageHeader from "../../components/common/PageHeader";
import {
  getCommunityPosts,
  createCommunityPost,
  deleteCommunityPost,
} from "../../services/communityService";

function CommunityPage() {
  const currentUser = getUser();

  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const data = await getCommunityPosts();
    setPosts(data);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    if (!postText.trim()) return;

    const newPost = await createCommunityPost({
      author_name: currentUser?.name || "Farmer User",
      content: postText,
    });

    setPosts((prev) => [newPost, ...prev]);
    setPostText("");
  };

  const handleDelete = async (id) => {
    await deleteCommunityPost(id);

    setPosts((prev) => prev.filter((post) => post.id !== id));
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
                    <strong>{post.author_name}</strong>
                    <span>{new Date(post.created_at).toLocaleString()}</span>
                  </div>
                  <p>{post.content}</p>
                  <button onClick={() => handleDelete(post.id)}>
                    Delete
                  </button>
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