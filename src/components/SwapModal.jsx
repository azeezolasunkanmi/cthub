import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { MdCancel } from "react-icons/md";

const SwapModal = ({ children, open, onClose }) => {
  if (!open) return null;
  return createPortal(
    <>
      <div
        className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-70 z-50"
        onClick={onClose}
      ></div>
      <div className="fixed w-[350px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#fff] p-4 z-50 rounded">
        <div onClick={onClose} className="flex justify-end cursor-pointer">
          <MdCancel size={25} />
        </div>
        {children}
      </div>
    </>,
    document.getElementById("portal")
  );
};

SwapModal.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default SwapModal;
