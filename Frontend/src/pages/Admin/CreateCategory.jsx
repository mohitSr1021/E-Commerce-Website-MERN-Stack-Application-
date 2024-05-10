import AdminMenu from "../../components/AdminMenu";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Modal, Select } from "antd";
import CategoryForm from "../../shared/CategoryForm";
import { FcAddImage } from "react-icons/fc";
import { Image } from "antd";
import NoPicAvailable from "../../assets/img/NoPicAvailable.png";
const { Option } = Select;
const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [isFeatured, setIsFeatured] = useState(false);
  const [loading, setIsLoading] = useState(false);
  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/all-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong in Getting Category !!");
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);

  // Handle Create Category (with Image)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const authToken = JSON.parse(localStorage.getItem("token"));
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("isFeatured", String(isFeatured)); // Convert isFeatured to a string
      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      } else {
        formData.append("thumbnail", NoPicAvailable);
      }
      if (name.trim() === "") {
        toast.error("Category Name is Required !");
        setIsLoading(false);
      } else {
        const { data } = await axios.post(
          "/api/v1/category/create-category",
          formData,
          {
            headers: {
              Authorization: authToken,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (data && data.success) {
          setIsLoading(false);
          setName("");
          setThumbnail(null);
          setIsFeatured(false);
          toast.success(data.msg);
          getAllCategory();
        } else {
          toast.error(data?.error || data?.msg);
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
      setIsLoading(false);
    }
  };

  // Handle Update Category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const authToken = JSON.parse(localStorage.getItem("token"));
      const formData = new FormData();
      formData.append("name", updatedName.trim());
      formData.append("isFeatured", String(isFeatured));
      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }
      const config = {
        headers: {
          Authorization: authToken,
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        formData,
        config
      );

      if (data?.success) {
        setIsLoading(false);
        setSelected(null);
        setUpdatedName("");
        setIsOpen(false);
        setThumbnail(null);
        setIsFeatured(false);
        getAllCategory();
        toast.success(`${updatedName} is Updated!!`);
      } else {
        toast.error(data?.msg);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };
  // Delete Category
  const handleDelete = async (cid) => {
    try {
      const authToken = JSON.parse(localStorage.getItem("token"));
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${cid}`,
        {
          headers: {
            Authorization: authToken,
          },
        }
      );

      if (data?.success) {
        getAllCategory();
        toast.success("Category is Deleted !");
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  // category Image (thumbnail)
  const handleRemoveImage = () => {
    setThumbnail(null);
  };

  return (
    <div className="container mt-2 mb-3">
      <div className="row">
        <div className="col-md-3 col-lg-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 col-lg-9">
          <h1 className="mx-4">Manage Category</h1>
          <div className="w-100 row mt-3 mb-3 mx-3">
            <div className="col-md-6 mb-2">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
                loading={loading}
              />
            </div>
            <div className="col-md-6 mb-2 d-flex align-items-center">
              <Select
                style={{ border: "none", padding: "1px 0px" }}
                showSearch
                placeholder="Do you want to feature this Category?"
                size="large"
                className="form-select mb-3 w-100"
                onChange={(value) => {
                  setIsFeatured(value === "1"); // Convert value to boolean
                }}
              >
                <Option value="1">Yes</Option>
                <Option value="0">NO</Option>
              </Select>
            </div>

            <div className="col-md-6">
              <label className="form-label fw-bold fs-5">
                Category Thumbnail:
              </label>
              <div className="input-group mb-3">
                <label
                  htmlFor="uploadThumbnail"
                  className="btn btn-light border w-100 d-flex justify-content-center align-items-center mb-0"
                >
                  <FcAddImage className="me-2" />
                  {thumbnail ? (
                    <span>{thumbnail.name}</span>
                  ) : (
                    <span>Upload Category Thumbnail</span>
                  )}
                  <input
                    id="uploadThumbnail"
                    type="file"
                    name="thumbnail"
                    accept="image/*"
                    onChange={(e) => setThumbnail(e.target.files[0])}
                    style={{ display: "none" }}
                  />
                </label>
              </div>
              {thumbnail && (
                <div className="col-md-12 mt-3">
                  <div className="w-25 position-relative">
                    <Image
                      width={100}
                      height={100}
                      src={URL.createObjectURL(thumbnail)}
                      alt={thumbnail.name}
                    />
                    <button
                      type="button"
                      className="btn btn-sm btn-danger position-absolute top-0 end-0"
                      onClick={handleRemoveImage}
                    >
                      <span className="fw-bold">X</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="w-100 mx-3">
            <table className="table text-center">
              <thead>
                <tr>
                  <th scope="col">S.No</th>
                  <th scope="col">Name</th>
                  <th scope="col">Image</th>
                  <th scope="col">Featured</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories?.map((cat, index) => (
                  <tr key={cat.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{cat.name}</td>

                    <td>
                      <div className="w-100 d-flex justify-content-center align-items-center">
                        <img
                          src={`/api/v1/category/category-thumbnail/${cat._id}`}
                          alt={cat?.name}
                          style={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "50%",
                            objectFit: "contain",
                          }}
                          className="custom-shadow"
                        />
                      </div>
                    </td>
                    <td>
                      <div>{cat.isFeatured ? "Yes" : "No"}</div>
                    </td>
                    <td>
                      <button
                        className="btn btn-primary ms-2"
                        onClick={() => {
                          setIsOpen(true);
                          setUpdatedName(cat?.name);
                          setIsFeatured(cat?.isFeatured);
                          setSelected(cat);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger ms-2"
                        onClick={() => {
                          handleDelete(cat.id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Modal
          open={isOpen}
          onOk={() => setIsOpen(false)}
          onCancel={() => setIsOpen(false)}
          footer={null}
        >
          <div className="col-md-12 d-flex align-items-center mt-4">
            <Select
              style={{ border: "none", padding: "1px 0px" }}
              showSearch
              placeholder="Do you want to feature this Category?"
              size="large"
              className="form-select mb-3 w-100"
              value={isFeatured ? "1" : "0"}
              onChange={(value) => {
                setIsFeatured(value === "1");
              }}
            >
              <Option value="1">Yes</Option>
              <Option value="0">NO</Option>
            </Select>
          </div>
          <CategoryForm
            value={updatedName}
            setValue={setUpdatedName}
            handleSubmit={handleUpdate}
            loading={loading}
          />
        </Modal>
      </div>
    </div>
  );
};

export default CreateCategory;
