import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import PropTypes from "prop-types";

const Question = ({ title, description }) => {
  const [toggle, setToggle] = useState(false);

  const openQuestionHandler = () => {
    setToggle(prev => !prev);
  };

  return (
    <div
      className="p-4 mx-2 rounded-xl h-auto shrink-0 bg-textColor cursor-pointer border"
      onClick={openQuestionHandler}
    >
      <div className="flex justify-between items-center font-semibold text-[#fff]">
        <p>{title}</p>
        <IoIosArrowDown />
      </div>

      <div
        className={`${
          toggle ? "h-auto mt-4" : "h-0 mt-0"
        }  text-[#fff] overflow-hidden transition-all duration-200 ease-in`}
      >
        {description}
      </div>
    </div>
  );
};

Question.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Question;
