import { useState, useEffect } from "react";
import { MdOutlineEdit } from "react-icons/md";
import EditProfileModal from "./EditProfileModal";
import { UserAuth } from "../store/AuthContext";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

const ProfileDetails = () => {
  const [openEditProfileModal, setOpenEditProfileModal] = useState(false);
  const [formData, setFormData] = useState({});
  const { presentUser, updateUser, getCurrentUser, setPresentUser } =
    UserAuth();

  if (presentUser) {
    // console.log(presentUser);
  }

  useEffect(() => {
    if (presentUser) {
      setFormData(presentUser);
    }
  }, [presentUser]);

  function handleOnChange(e) {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleNestedChange(e, field) {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [field]: {
        ...prevData[field],
        [name]: value,
      },
    }));
  }

  async function handleFileChange(e, field) {
    const file = e.target.files[0];
    const storageRef = ref(
      storage,
      `user_id_images/${presentUser.firstName}/${file.name}`
    );

    try {
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);

      setFormData(prevData => ({
        ...prevData,
        [field]: {
          ...prevData[field],
          file: downloadURL,
        },
      }));
      console.log("completed");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }
  // function handleFileChange(e, field) {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       const result = reader.result;
  //       if (result && typeof result === "string") {
  //         setFormData(prevData => ({
  //           ...prevData,
  //           [field]: {
  //             ...prevData[field],
  //             file: file,
  //           },
  //         }));
  //       }
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(formData);
    if (
      formData.tel &&
      formData.address &&
      formData.nationality &&
      formData.gender &&
      formData.dob &&
      formData.meansOfId?.type &&
      formData.meansOfId?.idNum &&
      formData.meansOfId?.country &&
      formData.meansOfId?.expDate &&
      formData.meansOfId?.file
    ) {
      // console.log("form is fine");
      setPresentUser(prevState => ({
        ...prevState,
        meansOfId: { ...formData.meansOfId },
        tel: formData.tel,
        nationality: formData.nationality,
        gender: formData.gender,
        dob: formData.dob,
        address: formData.address,
      }));
      updateUser(presentUser.docId, {
        meansOfId: { ...formData.meansOfId },
        tel: formData.tel,
        nationality: formData.nationality,
        gender: formData.gender,
        dob: formData.dob,
        address: formData.address,
      });
      getCurrentUser();
      setOpenEditProfileModal(false);
      alert("Update successfully");
    } else {
      alert("Please fill out all required fields with valid data.");
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center gap-6 mb-6">
        <h2 className="font-bold text-[24px] md:text-[28px]">
          Personal Information
        </h2>
        <span>
          <button
            className="flex items-center gap-2 bg-slate-50 text-textColor px-6 py-2 rounded-md"
            onClick={() => setOpenEditProfileModal(true)}
          >
            Edit <MdOutlineEdit />
          </button>
        </span>
      </div>
      <section>
        <div className="flex gap-6 mb-6 pb-4">
          <p className="w-[30%] text-white text-[18px] shrink-0 md:w-[20%]">
            First Name:
          </p>
          <p>{formData?.firstName}</p>
        </div>
        <div className="flex gap-6 mb-6 pb-4">
          <p className="w-[30%] text-white text-[18px] shrink-0 md:w-[20%]">
            Last Name:
          </p>
          <p>{formData?.lastName}</p>
        </div>
        <div className="flex gap-6 mb-6 pb-4">
          <p className="w-[30%] text-white text-[18px] shrink-0 md:w-[20%]">
            Email:
          </p>
          <p>{formData?.email}</p>
        </div>
        <div className="flex gap-6 mb-6 pb-4">
          <p className="w-[30%] text-white text-[18px] shrink-0 md:w-[20%]">
            Tel:
          </p>
          <p>{formData?.tel ? formData?.tel : "NIL"}</p>
        </div>
        <div className="flex gap-6 mb-6 pb-4">
          <p className="w-[30%] text-white text-[18px] shrink-0 md:w-[20%]">
            Full Address:
          </p>
          <p>{formData?.address ? formData?.address : "NIL"}</p>
        </div>
        <div className="flex gap-6 mb-6 pb-4">
          <p className="w-[30%] text-white text-[18px] shrink-0 md:w-[20%]">
            Nationality:
          </p>
          <p>{formData?.nationality ? formData?.nationality : "NIL"}</p>
        </div>
        <div className="flex gap-6 mb-6 pb-4">
          <p className="w-[30%] text-white text-[18px] shrink-0 md:w-[20%]">
            Gender:
          </p>
          <p>{formData?.gender ? formData?.gender : "NIL"}</p>
        </div>
        <div className="flex gap-6 mb-6 pb-4">
          <p className="w-[30%] text-white text-[18px] shrink-0 md:w-[20%]">
            Date of Birth:
          </p>
          <p>{formData?.dob ? formData?.dob : "NIL"}</p>
        </div>
      </section>
      <div className="flex justify-between items-center gap-6 mb-6">
        <h2 className="font-bold text-[24px] md:text-[28px]">
          Means of Identification
        </h2>
        <span>
          <button
            className="flex items-center gap-2 bg-slate-50 text-textColor px-6 py-2 rounded-md"
            onClick={() => setOpenEditProfileModal(true)}
          >
            Edit <MdOutlineEdit />
          </button>
        </span>
      </div>
      <section>
        <div className="flex gap-6 mb-6 pb-4">
          <p className="w-[30%] text-white text-[18px] shrink-0 md:w-[20%]">
            Type of ID:
          </p>
          <p>{formData?.meansOfId?.type ? formData?.meansOfId?.type : "NIL"}</p>
        </div>
        <div className="flex gap-6 mb-6 pb-4">
          <p className="w-[30%] text-white text-[18px] shrink-0 md:w-[20%]">
            ID Number:
          </p>
          <p>
            {formData?.meansOfId?.idNum ? formData?.meansOfId?.idNum : "NIL"}
          </p>
        </div>
        <div className="flex gap-6 mb-6 pb-4">
          <p className="w-[30%] text-white text-[18px] shrink-0 md:w-[20%]">
            Issuing Country:
          </p>
          <p>
            {formData?.meansOfId?.country
              ? formData?.meansOfId?.country
              : "NIL"}
          </p>
        </div>
        <div className="flex gap-6 mb-6 pb-4">
          <p className="w-[30%] text-white text-[18px] shrink-0 md:w-[20%]">
            Expiry Date:
          </p>
          <p>
            {formData?.meansOfId?.expDate
              ? formData?.meansOfId?.expDate
              : "NIL"}
          </p>
        </div>
        <div className="flex gap-6 mb-6 pb-4">
          <p className="w-[30%] text-white text-[18px] shrink-0 md:w-[20%]">
            Upload ID:
          </p>
          <p>
            {formData?.meansOfId?.file
              ? "Your ID has been updoaded. Awaiting verification"
              : "UPLOAD YOUR ID"}
          </p>
        </div>
      </section>
      {/* EDIT MODAL */}
      <EditProfileModal
        open={openEditProfileModal}
        onClose={() => setOpenEditProfileModal(false)}
      >
        <form onSubmit={handleSubmit}>
          <section className="mt-6">
            <h2 className="font-bold mb-8 text-[24px] md:text-[28px] text-textColor">
              Personal Information
            </h2>
            <div className="md:flex items-center gap-6 mb-6 pb-4">
              <p className="w-[100%] text-textColor text-[18px] shrink-0 md:w-[20%]">
                First Name:
              </p>
              <input
                type="text"
                value={formData?.firstName}
                className="outline-none border border-slate-500 rounded-sm p-1 w-[300px]"
                readOnly
              />
            </div>
            <div className="md:flex items-center gap-6 mb-6 pb-4">
              <p className="w-[100%] text-textColor text-[18px] shrink-0 md:w-[20%]">
                Last Name:
              </p>
              <input
                type="text"
                value={formData?.lastName}
                className="outline-none border border-slate-500 rounded-sm p-1 w-[300px]"
                readOnly
              />
            </div>
            <div className="md:flex items-center gap-6 mb-6 pb-4">
              <p className="w-[100%] text-textColor text-[18px] shrink-0 md:w-[20%]">
                Email:
              </p>
              <input
                type="email"
                value={formData?.email}
                className="outline-none border border-slate-500 rounded-sm p-1 w-[300px]"
                readOnly
              />
            </div>
            <div className="md:flex items-center gap-6 mb-6 pb-4">
              <p className="w-[100%] text-textColor text-[18px] shrink-0 md:w-[20%]">
                Tel:
              </p>
              <input
                type="tel"
                name="tel"
                value={formData?.tel}
                className="outline-none border border-slate-500 rounded-sm p-1 w-[300px]"
                onChange={handleOnChange}
                required
              />
            </div>
            <div className="md:flex items-center gap-6 mb-6 pb-4">
              <p className="w-[100%] text-textColor text-[18px] shrink-0 md:w-[20%]">
                Full Address:
              </p>
              <input
                type="text"
                name="address"
                value={formData?.address}
                className="outline-none border border-slate-500 rounded-sm p-1 w-[300px]"
                onChange={handleOnChange}
                required
              />
            </div>
            <div className="md:flex items-center gap-6 mb-6 pb-4">
              <p className="w-[100%] text-textColor text-[18px] shrink-0 md:w-[20%]">
                Nationality:
              </p>
              <input
                type="text"
                name="nationality"
                value={formData?.nationality}
                className="outline-none border border-slate-500 rounded-sm p-1 w-[300px]"
                onChange={handleOnChange}
                required
              />
            </div>
            <div className="md:flex items-center gap-6 mb-6 pb-4">
              <p className="w-[100%] text-textColor text-[18px] shrink-0 md:w-[20%]">
                Gender:
              </p>
              <div>
                <label className="mr-4">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    className="mr-2"
                    checked={formData?.gender === "male"}
                    onChange={handleOnChange}
                    required
                  />
                  Male
                </label>
                <label className="mr-4">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    className="mr-2"
                    checked={formData?.gender === "female"}
                    onChange={handleOnChange}
                    required
                  />
                  Female
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Rather not say"
                    className="mr-2"
                    checked={formData?.gender === "Rather not say"}
                    onChange={handleOnChange}
                    required
                  />
                  Rather not say
                </label>
              </div>
            </div>
            <div className="md:flex items-center gap-6 mb-6 pb-4">
              <p className="w-[100%] text-textColor text-[18px] shrink-0 md:w-[20%]">
                Date of Birth:
              </p>
              <input
                type="date"
                name="dob"
                value={formData?.dob}
                className="outline-none border border-slate-500 rounded-sm p-1 w-[300px]"
                onChange={handleOnChange}
                required
              />
            </div>
          </section>
          <section>
            <h2 className="font-bold mb-8 text-[24px] md:text-[28px] text-textColor">
              Means of Identification
            </h2>
            <div className="md:flex items-center gap-6 mb-6 pb-4">
              <p className="w-[100%] text-textColor text-[18px] shrink-0 md:w-[20%]">
                Type of ID:
              </p>
              <select
                className="outline-none border border-slate-500 rounded-sm p-1 w-[300px]"
                name="type"
                value={formData?.meansOfId?.type}
                onChange={e => handleNestedChange(e, "meansOfId")}
                required
              >
                <option value=" ">Choose one</option>
                <option value="Passport">Passport</option>
                <option value="Driver license">Driver&apos;s License</option>
                <option value="National ID">National ID</option>
              </select>
            </div>
            <div className="md:flex items-center gap-6 mb-6 pb-4">
              <p className="w-[100%] text-textColor text-[18px] shrink-0 md:w-[20%]">
                ID Number:
              </p>
              <input
                type="text"
                name="idNum"
                value={formData?.meansOfId?.idNum}
                className="outline-none border border-slate-500 rounded-sm p-1 w-[300px]"
                onChange={e => handleNestedChange(e, "meansOfId")}
                required
              />
            </div>
            <div className="md:flex items-center gap-6 mb-6 pb-4">
              <p className="w-[100%] text-textColor text-[18px] shrink-0 md:w-[20%]">
                Issuing Country:
              </p>
              <input
                type="text"
                name="country"
                value={formData?.meansOfId?.country}
                className="outline-none border border-slate-500 rounded-sm p-1 w-[300px]"
                onChange={e => handleNestedChange(e, "meansOfId")}
                required
              />
            </div>
            <div className="md:flex items-center gap-6 mb-6 pb-4">
              <p className="w-[100%] text-textColor text-[18px] shrink-0 md:w-[20%]">
                Expiry Date:
              </p>
              <input
                type="date"
                name="expDate"
                value={formData?.meansOfId?.expDate}
                className="outline-none border border-slate-500 rounded-sm p-1 w-[300px]"
                onChange={e => handleNestedChange(e, "meansOfId")}
                required
              />
            </div>
            <div className="md:flex items-center gap-6 mb-6 pb-4">
              <p className="w-[100%] text-textColor text-[18px] shrink-0 md:w-[20%]">
                Upload ID Document:
              </p>
              <input
                name="file"
                type="file"
                className="outline-none border border-slate-500 rounded-sm p-1 w-[300px]"
                onChange={e => handleFileChange(e, "meansOfId")}
                required
              />
            </div>
          </section>
          <div className="flex justify-center gap-6">
            <button
              className="px-4 py-1 bg-blue-500 text-white rounded-sm"
              onClick={() => setOpenEditProfileModal(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-1 bg-green-500 text-white rounded-sm"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </form>
      </EditProfileModal>
    </div>
  );
};

export default ProfileDetails;
