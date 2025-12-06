const Blog = () => {
  const posts = [
    {
      title: "5 Furniture Styles That Will Dominate 2025",
      excerpt:
        "Discover the top trending styles — from warm Scandinavian wood to modern Japandi minimalism.",
      date: "January 20, 2025",
      tag: "Trends",
    },
    {
      title: "How to Choose the Perfect Sofa for Your Living Room",
      excerpt:
        "Before buying a new sofa, here’s everything you need to consider: size, depth, materials, and layout.",
      date: "February 8, 2025",
      tag: "Guides",
    },
    {
      title: "Small Apartment? Here’s How to Maximize Space",
      excerpt:
        "Smart furniture ideas that can transform even the smallest home into a stylish and functional space.",
      date: "February 28, 2025",
      tag: "Decor Tips",
    },
    {
      title: "The New 2025 Color Palette for Home Interiors",
      excerpt:
        "Earthy neutrals, dusty greens, and warm beiges are taking over furniture and home décor this year.",
      date: "March 10, 2025",
      tag: "Colors",
    },
    {
      title: "Why Solid Wood Furniture Is Worth the Investment",
      excerpt:
        "Learn how quality materials can save you money in the long run and elevate your home.",
      date: "April 1, 2025",
      tag: "Materials",
    },
    {
      title: "The Psychology of Home Design",
      excerpt:
        "Your furniture placement affects your mood, productivity, and relaxation — here’s how.",
      date: "April 12, 2025",
      tag: "Lifestyle",
    },
  ];

  return (
    <section id="blog" className="container py-5">
      <h2 className="fw-bold mb-4 text-center">Home Inspiration & Articles</h2>

      <div className="row g-4">
        {posts.map((post, index) => (
          <div className="col-md-4" key={index}>
            <div
              className="card p-4 rounded-4 border-0 shadow-sm h-100 d-flex flex-column"
              style={{
                background: "#fffdf7",
                borderLeft: "6px solid #c7a17a",
                transition: "0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 30px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 6px 15px rgba(0,0,0,0.1)";
              }}
            >
              {/* Blog Tag */}
              <span
                className="badge bg-dark"
                style={{ width: "fit-content", marginBottom: "10px" }}
              >
                {post.tag}
              </span>

              {/* Title */}
              <h4 className="fw-bold">{post.title}</h4>

              {/* Date */}
              <p className="text-muted mt-1" style={{ fontSize: "0.85rem" }}>
                📅 {post.date}
              </p>

              {/* Excerpt */}
              <p className="mt-3" style={{ color: "#444" }}>
                {post.excerpt}
              </p>

              {/* Button */}
              <button className="btn btn-outline-dark mt-auto w-100">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blog;
