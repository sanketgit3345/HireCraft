import axios from "axios";

// const API_URL = "http://localhost:8000/api/v1";
const API_URL = `${window.location.origin}/8000/api/v1`;

export const API = axios.create({
  baseURL: API_URL,
  responseType: "json",
});

export const apiRequest = async ({ url, token, data, method }) => {
  try {
    const result = await API({
      url: url,
      method: method || "GET",
      data: data ? data : null,
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    console.log("made succesful call", url);
    return result?.data;
  } catch (error) {
    console.log(error);
    const err = error.response.data;
    return {
      status: err.success,
      message: err.message,
    };
  }
};

export const handleFileUpload = async (uploadFile) => {
  const formData = new FormData();
  formData.append("file", uploadFile);
  formData.append("upload_preset", "hushhJobPortal");

  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dutwikfzh/image/upload/",
      formData
    );
    console.log("Cloudinary Upload Response:", response);
    if (response.data && response.data.secure_url) {
      return response.data.secure_url;
    } else {
      throw new Error("Invalid response from Cloudinary");
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateURL = ({
  pageNum,
  query,
  cmpLoc,
  sort,
  navigate,
  location,
  jType,
  exp,
}) => {
  const params = new URLSearchParams();
  if (pageNum && pageNum > 1) {
    params.set("page", pageNum);
  }

  if (query) {
    params.set("search", query);
  }

  if (cmpLoc) {
    params.set("location", cmpLoc);
  }
  if (sort) {
    params.set("sort", sort);
  }
  if (jType) {
    params.set("jtype", jType);
  }
  if (exp) {
    params.set("exp", exp);
  }

  const newURL = `${location.pathname}?${params.toString()}`;
  navigate(newURL, { replace: true });

  return newURL;
};
