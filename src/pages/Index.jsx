import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="text-center">
      <h1 className="text-3xl">Welcome to the Slot Machine App</h1>
      <p>Learn old and forgotten French words in a fun way!</p>
      <Link to="/slot-machine">
        <Button className="mt-4">Start Learning</Button>
      </Link>
    </div>
  );
};

export default Index;