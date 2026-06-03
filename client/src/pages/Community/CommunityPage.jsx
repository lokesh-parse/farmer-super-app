import { useEffect, useState } from "react";
import { getUser } from "../../utils/auth";
import PageHeader from "../../components/common/PageHeader";
import {
  getCommunityPosts,
  createCommunityPost,
  deleteCommunityPost,
  likeCommunityPost,
  getPostLikes,
  addPostComment,
  getPostComments,
} from "../../services/communityService";

function CommunityPage() {
  const currentUser = getUser();

  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  const [commentText, setCommentText] = useState({});

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const data = await getCommunityPosts();
    setPosts(data);

    data.forEach(async (post) => {
      const likeData = await getPostLikes(post.id);
      const commentData = await getPostComments(post.id);

      setLikes((prev) => ({
        ...prev,
        [post.id]: likeData.count,
      }));

      setComments((prev) => ({
        ...prev,
        [post.id]: commentData,
      }));
    });
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    if (!postText.trim()) return;

    const newPost = await createCommunityPost({
      author_name: currentUser?.name || "Farmer User",
      content: postText,
    });

    setPosts((prev) => [newPost, ...prev]);
    setLikes((prev) => ({ ...prev, [newPost.id]: 0 }));
    setComments((prev) => ({ ...prev, [newPost.id]: [] }));
    setPostText("");
  };

  const handleDelete = async (id) => {
    await deleteCommunityPost(id);
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  const handleLike = async (id) => {
    const result = await likeCommunityPost(
      id,
      currentUser?.name || "Farmer User"
    );

    setLikes((prev) => ({
      ...prev,
      [id]: result.liked
        ? (prev[id] || 0) + 1
        : Math.max((prev[id] || 0) - 1, 0),
    }));
  };

  const handleComment = async (id) => {
    const text = commentText[id];

    if (!text || !text.trim()) return;

    const newComment = await addPostComment(
      id,
      currentUser?.name || "Farmer User",
      text
    );

    setComments((prev) => ({
      ...prev,
      [id]: [...(prev[id] || []), newComment],
    }));

    setCommentText((prev) => ({
      ...prev,
      [id]: "",
    }));
  };

  return (
    <div className="community-page">
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
                    <span>
                      {new Date(post.created_at).toLocaleString()}
                    </span>
                  </div>

                  <p>{post.content}</p>

                  <div className="community-actions">
                    <button type="button" onClick={() => handleLike(post.id)}>
                      👍 Like ({likes[post.id] || 0})
                    </button>

                    <button type="button" onClick={() => handleDelete(post.id)}>
                      Delete
                    </button>
                  </div>

                  <div className="comment-box">
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      value={commentText[post.id] || ""}
                      onChange={(e) =>
                        setCommentText((prev) => ({
                          ...prev,
                          [post.id]: e.target.value,
                        }))
                      }
                    />

                    <button type="button" onClick={() => handleComment(post.id)}>
                      Comment
                    </button>
                  </div>

                  <div className="comments-list">
                    {(comments[post.id] || []).map((comment) => (
                      <div key={comment.id} className="comment-item">
                        <strong>{comment.user_name}</strong>
                        <p>{comment.comment}</p>
                      </div>
                    ))}
                  </div>
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