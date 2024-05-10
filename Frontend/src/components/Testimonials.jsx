// Testimonials.js
import "../styles/Testimonials.css"; // Import custom styles
const Testimonials = () => {
  const testimonialsData = [
    {
      id: 1,
      name: "John Doe",
      position: "CEO, Company A",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin euismod hendrerit arcu, quis posuere nulla.",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVuJTIwZmFjZXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "CTO, Company B",
      comment:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVuJTIwZmFjZXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 3,
      name: "Michael Johnson",
      position: "Marketing Manager",
      comment:
        "Integer vitae libero ac risus egestas placerat. Vivamus venenatis elit sit amet faucibus efficitur.",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVuJTIwZmFjZXxlbnwwfHwwfHx8MA%3D%3D",
    },
  ];

  return (
    <section className="testimonials container" id="testimonials">
      <h1>Testimonials</h1>
      <div className="testimonials-container">
        {testimonialsData.map((testimonial) => (
          <div key={testimonial.id} className="testimonialsCard">
            <div className="testimonials-top">
              <div className="testimonials-avtar">
                <img src={testimonial.avatar} alt="image1" />
              </div>
              <div className="info">
                <h4>{testimonial.name}</h4>
                <p>{testimonial.position}</p>
              </div>
            </div>
            <div className="testimonialsDescription">
              <p>{testimonial.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
