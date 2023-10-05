import food from "../image/burger-image.png";

const About = () => {
  return (
    <div className="about-us">
      <div className="about-us-title">
        <h1>
          Welcome to <br /> The World of
          <br /> <span>Tasty and Fresh Food</span>
        </h1>
        <h3>"Better you will feel if you eat a healthy meal"</h3>
      </div>
      <div className="about-us-img">
        <img src={food}></img>
      </div>
    </div>
  );
};

export default About;
