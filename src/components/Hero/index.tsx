import { useNavigate } from "react-router-dom";
import hero from "../../assets/hero.jpg";

const Index = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen max-h-screen relative text-center">
      <img
        src={hero}
        alt={hero}
        className="w-full h-full brightness-50 object-cover"
      />
      <div className="flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 gap-3">
        <span className="text-white text-6xl">
          Manage Mills and Dumpsites Seamlessly
        </span>
        <button
          onClick={() => navigate("/map")}
          className="bg-[#D3A57A] w-[50%] m-auto text-white py-3 rounded"
        >
          Explore Map
        </button>
      </div>
    </div>
  );
};

export default Index;
